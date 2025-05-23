import { Command } from 'commander';
import { execa } from 'execa';

import { Logger } from '../utils/logger.js';

export const docs = new Command()
  .name('docs')
  .description('Open documentation')
  .argument('[hook]', 'specific hook documentation')
  .action(async (hook: string | undefined) => {
    const baseUrl = 'https://guarahooks.com';
    const url = hook ? `${baseUrl}/hooks/${hook}` : baseUrl;

    try {
      Logger.info(`Opening documentation: ${url}`);

      // Try different open commands based on platform
      const platform = process.platform;

      if (platform === 'darwin') {
        await execa('open', [url]);
      } else if (platform === 'win32') {
        await execa('start', [url], { shell: true });
      } else {
        // Linux and others
        await execa('xdg-open', [url]);
      }

      Logger.success('Documentation opened in browser!');
    } catch (error) {
      Logger.error('Failed to open documentation');
      Logger.info(`Please visit manually: ${url}`);
    }
  });
