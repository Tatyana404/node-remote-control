import robot from "robotjs";
import {getPX, getTwoPX} from "./common.js";

robot.setMouseDelay(5);

export function drawCircle(command: string): string {
    const radius = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();

    robot.mouseToggle('down', 'left');
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const xO = x + (radius * Math.cos(i)) - radius;
        const yO = y + (radius * Math.sin(i));
        robot.moveMouse(xO, yO);
    }
    robot.mouseToggle('up', 'left');
    return command;
}

export function drawRectangle(command: string): string {
    const {width, length} = getTwoPX(command);
    rectangle(width, length);
    return command;
}

export function drawSquare(command: string): string {
    const width = getPX(command);
    rectangle(width, width)
    return command;
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