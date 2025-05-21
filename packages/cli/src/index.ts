import { getPackageInfo } from '~/utils/package';
import { Command } from 'commander';

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name('guarahooks-cli')
    .description(
      "A CLI to help you manage you manage guarahooks's hooks in your applications.",
    )
    .version(
      packageInfo.version ?? '0.0.1',
      '-v, --version',
      'Displays the current version of the CLI.',
    );

  program.parse();
}

main();
