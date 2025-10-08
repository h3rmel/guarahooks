import fs from 'fs/promises';
import path from 'path';

import fetch from 'node-fetch';

import { type RegistryItem } from '@/src/registry/schemas';
import { logger } from '@/src/utils/logger';

/**
 * Configuration constants for the installer
 */
const CONFIG = {
  REGISTRY_URL_DEV: 'http://localhost:3000/r',
  REGISTRY_URL_PROD: 'https://guarahooks.com/r',
  MAX_CONCURRENT_DOWNLOADS: 5,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // ms
} as const;

// #region Types & Interfaces

/**
 * Options for installing hooks
 */
export interface InstallOptions {
  /** Current working directory */
  cwd: string;
  /** Whether to install in src directory */
  srcDir?: boolean;
  /** Whether to overwrite existing files */
  overwrite?: boolean;
  /** Whether to suppress output messages */
  silent?: boolean;
}

/**
 * Result of a file installation operation
 */
interface InstallFileResult {
  success: boolean;
  filePath: string;
  error?: string;
}

/**
 * Result of a hook installation operation
 */
interface InstallHookResult {
  hookName: string;
  success: boolean;
  filesInstalled: number;
  error?: string;
}

// #endregion

/**
 * Gets the appropriate registry URL based on environment
 */
function getRegistryUrl(): string {
  return process.env.NODE_ENV === 'development'
    ? CONFIG.REGISTRY_URL_DEV
    : CONFIG.REGISTRY_URL_PROD;
}

/**
 * Implements exponential backoff retry logic for network requests
 *
 * @param fn - Function to retry
 * @param attempts - Number of retry attempts
 * @param delay - Initial delay in milliseconds
 * @returns Promise that resolves with the function result
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = CONFIG.RETRY_ATTEMPTS,
  delay: number = CONFIG.RETRY_DELAY,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    return withRetry(fn, attempts - 1, delay * 2);
  }
}

/**
 * Fetches hook data from the registry with retry logic
 *
 * @param hookName - Name of the hook to fetch
 * @returns Promise that resolves with the hook data
 * @throws Error if the hook cannot be fetched
 */
async function fetchHookData(hookName: string): Promise<RegistryItem> {
  const registryUrl = getRegistryUrl();
  const hookUrl = `${registryUrl}/${hookName}.json`;

  return await withRetry(async () => {
    const response = await fetch(hookUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch hook ${hookName}: ${response.statusText}`,
      );
    }

    return (await response.json()) as RegistryItem;
  });
}

/**
 * Fetches file content from the registry with retry logic
 *
 * @param filePath - Path of the file to fetch
 * @returns Promise that resolves with the file content
 * @throws Error if the file cannot be fetched
 */
async function fetchFileContent(filePath: string): Promise<string> {
  const registryUrl = getRegistryUrl();
  const fileUrl = `${registryUrl}/${filePath}`;

  return await withRetry(async () => {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file ${filePath}: ${response.statusText}`,
      );
    }

    return await response.text();
  });
}

/**
 * Ensures a directory exists, creating it if necessary
 *
 * @param dirPath - Path to the directory
 */
async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    // Directory might already exist, which is fine
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Checks if a file exists at the given path
 *
 * @param filePath - Path to check
 * @returns Promise that resolves to true if file exists, false otherwise
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Installs a single file from the registry
 *
 * @param file - File metadata from the registry
 * @param options - Installation options
 * @returns Promise that resolves with the installation result
 */
async function installFile(
  file: NonNullable<RegistryItem['files']>[number],
  options: InstallOptions,
): Promise<InstallFileResult> {
  try {
    if (!file.target) {
      throw new Error('File target is required');
    }

    const targetPath = path.join(
      options.cwd,
      options.srcDir ? 'src' : '',
      file.target,
    );
    const targetDir = path.dirname(targetPath);

    // Ensure target directory exists
    await ensureDirectory(targetDir);

    // Check if file exists and handle overwrite logic
    const exists = await fileExists(targetPath);
    if (exists && !options.overwrite) {
      if (!options.silent) {
        logger.warn(
          `File ${targetPath} already exists. Use --overwrite to replace it.`,
        );
      }
      return {
        success: false,
        filePath: targetPath,
        error: 'File exists and overwrite not enabled',
      };
    }

    // Get file content (either from metadata or fetch from registry)
    let content: string;
    if (file.content) {
      content = file.content;
    } else {
      content = await fetchFileContent(file.path);
    }

    // Write file to disk
    await fs.writeFile(targetPath, content, 'utf8');

    return { success: true, filePath: targetPath };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      filePath: file.target || file.path,
      error: errorMessage,
    };
  }
}

/**
 * Installs a single hook with all its files
 *
 * @param hookName - Name of the hook to install
 * @param options - Installation options
 * @returns Promise that resolves with the installation result
 */
async function installSingleHook(
  hookName: string,
  options: InstallOptions,
): Promise<InstallHookResult> {
  try {
    if (!options.silent) {
      logger.info(`Installing ${hookName}...`);
    }

    // Fetch hook metadata
    const hookData = await fetchHookData(hookName);

    // Install all files for this hook
    let filesInstalled = 0;
    if (hookData.files && hookData.files.length > 0) {
      // Process files in parallel for better performance
      const filePromises = hookData.files.map((file) =>
        installFile(file, options),
      );
      const results = await Promise.all(filePromises);

      // Count successful installations
      filesInstalled = results.filter((result) => result.success).length;

      // Check for any failures
      const failures = results.filter((result) => !result.success);
      if (failures.length > 0) {
        const errorMessages = failures
          .map((f) => `${f.filePath}: ${f.error}`)
          .join(', ');
        throw new Error(`Failed to install some files: ${errorMessages}`);
      }
    }

    if (!options.silent) {
      logger.success(
        `✓ ${hookName} installed successfully (${filesInstalled} files)`,
      );
    }

    return { hookName, success: true, filesInstalled };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Failed to install ${hookName}: ${errorMessage}`);

    return {
      hookName,
      success: false,
      filesInstalled: 0,
      error: errorMessage,
    };
  }
}

/**
 * Installs multiple hooks with controlled concurrency
 *
 * @param hookNames - Array of hook names to install
 * @param options - Installation options
 * @returns Promise that resolves when all hooks are processed
 * @throws Error if any hook installation fails
 *
 * @example
 * ```typescript
 * await installHooks(['useLocalStorage', 'useDebounce'], {
 *   cwd: process.cwd(),
 *   srcDir: true,
 *   overwrite: false,
 *   silent: false
 * });
 * ```
 */
export async function installHooks(
  hookNames: string[],
  options: InstallOptions,
): Promise<void> {
  if (hookNames.length === 0) {
    if (!options.silent) {
      logger.warn('No hooks specified for installation');
    }
    return;
  }

  if (!options.silent) {
    logger.info(`Installing ${hookNames.length} hook(s)...`);
  }

  // Process hooks with controlled concurrency to avoid overwhelming the server
  const results: InstallHookResult[] = [];

  for (let i = 0; i < hookNames.length; i += CONFIG.MAX_CONCURRENT_DOWNLOADS) {
    const batch = hookNames.slice(i, i + CONFIG.MAX_CONCURRENT_DOWNLOADS);
    const batchPromises = batch.map((hookName) =>
      installSingleHook(hookName, options),
    );
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  // Check for failures
  const failures = results.filter((result) => !result.success);
  if (failures.length > 0) {
    const failedHooks = failures.map((f) => f.hookName).join(', ');
    throw new Error(`Failed to install hooks: ${failedHooks}`);
  }

  const totalFiles = results.reduce(
    (sum, result) => sum + result.filesInstalled,
    0,
  );
  if (!options.silent) {
    logger.success(
      `✓ All hooks installed successfully (${totalFiles} files total)`,
    );
  }
}

/**
 * Detects the project structure to determine installation paths
 *
 * @param cwd - Current working directory
 * @returns Promise that resolves with project structure information
 *
 * @example
 * ```typescript
 * const { srcDir } = await detectProjectStructure(process.cwd());
 * console.log(srcDir ? 'Project uses src directory' : 'Project uses root directory');
 * ```
 */
export async function detectProjectStructure(
  cwd: string,
): Promise<{ srcDir: boolean }> {
  const srcPath = path.join(cwd, 'src');
  const srcExists = await fileExists(srcPath);

  return { srcDir: srcExists };
}
