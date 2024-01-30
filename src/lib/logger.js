import { join } from 'node:path'
import { writeFile } from '../helpers/file-system.js'
import { ROOT } from './constants.js'

export default {
  error,
  info
}

export const LOADING = {
  START: true,
  END: false,
  NOT_LOADING: undefined
}

function info (message, loading) {
  if (message instanceof Error) {
    return writeLog({ message: message.stack, type: 'error', loading })
  }

  if (typeof message === 'object') {
    try {
      return writeLog({ message: JSON.stringify(message), type: 'info', loading })
    } catch (error) {
      throw new Error('Error al intentar parsear el objeto')
    }
  }

  writeLog({ message, type: 'info', loading })
}

function error (message, loading) {
  if (!(message instanceof Error)) return writeLog({ message, type: 'error', loading })

  writeLog({ message, type: 'error', loading })
}

function writeLog ({ message, type, loading }) {
  const d = new Date()
  const yyyymmdd = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
  const localDate = yyyymmdd + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ':' + String(d.getSeconds()).padStart(2, '0')

  const logName = `backup-${yyyymmdd}.log`
  const w = (msg) => writeFile(join(ROOT, 'logs', logName), msg)
  if (typeof message !== 'string') message = String(message)

  let str = ''
  if (loading === LOADING.NOT_LOADING) {
    str += `${localDate} [${type.toUpperCase()}] # ${message}\n`
  } else if (loading === LOADING.START) {
    str += `${localDate} [${type.toUpperCase()}] # ${message}`
  } else if (loading === LOADING.END) {
    str += `${message}\n`
  }

  process.stdout._write(str)
  w(str)
}
