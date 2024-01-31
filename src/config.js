import { join, sep } from 'node:path'
import { exists, mkdir, readFile } from './helpers/file-system.js'
import { ROOT } from './lib/constants.js'
import logger, { LOADING } from './lib/logger.js'
import { daysOfWeek } from './utils/days-of-week.js'

// Create necessary folders
const folders = ['logs', 'backups']
for (const folder of folders) {
  const folderPath = join(ROOT, folder)
  if (!await exists(folderPath)) await mkdir(folderPath)
}

// Read config and load it
let c = await readFile(join(ROOT, 'config.json'))
try {
  logger.info('Cargando configuración...', LOADING.START)
  c = JSON.parse(c)
} catch (e) {
  logger.error(' ERROR', LOADING.END)
  logger.error('No se ha podido cargar la configuración. Revisa el archivo config.json')
  c = {}
}

const d = new Date()
const day = String(d.getFullYear()) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0')

// Backup folders
const backups = []
for (const dir of c.carpetas) {
  const dirName = dir.split(sep).pop()
  backups.push(
    {
      dir_name: dirName,
      dir_path: dir,
      backup_path: join(ROOT, 'backups', `${dirName}_${day}`),
      backup_zip_path: join(ROOT, 'backups', `${dirName}_${day}.zip`)
    }
  )
}

// Backup days
const backupDays = []
for (const day of c.dias) {
  if (!(day in daysOfWeek)) {
    logger.error(' ERROR', LOADING.END)
    logger.error(`El día ${day} no es válido`)
    process.exit(1)
  }
  backupDays.push(daysOfWeek[day])
}

// Backup time
const backupTime = c.hora.split(':')
if (backupTime.length !== 2 || isNaN(Number(backupTime[0])) || isNaN(Number(backupTime[1]))) {
  logger.error(' ERROR', LOADING.END)
  logger.error('La hora no es válida')
  process.exit(1)
}

// End loading config
logger.info(' OK', LOADING.END)

export default {
  backups,
  backupDays,
  backupTime: {
    hours: Number(backupTime[0]),
    minutes: Number(backupTime[1])
  },
  driveParentId: c.id_carpeta_drive
}
