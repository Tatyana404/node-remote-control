import { getMousePos, moveMouse, mouseToggle, screen } from 'robotjs'
import { createWebSocketStream, WebSocketServer } from 'ws'
import Jimp from 'jimp'
import { httpServer } from './src/http_server/index'
import { Сoordinates } from './src/interfaces/main'

const HTTP_PORT = 3000
const SOCKET_PORT = 8080

httpServer.listen(HTTP_PORT, () => console.log(`Start static http server on the ${HTTP_PORT} port!\nStart web socket server on the ${SOCKET_PORT} port!`))

const wss = new WebSocketServer({ port: SOCKET_PORT })

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
        ;(() => {
          try {
            moveMouse(x, y - width)
            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'mouse_down':
        ;(() => {
          try {
            moveMouse(x, y + width)
            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'mouse_left':
        ;(() => {
          try {
            moveMouse(x - width, y)
            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'mouse_right':
        ;(() => {
          try {
            moveMouse(x + width, y)
            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'mouse_position':
        ;(() => {
          try {
            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command} ${x},${y}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'draw_circle':
        ;(() => {
          try {
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

            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'draw_rectangle':
        ;(() => {
          try {
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

            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'draw_square':
        ;(() => {
          try {
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

            console.log(`Command: ${command}\nResult: successfully\n`)
            duplex.write(`${command}\0`, 'utf-8')
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
      case 'prnt_scrn':
        ;(() => {
          try {
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

              console.log(`Command: ${command}\nResult: successfully\n`)
              duplex.write(`${command} ${base64.substring(22)}\0`, 'utf-8')
            })()
          } catch (err) {
            console.log(`Command: ${command}\nResult: error\n`)
            duplex.write(`${command}\0`, 'utf-8')
          }
        })()

        break
    }
  })

  duplex.write('not_found\0', 'utf-8')
})

wss.on('headers', (parameters: string[]) => console.log('Websocket parameters', parameters))