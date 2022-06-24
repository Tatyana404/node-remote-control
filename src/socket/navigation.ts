import robot from 'robotjs';
import {getPX} from "./common.js";

export function up(command: string): string {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x, y - px);
    return command;
}

export function down(command: string): string {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x, y + px);
    return command;
}

export function left(command: string): string {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x - px, y);
    return command;
}

export function right(command: string): string {
    const px = getPX(command);
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    robot.moveMouse(x + px, y);
    return command;
}

export function mousePosition(): string {
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    return `mouse_position ${x},${y}`;
}