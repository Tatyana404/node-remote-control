import WebSocket, {WebSocketServer} from 'ws';
import {httpServer} from './src/http_server/index.js';
import {controller} from "./src/socket/controller.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const socket = new WebSocket('ws:/localhost');

export const wss = new WebSocketServer({port: 80});

console.log('START!')
wss.on('connection', ws => {
    ws.send('connection ready');

    ws.on('message', data => {
        const command = data.toString();
        console.log(command)
        controller(command, ws);
    });
});

wss.on('close', () => {
    socket.terminate();
    wss.terminate();
    console.log('close')
})