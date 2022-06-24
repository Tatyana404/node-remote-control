import * as navigation from './navigation.js';
import * as drawing from './drawing.js';
import * as screen from './screen.js'
import {Transform, TransformCallback} from 'stream';

export class CommandHandler extends Transform {
    constructor() {
        super({decodeStrings: false, encoding: 'utf-8'});
    }

    async _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
        const command: string = chunk.toString();
        console.log(command);
        callback(null, await this.controller(command));
    }

    async controller(command: string): Promise<string> {
        if (command.startsWith('mouse_up')) {
            return navigation.up(command);
        } else if (command.startsWith('mouse_down')) {
            return navigation.down(command);
        } else if (command.startsWith('mouse_left')) {
            return navigation.left(command);
        } else if (command.startsWith('mouse_right')) {
            return navigation.right(command);
        } else if (command.startsWith('mouse_position')) {
            return navigation.mousePosition();
        } else if (command.startsWith('draw_circle')) {
            return drawing.drawCircle(command);
        } else if (command.startsWith('draw_rectangle')) {
            return drawing.drawRectangle(command);
        } else if (command.startsWith('draw_square')) {
            return drawing.drawSquare(command);
        } else if (command.startsWith('prnt_scrn')) {
            return await screen.prntScrn(command);
        }
    }
}