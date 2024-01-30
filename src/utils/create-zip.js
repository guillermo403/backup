import archiver from 'archiver'
import { createWriteStream } from '../helpers/file-system.js'

export default function createZip ({ backupDir, zipPath }) {
  const output = createWriteStream(zipPath)
  const archive = archiver('zip', {
    zlib: { level: 4 }
  })

  return new Promise((resolve, reject) => {
    output.on('close', resolve)
    archive.on('error', reject)

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err
      }
    })

    // pipe archive data to the file
    archive.pipe(output)

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(backupDir, false)

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize()
  })
}
