import chalk from 'chalk';
import gradient from 'gradient-string';

const GUARAHOOKS_ASCII = `
    ███████╗██╗   ██╗ █████╗ ██████╗  █████╗ ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗███████╗
    ██╔════╝██║   ██║██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝
    ██║  ███╗██║   ██║███████║██████╔╝███████║███████║██║   ██║██║   ██║█████╔╝ ███████╗
    ██║   ██║██║   ██║██╔══██║██╔══██╗██╔══██║██╔══██║██║   ██║██║   ██║██╔═██╗ ╚════██║
    ╚███████║╚██████╔╝██║  ██║██║  ██║██║  ██║██║  ██║╚██████╔╝╚██████╔╝██║  ██╗███████║
     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
`;

const theme = {
  primary: '#3B82F6', // Blue
  secondary: '#8B5CF6', // Purple
  accent: '#10B981', // Green
};

export class Logger {
  static info(message: string) {
    console.log(chalk.blue('ℹ'), message);
  }

  static success(message: string) {
    console.log(chalk.green('✅'), message);
  }

  static warn(message: string) {
    console.log(chalk.yellow('⚠️'), message);
  }

  static error(message: string) {
    console.log(chalk.red('❌'), message);
  }

  static step(message: string) {
    console.log(chalk.cyan('→'), message);
  }

  static logo() {
    console.log(gradient(theme.primary, theme.secondary)(GUARAHOOKS_ASCII));
    console.log(chalk.gray('   A powerful CLI for React hooks management\n'));
  }

  static break() {
    console.log('');
  }

  static table(data: Array<Record<string, string>>) {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const maxWidths = headers.map((header) =>
      Math.max(header.length, ...data.map((row) => (row[header] || '').length)),
    );

    // Header
    const headerRow = headers
      .map((header, i) => chalk.bold(header.padEnd(maxWidths[i])))
      .join('  ');
    console.log(headerRow);

    // Separator
    const separator = headers
      .map((_, i) => '─'.repeat(maxWidths[i]))
      .join('  ');
    console.log(chalk.gray(separator));

    // Rows
    data.forEach((row) => {
      const rowStr = headers
        .map((header, i) => (row[header] || '').padEnd(maxWidths[i]))
        .join('  ');
      console.log(rowStr);
    });
  }
}
