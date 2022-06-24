export function getPX(command: string): number {
    return +command.split(' ')[1];
}

export function getTwoPX(command: string): { width: number, length: number } {
    const split = command.split(' ');
    return {width: +split[1], length: +split[2]};
}