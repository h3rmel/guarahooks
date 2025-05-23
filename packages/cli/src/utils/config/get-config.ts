import { existsSync } from 'fs';
import { resolve } from 'path';

import { cosmiconfig } from 'cosmiconfig';

import {
  DEFAULT_CONFIG,
  guarahooksConfigSchema,
  type GuarahooksConfig,
} from './schema.js';

const explorer = cosmiconfig('guarahooks', {
  searchPlaces: [
    'guarahooks.json',
    'guarahooks.config.js',
    'guarahooks.config.ts',
    'package.json',
  ],
});

export async function getConfig(
  cwd: string = process.cwd(),
): Promise<GuarahooksConfig> {
  try {
    const result = await explorer.search(cwd);

    if (!result) {
      return DEFAULT_CONFIG;
    }

    const parsedConfig = guarahooksConfigSchema.parse(result.config);
    return parsedConfig;
  } catch (error) {
    console.warn('Invalid configuration found, using defaults:', error);
    return DEFAULT_CONFIG;
  }
}

export async function writeConfig(
  config: GuarahooksConfig,
  cwd: string = process.cwd(),
): Promise<void> {
  const configPath = resolve(cwd, 'guarahooks.json');
  const fs = await import('fs-extra');

  await fs.default.writeJSON(configPath, config, { spaces: 2 });
}

export function getProjectInfo(cwd: string = process.cwd()) {
  const packageJsonPath = resolve(cwd, 'package.json');
  const tsConfigPath = resolve(cwd, 'tsconfig.json');
  const nextConfigPath = resolve(cwd, 'next.config.js');
  const viteConfigPath = resolve(cwd, 'vite.config.ts');

  return {
    hasPackageJson: existsSync(packageJsonPath),
    hasTypeScript: existsSync(tsConfigPath),
    hasNextJs: existsSync(nextConfigPath),
    hasVite: existsSync(viteConfigPath),
    packageJsonPath,
    tsConfigPath,
  };
}
