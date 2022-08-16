import { moveMouse, mouseToggle } from 'robotjs'
import { Сoordinates } from './../interfaces/main'

export const drawCircle = (x: number, x1: number, y: number, y1: number, width: number) => {
  const getСoordinates = () => {
    const coordinates: Сoordinates[] = []
    let n = -Math.PI / 2
    const n1 = n

    coordinates.push({ x, y })

    while (n <= 2 * Math.PI + n1) {
      n += Math.PI / (width * 2)

      const x = width * Math.sin(n)
      const y = -width * Math.cos(n)

      coordinates.push({ x: x + x1 + width, y: y + y1 })
    }

    coordinates.push({ x, y })

    return coordinates
  }

  const drawPoint = ({ x, y }: { x: number; y: number }) => {
    mouseToggle('down')
    moveMouse(x, y)

    if (x === x1 && y === y1) {
      mouseToggle('up')
    }
  }

  ;(() => {
    let i = 0

    const draw = () => {
      if (i < getСoordinates().length) {
        drawPoint(getСoordinates()[i])
        i++
        draw()
      }
    }
    draw()
  })()
}

export const drawRectangle = (x1: number, y: number, y1: number, width: number, length: number) => {
  mouseToggle('down')

  for (let x = x1; x <= x1 + width; x++) {
    moveMouse(x, y)
    if (x === x1 + width && y === y1) {
      for (let x = x1 + width; y <= y1 + length; y++) {
        moveMouse(x, y)
        if (x === x1 + width && y === y1 + length) {
          for (let x = x1 + width; x >= x1; x--) {
            moveMouse(x, y)
            if (x === x1 && y === y1 + length) {
              for (let y = y1 + length; y >= y1; y--) {
                moveMouse(x, y)
                if (x === x1 && y === y1) {
                  mouseToggle('up')
                }
              }
            }
          }
        }
      }
    }
  }
}

export const drawSquare = (x1: number, y: number, y1: number, width: number) => {
  mouseToggle('down')

  for (let x = x1; x <= x1 + width; x++) {
    moveMouse(x, y)
    if (x === x1 + width && y === y1) {
      for (let x = x1 + width; y <= y1 + width; y++) {
        moveMouse(x, y)
        if (x === x1 + width && y === y1 + width) {
          for (let x = x1 + width; x >= x1; x--) {
            moveMouse(x, y)
            if (x === x1 && y === y1 + width) {
              for (let y = y1 + width; y >= y1; y--) {
                moveMouse(x, y)
                if (x === x1 && y === y1) {
                  mouseToggle('up')
                }
              }
            }
          }
        }
      }
    }
  }
}
