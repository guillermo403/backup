import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __dirname = () => dirname(fileURLToPath(import.meta.url))
export const ROOT = join(__dirname(), '..', '..')
export const googleApi = { client: null }

export default {
  __dirname,
  ROOT,
  googleApi
}
