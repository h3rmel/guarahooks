import kleur from 'kleur';

type LogArg = string | number | boolean | Error | object | null | undefined;

export const logger = {
  error(...args: LogArg[]) {
    console.log(kleur.red('[ERROR]'), ...args);
  },
  warn(...args: LogArg[]) {
    console.log(kleur.yellow('[WARN]'), ...args);
  },
  info(...args: LogArg[]) {
    console.log(kleur.blue('[INFO]'), ...args);
  },
  success(...args: LogArg[]) {
    console.log(kleur.green('[SUCCESS]'), ...args);
  },
  log(...args: LogArg[]) {
    console.log(kleur.white('[LOG]'), ...args);
  },
  break() {
    console.log('');
  },
};
