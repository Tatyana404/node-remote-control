import { getMousePos, moveMouse, mouseToggle, screen } from 'robotjs'
import { createWebSocketStream, WebSocketServer } from 'ws'
import Jimp from 'jimp'
import { httpServer } from './src/http_server/index'
import { Сoordinates } from './src/interfaces/main'

const HTTP_PORT = 3000

httpServer.listen(HTTP_PORT, () => console.log(`Start static http server on the ${HTTP_PORT} port!`))

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', ws => {
  const duplex = createWebSocketStream(ws, {encoding: 'utf-8', decodeStrings: false})

  duplex.on('data', (data: Buffer) => {
    const [command, w, l] = data.toString().split(' ')

    let { x, y }: { x: number; y: number } = getMousePos()
    const width: number = Number(w)
    const length: number = Number(l)
    const x1: number = x
    const y1: number = y

    switch (command) {
      case 'mouse_up':
        moveMouse(x, y - width)

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'mouse_down':
        moveMouse(x, y + width)

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'mouse_left':
        moveMouse(x - width, y)

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'mouse_right':
        moveMouse(x + width, y)

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'mouse_position':
        duplex.write(`${data} ${x},${y}\0`, 'utf-8')

        break
      case 'draw_circle':
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

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'draw_rectangle':
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

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'draw_square':
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

        duplex.write(`${data}\0`, 'utf-8')
        break
      case 'prnt_scrn':
        ;(async () => {
          const { image, width, height } = screen.capture(x, y, 200, 200)
          const img = new Jimp(width, height)
          let pos = 0

          img.scanQuiet(0,0,img.bitmap.width,img.bitmap.height,(x, y, idx) => {
              img.bitmap.data[idx + 2] = image.readUInt8(pos++)
              img.bitmap.data[idx + 1] = image.readUInt8(pos++)
              img.bitmap.data[idx + 0] = image.readUInt8(pos++)
              img.bitmap.data[idx + 3] = image.readUInt8(pos++)
            }
          )

          const base64 = await img.getBase64Async(Jimp.MIME_PNG)
          duplex.write(`${data} ${base64.substring(22)}\0`, 'utf-8')
        })()

        break
      default:
        duplex.write('not_found\0', 'utf-8')

        break
    }
  })

  duplex.write('not_found\0', 'utf-8')
})
