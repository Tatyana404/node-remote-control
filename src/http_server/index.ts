import { createServer, IncomingMessage, ServerResponse } from 'http'
import { resolve, dirname } from 'path'
import { readFile } from 'fs'

export const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    const __dirname = resolve(dirname(''))
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url)
    readFile(file_path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) {
        res.writeHead(404)
        res.end(JSON.stringify(err))
        return
      }
      res.writeHead(200)
      res.end(data)
    })
  }
)
