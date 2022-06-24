import WebSocket, {createWebSocketStream, WebSocketServer} from 'ws';
import {httpServer} from './src/http_server/index.js';
import {CommandHandler} from './src/socket/controller.js';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const socket = new WebSocket('ws:/localhost');

export const wss = new WebSocketServer({port: 80});


wss.on('connection', ws => {
    console.log('Start connection')
    ws.send('connection_ready');
    ws.on('close', () => {
        console.log('Connection closed');
        ws.close();
    })
    // Streams here ^_^
    const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});
    const handler = new CommandHandler();
    duplex.pipe(handler).pipe(duplex);
});

process.on('SIGINT', () => {
    console.log('Goodbye')
    wss.emit('close');
    process.exit();
});

wss.on('close', () => {
    console.log('All connection closed');
    wss.close();
    socket.close();
})

wss.on('error',err =>{
    console.log(err);
})