import { Command } from 'commander';

import { Logger } from '../utils/logger.js';
import { getRegistryIndex } from '../utils/registry/index.js';

export const list = new Command()
  .name('list')
  .description('List available hooks')
  .option('-c, --category <category>', 'filter by category')
  .option('-s, --search <term>', 'search hooks by name or description')
  .option('--table', 'display in table format', true)
  .action(async (opts) => {
    try {
      const index = await getRegistryIndex();
      let hooks = index.hooks;

      // Filter by category
      if (opts.category) {
        hooks = hooks.filter((hook) => hook.category === opts.category);
      }

      // Search by term
      if (opts.search) {
        const searchTerm = opts.search.toLowerCase();
        hooks = hooks.filter(
          (hook) =>
            hook.name.toLowerCase().includes(searchTerm) ||
            hook.description.toLowerCase().includes(searchTerm) ||
            hook.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)),
        );
      }

      if (hooks.length === 0) {
        Logger.warn('No hooks found matching your criteria.');
        return;
      }

      Logger.info(`Found ${hooks.length} hook(s):\n`);

      if (opts.table) {
        const tableData = hooks.map((hook) => ({
          Name: hook.name,
          Description: hook.description,
          Category: hook.category,
          Tags: hook.tags?.join(', ') || '',
        }));

        Logger.table(tableData);
      } else {
        hooks.forEach((hook) => {
          console.log(`📦 ${hook.name}`);
          console.log(`   ${hook.description}`);
          console.log(`   Category: ${hook.category}`);
          if (hook.tags && hook.tags.length > 0) {
            console.log(`   Tags: ${hook.tags.join(', ')}`);
          }
          console.log();
        });
      }

      Logger.break();
      Logger.info('Available categories:');
      Object.keys(index.categories).forEach((category) => {
        const count = index.categories[category].length;
        console.log(`  ${category}: ${count} hook(s)`);
      });
    } catch (error) {
      Logger.error('Failed to fetch hooks list');
      Logger.error(error instanceof Error ? error.message : 'Unknown error');
      process.exit(1);
    }
  });
