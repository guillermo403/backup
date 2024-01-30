import { join } from 'node:path'

export const __dirname = () => join(import.meta.url.replace('file://', ''), '..')
export const ROOT = join(__dirname(), '..', '..')
export const googleApi = { client: null }

export default {
  __dirname,
  ROOT,
  googleApi
}
