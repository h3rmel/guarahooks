#!/usr/bin/env node
import { readFileSync } from 'fs';

interface PackageJson {
  engines?: {
    node?: string;
  };
}

const pkg: PackageJson = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const required = pkg.engines?.node || '>=20.0.0';
const requiredVersion = required.replace(/[^\d.]/g, '');
const currentVersion = process.versions.node;

// Compare versions using localeCompare with numeric option
if (
  currentVersion.localeCompare(requiredVersion, undefined, {
    numeric: true,
    sensitivity: 'base',
  }) < 0
) {
  console.error(
    `Node.js ${required} is required. Current version: ${process.version}`,
  );
  console.error('Run \`nvm install\` and \`nvm use\` to switch versions.');
  process.exit(1);
}
