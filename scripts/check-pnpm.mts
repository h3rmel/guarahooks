#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

interface PackageJson {
  engines?: {
    pnpm?: string;
  };
  packageManager?: string;
}

const pkg: PackageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

// Determine required version
let required = '9.0.0';
if (pkg.engines?.pnpm) {
  required = pkg.engines.pnpm.replace(/[^\d.]/g, '');
} else if (pkg.packageManager?.includes('pnpm@')) {
  required = pkg.packageManager.match(/pnpm@(\d+\.\d+\.\d+)/)?.[1] || required;
}

// Get current version
let current = '';
try {
  current = execSync('pnpm --version', { encoding: 'utf8' }).trim();
} catch {
  console.error('pnpm is required but was not found.');
  process.exit(1);
}

// Compare versions using localeCompare with numeric option
if (
  current.localeCompare(required, undefined, {
    numeric: true,
    sensitivity: 'base',
  }) < 0
) {
  console.error(
    `pnpm ${required} or newer is required. Current version: ${current}`,
  );
  process.exit(1);
}
