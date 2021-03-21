import * as http from 'http'
import App from "./server";
const socketIo = require("socket.io");
import * as dotenv from "dotenv";
import socketIoHandlers from "./socket"
dotenv.config();
// tslint:disable-next-line:no-unused-expression
const port = process.env.PORT as string;

const onError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== 'listen') throw error
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

const onListening = (): void => {
    // tslint:disable-next-line:max-line-length
    console.log(`server listening on port ${port}!`)
    console.log(`PROD mode is ${process.env.NODE_ENV !== "development" ? 'ON' : 'OFF'}`)
    let addr: any = server.address()
    let bind = `port ${addr.port}`
}
App.set('port', port);
const server = http.createServer(App)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
let io = socketIo(server, {
    cors: {
        origin: '*',
    }
});
socketIoHandlers.init(io)
// io.origins("*")
// io.set('origins', '*:*')
