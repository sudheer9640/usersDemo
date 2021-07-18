import http from 'http';
import app from './src/app';
import { onError, onListening } from './src/utils/serverHandlers';
import {envConstants} from "./src/config/envConfig";
const port = envConstants.PORT;

const startServer = () => {
  const server = http.createServer(app);
  server.listen(port);
  server.on('error', onError(port));
  server.on('listening', onListening(server));
};

startServer();
