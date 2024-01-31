import { join } from 'node:path'
import backup from './backup.js'
import config from './config.js'
import { exists, readFile, remove, rename, writeFile } from './helpers/file-system.js'
import { ROOT } from './lib/constants.js'
import { ONE_SECOND } from './utils/time.js'
import authorize from './utils/google-drive/authenticate.js'
import logger, { LOADING } from './lib/logger.js'

export default { start }

let executing = false
async function start () {
  logger.info('Conectando a Google Drive...', LOADING.START)
  try {
    await authorize()
    logger.info(' OK', LOADING.END)
  } catch (error) {
    logger.error(' ERROR', LOADING.END)
    logger.error('No se ha podido conectar a Google Drive. Revisa el archivo google-credentials/credentials.json')
    process.exit(1)
  }

  startLoop()
  setInterval(startLoop, ONE_SECOND * 10)
}

async function startLoop () {
  const hasToExecute = await canExecute()
  if (!hasToExecute || executing) return

  executing = true
  await backup()
  executing = false
}

async function canExecute () {
  const d = new Date()
  const day = d.getDay()
  const hour = d.getHours()
  const minute = d.getMinutes()

  const forceExecutionPath = join(ROOT, 'forzar-ejecucion.txt')
  const newForceExecutionPath = join(ROOT, 'forzar-ejecucion.txt_disabled')
  if (await exists(forceExecutionPath)) {
    await rename(forceExecutionPath, newForceExecutionPath)
    return true
  }

  const { backupTime, backupDays } = config
  const { hours: backupHour, minutes: backupMinute } = backupTime

  const lastExecutionPath = join(ROOT, 'last-execution.json')
  if (!await exists(lastExecutionPath)) {
    await writeFile(lastExecutionPath, JSON.stringify({}))
  }
  const lastExecution = JSON.parse(await readFile(lastExecutionPath))
  if (lastExecution.day === day && lastExecution.hour === hour && lastExecution.minute === minute) {
    return false
  }

  if (backupDays.includes(day) && backupHour === hour && backupMinute === minute) {
    await remove(lastExecutionPath)
    await writeFile(lastExecutionPath, JSON.stringify({ day, hour, minute }))
    return true
  }

  return false
}
