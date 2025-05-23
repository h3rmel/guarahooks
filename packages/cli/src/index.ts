#!/usr/bin/env node
import { Command } from 'commander';

import { add } from './commands/add.js';
import { docs } from './commands/docs.js';
import { init } from './commands/init.js';
import { list } from './commands/list.js';

const program = new Command()
  .name('guarahooks-cli')
  .description(
    'CLI for installing and managing guarahooks - React hooks library',
  )
  .version('0.1.0');

program.addCommand(init).addCommand(add).addCommand(list).addCommand(docs);

program.parse();
