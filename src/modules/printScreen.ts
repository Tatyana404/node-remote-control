import { screen } from 'robotjs'
import Jimp from 'jimp'

export const takeScreenshot = async (x: number, y: number, duplex: any, command: string) => {
  const { image, width, height } = screen.capture(x, y, 200, 200)
  const img = new Jimp(width, height)
  let pos = 0

  img.scanQuiet(0, 0, img.bitmap.width, img.bitmap.height, (x, y, idx) => {
    img.bitmap.data[idx + 2] = image.readUInt8(pos++)
    img.bitmap.data[idx + 1] = image.readUInt8(pos++)
    img.bitmap.data[idx + 0] = image.readUInt8(pos++)
    img.bitmap.data[idx + 3] = image.readUInt8(pos++)
  })

  const base64 = await img.getBase64Async(Jimp.MIME_PNG)

  console.log(`Command: ${command}\nResult: successfully\n`)
  duplex.write(`${command} ${base64.substring(22)}\0`, 'utf-8')
}
