import { DBHandler } from './app/db/db';

function writeDBAndExit() {
  DBHandler.write();
  process.exit();
}

export function exitHandler() {
  process.on('exit', writeDBAndExit);
  process.on('SIGINT', writeDBAndExit);
  process.on('SIGUSR1', writeDBAndExit);
  process.on('SIGUSR2', writeDBAndExit);
  process.on('uncaughtException', writeDBAndExit);
}
