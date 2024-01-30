import config from './config.js'
import { copyDir, exists, remove } from './helpers/file-system.js'
import logger, { LOADING } from './lib/logger.js'
import createZip from './utils/create-zip.js'
import uploadFile from './utils/google-drive/upload.js'

export default async function backup () {
  logger.info('Ejecutando backup...')

  for (const backup of config.backups) {
    if (!await exists(backup.dir_path)) {
      logger.error(`La carpeta '${backup.dir_path}' no existe`)
      return
    }

    if (await exists(backup.backup_path)) {
      logger.error('El backup ya existe')
      return
    }

    logger.info(`Copiando la carpeta ${backup.dir_path}...`, LOADING.START)
    await copyDir(backup.dir_path, backup.backup_path)
    logger.info(' OK', LOADING.END)

    logger.info('Creando el zip...', LOADING.START)
    await createZip({ backupDir: backup.backup_path, zipPath: backup.backup_zip_path })
    logger.info(' OK', LOADING.END)

    // Remove backup folder
    await remove(backup.backup_path)

    // Upload to Google Drive
    await uploadFile(backup.backup_zip_path, backup.backup_zip_path.split('/').pop())

    // Remove zip
    await remove(backup.backup_zip_path)
  }
}
