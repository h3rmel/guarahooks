#!/usr/bin/env node
import { readFileSync } from 'fs';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const required = pkg.engines?.node || '>=18';
const [reqMajor = 18, reqMinor = 0, reqPatch = 0] = required
  .replace(/[^\d.]/g, '')
  .split('.')
  .map(Number);

const [curMajor, curMinor, curPatch] = process.versions.node
  .split('.')
  .map(Number);

function versionLessThan(a, b) {
  for (let i = 0; i < a.length; i++) {
    if ((a[i] || 0) < (b[i] || 0)) return true;
    if ((a[i] || 0) > (b[i] || 0)) return false;
  }
  return false;
}

if (
  versionLessThan(
    [curMajor, curMinor, curPatch],
    [reqMajor, reqMinor, reqPatch],
  )
) {
  console.error(
    `Node.js ${required} is required. Current version: ${process.version}`,
  );
  console.error('Run `nvm install` and `nvm use` to switch versions.');
  process.exit(1);
}
