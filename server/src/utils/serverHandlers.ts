import { Server } from 'http';

export function onError(port: number) {
    return (error: NodeJS.ErrnoException): void => {
        if (error.syscall !== 'listen') { throw error; }
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

export function onListening(server: Server): () => void {
    return () => {
        const addr: any = server.address();
        const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        // tslint:disable-next-line:no-console
        console.log(`WPS Listening on ${bind}`);
    };
}
