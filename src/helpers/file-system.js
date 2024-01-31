import fs from 'node:fs'

export const createWriteStream = fs.createWriteStream
export const createReadStream = fs.createReadStream

export default {
  readDir,
  readFile,
  exists,
  mkdir,
  copyDir,
  createWriteStream,
  createReadStream,
  remove
}

export async function readDir (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

export async function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export async function exists (path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) resolve(false)
      resolve(true)
    })
  })
}

export async function mkdir (path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export async function copyDir (src, dest) {
  if (!await exists(dest)) await mkdir(dest)
  return new Promise((resolve, reject) => {
    fs.cp(src, dest, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export async function remove (path) {
  return new Promise((resolve, reject) => {
    fs.rm(path, { recursive: true }, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export async function writeFile (path, content) {
  if (!await exists(path)) await fs.writeFileSync(path, '')

  return new Promise((resolve, reject) => {
    fs.appendFile(path, content, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export async function rename (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}
