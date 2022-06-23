import * as navigation from "./navigation.js";
import * as drawing from "./drawing.js";

import {WebSocketServer} from 'ws';

export function controller(command: string, ws: WebSocketServer): void {
    if (command.startsWith('mouse_up')) {
        navigation.up(command, ws);
    } else if (command.startsWith('mouse_down')) {
        navigation.down(command, ws);
    } else if (command.startsWith('mouse_left')) {
        navigation.left(command, ws);
    } else if (command.startsWith('mouse_right')) {
        navigation.right(command, ws);
    } else if (command.startsWith('mouse_position')) {
        navigation.mousePosition(ws);
    } else if (command.startsWith('draw_circle')) {
        drawing.drawCircle(command, ws);
    }//draw_circle
}