import {WebSocketServer} from 'ws';
import robot from "robotjs";
import {getPX, getTwoPX} from "./common.js";

robot.setMouseDelay(5);

export function drawCircle(command: string, ws: WebSocketServer): void {
    const radius = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    ws.send(command);
    robot.setMouseDelay(10);
    robot.mouseToggle('down', 'left');
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const xO = x + (radius * Math.cos(i)) - radius;
        const yO = y + (radius * Math.sin(i));
        robot.moveMouse(xO, yO);
    }
    robot.mouseToggle('up', 'left');
}

export function drawRectangle(command: string, ws: WebSocketServer): void {
    const {width, length} = getTwoPX(command);
    ws.send(command);
    rectangle(width, length);
}

export function drawSquare(command: string, ws: WebSocketServer): void {
    const width = getPX(command);
    ws.send(command);
    rectangle(width, width)
}

function rectangle(width: number, length: number): void {
    let {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.mouseToggle('down', 'left');
    robot.moveMouseSmooth(x + length, y)
    x = robot.getMousePos().x;
    robot.moveMouseSmooth(x, y + width);
    y = robot.getMousePos().y;
    robot.moveMouseSmooth(x - length, y);
    x = robot.getMousePos().x;
    robot.moveMouseSmooth(x, y - width);
    robot.mouseToggle('up', 'left');
}