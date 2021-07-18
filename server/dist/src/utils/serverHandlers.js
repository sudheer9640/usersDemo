"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onListening = exports.onError = void 0;
function onError(port) {
    return (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
}
exports.onError = onError;
function onListening(server) {
    return () => {
        const addr = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        // tslint:disable-next-line:no-console
        console.log(`WPS Listening on ${bind}`);
    };
}
exports.onListening = onListening;
