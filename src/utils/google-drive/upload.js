import { google } from 'googleapis'
import { createReadStream } from '../../helpers/file-system.js'
import logger, { LOADING } from '../../lib/logger.js'
import { googleApi } from '../../lib/constants.js'
import config from '../../config.js'

export default async function uploadFile (file, zipName) {
  logger.info(`Subiendo '${file}' a Google Drive...`, LOADING.START)
  const authClient = googleApi.client
  if (!authClient) {
    logger.error('No se ha iniciado sesión en Google Drive')
    return
  }

  try {
    const drive = google.drive({ version: 'v3', auth: authClient })
    const fileMetadata = {
      name: zipName
    }
    if (config.driveParentId) fileMetadata.parents = [config.driveParentId]

    const media = {
      mimeType: 'application/zip',
      body: createReadStream(file)
    }

    await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id'
    })
    logger.info(' OK', LOADING.END)
  } catch (error) {
    logger.error(' ERROR', LOADING.END)
    logger.error('No se ha podido subir el archivo a Google Drive')
  }
}
