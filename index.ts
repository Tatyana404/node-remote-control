import { WebSocketServer } from 'ws'
import robot from 'robotjs'
import Jimp from 'jimp'
import { httpServer } from './src/http_server/index'

const HTTP_PORT = 3000

httpServer.listen(HTTP_PORT,() => console.log(`Start static http server on the ${HTTP_PORT} port!`))
