import robot from 'robotjs';
import Jimp from 'jimp';

export async function prntScrn(command: string): Promise<string> {
    const {x, y}: { x: number, y: number } = robot.getMousePos();
    const img = robot.screen.capture(x, y, 200, 200);

    const bitmap = img.image;
    const data: number[] = [];
    for (let i = 0; i < bitmap.length; i += 4) {
        data.push(bitmap[i + 2], bitmap[i + 1], bitmap[i], bitmap[i + 3])
    }

    const jimp = await new Jimp({
        "data": new Uint8Array(data),
        "width": img.width,
        "height": img.height
    });

    const base64 = await jimp.getBufferAsync(Jimp.MIME_PNG);
    return `prnt_scrn ${base64.toString('base64')}`;
}
