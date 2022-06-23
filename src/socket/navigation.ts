import robot from 'robotjs';
import {WebSocketServer} from 'ws';

robot.setMouseDelay(10);

function getPX(command: string): number {
    return +command.split(' ')[1];
}

export function up(command: string, ws: WebSocketServer): void {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x, y - px);
    ws.send(command);
}

export function down(command: string, ws: WebSocketServer): void {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x, y + px);
    ws.send(command);
}

export function left(command: string, ws: WebSocketServer): void {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x - px, y);
    ws.send(command);
}

export function right(command: string, ws: WebSocketServer): void {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x + px, y);
    ws.send(command);
}

export function mousePosition(ws: WebSocketServer): void {
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    ws.send(`mouse_position ${x},${y}`);
}