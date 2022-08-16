import { moveMouse } from 'robotjs'

export const moveCursorUp = (x: number, y: number, width: number) => moveMouse(x, y - width)

export const moveCursorDown = (x: number, y: number, width: number) => moveMouse(x, y + width)

export const moveCursorLeft = (x: number, y: number, width: number) => moveMouse(x - width, y)

export const moveCursorRight = (x: number, y: number, width: number) => moveMouse(x + width, y)
