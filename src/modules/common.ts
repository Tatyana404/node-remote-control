import { Duplex } from 'stream'

export const mainWrapper = (command: string, duplex: Duplex, commandFunction?: void, customWrite?: boolean, isWrite?: boolean) => {
  if (isWrite) {
    try {
      commandFunction && commandFunction
    } catch (err) {
      console.log(`Command: ${command}\nResult: error\n`)
      duplex.write(`${command}\0`, 'utf-8')
    }
  } else {
    try {
      commandFunction && commandFunction
      console.log(`Command: ${command}\nResult: successfully\n`)
      customWrite ? customWrite : duplex.write(`${command}\0`, 'utf-8')
    } catch (err) {
      console.log(`Command: ${command}\nResult: error\n`)
      duplex.write(`${command}\0`, 'utf-8')
    }
  }
}
