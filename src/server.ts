/* eslint-disable no-console */
import app from './app';
import config from './app/config';
import { Server } from 'http';

const PORT = process.env.PORT || config.port;
let server: Server;

function main() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Assignment 8 server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  if (server) {
    console.log('❌ Server DOWN. Unhandled Promise Rejection');
    server.close();
    process.exit(1);
  } else {
    console.log('❌ Server DOWN. Unhandled Promise Rejection');
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log('❌ Server DOWN. Uncaught Exception');
  process.exit(1);
});
