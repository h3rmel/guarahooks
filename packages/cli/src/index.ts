import { Command } from 'commander';

import { add } from '@/src/commands/add';

import packageJson from '../package.json';

// #region Version check

const required = packageJson.engines?.node || '>=18';
const [reqMajor = 18, reqMinor = 0, reqPatch = 0] = required
  .replace(/[^\d.]/g, '')
  .split('.')
  .map(Number);

const [curMajor, curMinor, curPatch] = process.versions.node
  .split('.')
  .map(Number);

function versionLessThan(a: number[], b: number[]) {
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
    `guara-cli requires Node.js ${required}. Current version: ${process.version}`,
  );
  console.error('Run `nvm install` and `nvm use` to switch versions.');
  process.exit(1);
}

// #endregion

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

async function main() {
  const program = new Command();

  // Initial config
  program
    .name('guara-cli')
    .description('A CLI for adding hooks to your project.')
    .version(
      packageJson.version || '1.0.0',
      '-v, --version',
      'display version number',
    );

  // Add commands
  program.addCommand(add);

  program.parse();
}

main();
