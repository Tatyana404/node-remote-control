import { createServer, IncomingMessage, ServerResponse } from 'http'
import { resolve, dirname } from 'path'
import { createReadStream } from 'fs'

export const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    const __dirname = resolve(dirname(''))
    const file_path = __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url)
    let body = ''

    const data = createReadStream(file_path)

    data.on('data', chunk => (body += chunk))

    data.on('end', () => {
      res.writeHead(200)
      res.end(body)
    })

    data.on('error', err => {
      res.writeHead(404)
      res.end(JSON.stringify(err))
      return
    })
  }
)
