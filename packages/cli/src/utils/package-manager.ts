import { existsSync } from 'fs';
import { resolve } from 'path';

import { execa } from 'execa';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export function detectPackageManager(
  cwd: string = process.cwd(),
): PackageManager {
  if (existsSync(resolve(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (existsSync(resolve(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (existsSync(resolve(cwd, 'bun.lockb'))) {
    return 'bun';
  }

  return 'npm';
}

export async function installDependencies(
  dependencies: string[],
  packageManager: PackageManager,
  cwd: string = process.cwd(),
  isDev: boolean = false,
): Promise<void> {
  if (dependencies.length === 0) return;

  const commands = {
    npm: ['install', isDev ? '--save-dev' : '--save', ...dependencies],
    yarn: ['add', isDev ? '--dev' : '', ...dependencies].filter(Boolean),
    pnpm: ['add', isDev ? '--save-dev' : '', ...dependencies].filter(Boolean),
    bun: ['add', isDev ? '--dev' : '', ...dependencies].filter(Boolean),
  };

  await execa(packageManager, commands[packageManager], { cwd });
}

export async function isPackageInstalled(
  packageName: string,
  cwd: string = process.cwd(),
): Promise<boolean> {
  try {
    const packageJsonPath = resolve(cwd, 'package.json');
    if (!existsSync(packageJsonPath)) return false;

    const fs = await import('fs-extra');
    const packageJson = await fs.default.readJSON(packageJsonPath);

    return !!(
      packageJson.dependencies?.[packageName] ||
      packageJson.devDependencies?.[packageName]
    );
  } catch {
    return false;
  }
}
