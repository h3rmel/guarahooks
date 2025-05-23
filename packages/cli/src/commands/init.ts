import { Command } from 'commander';
import ora from 'ora';
import prompts from 'prompts';

import {
  getConfig,
  getProjectInfo,
  writeConfig,
} from '../utils/config/get-config.js';
import type { GuarahooksConfig } from '../utils/config/schema.js';
import { Logger } from '../utils/logger.js';
import {
  detectPackageManager,
  installDependencies,
} from '../utils/package-manager.js';

const GUARAHOOKS_DEPENDENCIES = ['react'];

const TYPESCRIPT_DEPENDENCIES = ['@types/react'];

export const init = new Command()
  .name('init')
  .description('Initialize guarahooks in your project')
  .option('-y, --yes', 'use default configuration', false)
  .action(async (opts) => {
    Logger.logo();

    const cwd = process.cwd();
    const projectInfo = getProjectInfo(cwd);

    if (!projectInfo.hasPackageJson) {
      Logger.error(
        'No package.json found. Please run this command in a valid project directory.',
      );
      process.exit(1);
    }

    Logger.info('Initializing guarahooks in your project...');
    Logger.break();

    let config: GuarahooksConfig;

    if (opts.yes) {
      config = await getConfig(cwd);
    } else {
      const responses = await prompts([
        {
          type: 'select',
          name: 'framework',
          message: 'Which framework are you using?',
          choices: [
            { title: 'React', value: 'react' },
            { title: 'Next.js', value: 'next' },
            { title: 'Vite', value: 'vite' },
          ],
          initial: projectInfo.hasNextJs ? 1 : projectInfo.hasVite ? 2 : 0,
        },
        {
          type: 'toggle',
          name: 'typescript',
          message: 'Are you using TypeScript?',
          initial: projectInfo.hasTypeScript,
          active: 'yes',
          inactive: 'no',
        },
        {
          type: 'text',
          name: 'hooksAlias',
          message: 'Configure import alias for hooks:',
          initial: '@/hooks',
        },
        {
          type: 'text',
          name: 'utilsAlias',
          message: 'Configure import alias for utils:',
          initial: '@/lib/utils',
        },
        {
          type: 'select',
          name: 'importStyle',
          message: 'Preferred import style?',
          choices: [
            {
              title: "Named imports: import { useToggle } from '@/hooks'",
              value: 'named',
            },
            {
              title:
                "Default imports: import useToggle from '@/hooks/useToggle'",
              value: 'default',
            },
          ],
        },
        {
          type: 'toggle',
          name: 'includeTests',
          message: 'Include test files?',
          initial: false,
          active: 'yes',
          inactive: 'no',
        },
        {
          type: 'toggle',
          name: 'includeExamples',
          message: 'Include example files?',
          initial: false,
          active: 'yes',
          inactive: 'no',
        },
      ]);

      config = {
        framework: responses.framework,
        typescript: responses.typescript,
        aliases: {
          hooks: responses.hooksAlias,
          utils: responses.utilsAlias,
        },
        importStyle: responses.importStyle,
        includeTests: responses.includeTests,
        includeExamples: responses.includeExamples,
      };
    }

    Logger.break();
    Logger.step('Configuration:');
    console.log(`  Framework: ${config.framework}`);
    console.log(`  TypeScript: ${config.typescript ? 'Yes' : 'No'}`);
    console.log(`  Hooks alias: ${config.aliases.hooks}`);
    console.log(`  Utils alias: ${config.aliases.utils}`);
    console.log(`  Import style: ${config.importStyle}`);
    console.log(`  Include tests: ${config.includeTests ? 'Yes' : 'No'}`);
    console.log(`  Include examples: ${config.includeExamples ? 'Yes' : 'No'}`);
    Logger.break();

    // Write configuration
    const writeSpinner = ora('Writing configuration...').start();
    try {
      await writeConfig(config, cwd);
      writeSpinner.succeed('Configuration written to guarahooks.json');
    } catch (error) {
      writeSpinner.fail('Failed to write configuration');
      Logger.error(error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }

    // Install dependencies
    const packageManager = detectPackageManager(cwd);
    const dependencies = [...GUARAHOOKS_DEPENDENCIES];

    if (config.typescript) {
      dependencies.push(...TYPESCRIPT_DEPENDENCIES);
    }

    const installSpinner = ora(
      `Installing dependencies with ${packageManager}...`,
    ).start();
    try {
      await installDependencies(dependencies, packageManager, cwd);
      installSpinner.succeed('Dependencies installed successfully');
    } catch (error) {
      installSpinner.fail('Failed to install dependencies');
      Logger.error(error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }

    Logger.break();
    Logger.success('✨ guarahooks initialized successfully!');
    Logger.info('You can now add hooks using:');
    Logger.info('  npx guarahooks-cli add <hook-name>');
    Logger.break();
  });
