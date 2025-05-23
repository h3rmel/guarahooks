import { dirname, resolve } from 'path';

import { Command } from 'commander';
import ora from 'ora';
import prompts from 'prompts';

import { getConfig } from '../utils/config/get-config.js';
import { Logger } from '../utils/logger.js';
import {
  detectPackageManager,
  installDependencies,
} from '../utils/package-manager.js';
import {
  fetchHook,
  getRegistryIndex,
  resolveHookDependencies,
} from '../utils/registry/index.js';
import { HOOK_CATEGORIES } from '../utils/registry/schema.js';

export const add = new Command()
  .name('add')
  .description('Add hooks to your project')
  .argument('[hooks...]', 'the hooks to add')
  .option('-a, --all', 'add all available hooks', false)
  .option('-c, --category <category>', 'add all hooks from a category')
  .option('-e, --examples', 'include example files', false)
  .option('-t, --tests', 'include test files', false)
  .option('--dry-run', 'show what would be installed', false)
  .action(async (hooks: string[], opts) => {
    const cwd = process.cwd();
    const config = await getConfig(cwd);

    Logger.info('Adding hooks to your project...');
    Logger.break();

    let hooksToInstall: string[] = [];

    try {
      const index = await getRegistryIndex();

      // Determine which hooks to install
      if (opts.all) {
        hooksToInstall = index.hooks.map((hook) => hook.name);
      } else if (opts.category) {
        const categoryHooks = index.categories[opts.category];
        if (!categoryHooks) {
          Logger.error(`Category "${opts.category}" not found.`);
          Logger.info('Available categories:');
          Object.keys(index.categories).forEach((cat) => {
            console.log(`  ${cat}`);
          });
          process.exit(1);
        }
        hooksToInstall = categoryHooks;
      } else if (hooks.length > 0) {
        hooksToInstall = hooks;
      } else {
        // Interactive selection
        const choices = index.hooks.map((hook) => ({
          title: `${hook.name} - ${hook.description}`,
          value: hook.name,
          selected: false,
        }));

        const response = await prompts({
          type: 'multiselect',
          name: 'selectedHooks',
          message: 'Select hooks to install:',
          choices,
          min: 1,
        });

        if (!response.selectedHooks || response.selectedHooks.length === 0) {
          Logger.warn('No hooks selected.');
          process.exit(0);
        }

        hooksToInstall = response.selectedHooks;
      }

      // Resolve dependencies
      const resolvedHooks = await resolveHookDependencies(hooksToInstall);

      if (opts.dryRun) {
        Logger.info('The following hooks would be installed:');
        resolvedHooks.forEach((hook) => {
          console.log(`  ${hook}`);
        });
        process.exit(0);
      }

      Logger.step(`Installing ${resolvedHooks.length} hook(s)...`);
      Logger.break();

      const fs = await import('fs-extra');
      const packageManager = detectPackageManager(cwd);

      for (const hookName of resolvedHooks) {
        const spinner = ora(`Installing ${hookName}...`).start();

        try {
          const hook = await fetchHook(hookName);

          // Install NPM dependencies
          if (hook.dependencies && hook.dependencies.length > 0) {
            await installDependencies(
              hook.dependencies,
              packageManager,
              cwd,
              false,
            );
          }

          if (hook.devDependencies && hook.devDependencies.length > 0) {
            await installDependencies(
              hook.devDependencies,
              packageManager,
              cwd,
              true,
            );
          }

          // Write hook files
          for (const file of hook.files) {
            if (file.type === 'test' && !opts.tests && !config.includeTests)
              continue;

            const filePath = resolve(
              cwd,
              config.aliases.hooks.replace('@/', ''),
              file.name,
            );
            const fileDir = dirname(filePath);

            await fs.default.ensureDir(fileDir);

            let content = file.content;

            // Transform content based on config
            if (!config.typescript && file.name.endsWith('.ts')) {
              content = transformToJS(content);
            }

            await fs.default.writeFile(filePath, content, 'utf8');
          }

          // Write example files if requested
          if ((opts.examples || config.includeExamples) && hook.examples) {
            const examplesDir = resolve(cwd, 'examples', hookName);
            await fs.default.ensureDir(examplesDir);

            for (const example of hook.examples) {
              const examplePath = resolve(examplesDir, example.name);
              await fs.default.writeFile(examplePath, example.content, 'utf8');
            }
          }

          spinner.succeed(`Installed ${hookName}`);
        } catch (error) {
          spinner.fail(`Failed to install ${hookName}`);
          Logger.error(
            error instanceof Error ? error.message : 'Unknown error',
          );
        }
      }

      Logger.break();
      Logger.success('✨ Hooks installed successfully!');

      if (config.importStyle === 'named') {
        Logger.info('You can now import your hooks:');
        Logger.info(
          `  import { ${resolvedHooks.join(', ')} } from "${config.aliases.hooks}";`,
        );
      } else {
        Logger.info('You can now import your hooks:');
        resolvedHooks.forEach((hook) => {
          Logger.info(
            `  import ${hook} from "${config.aliases.hooks}/${hook}";`,
          );
        });
      }
    } catch (error) {
      Logger.error('Failed to add hooks');
      Logger.error(error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });

function transformToJS(content: string): string {
  // Simple TypeScript to JavaScript transformation
  return content
    .replace(/: \w+/g, '') // Remove type annotations
    .replace(/interface \w+ \{[^}]+\}/g, '') // Remove interfaces
    .replace(/\.ts/g, '.js') // Change file extensions
    .replace(/export type .+/g, ''); // Remove type exports
}
