import { join } from 'node:path'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import { ROOT, googleApi } from '../../lib/constants.js'
import { readFile, writeFile } from '../../helpers/file-system.js'

const SCOPES = ['https://www.googleapis.com/auth/drive']

const credentialsPath = join(ROOT, 'google-credentials', 'credentials.json')
const tokenPath = join(ROOT, 'google-credentials', 'token.json')

export default authorize

async function loadSavedCredentialsIfExist () {
  try {
    const content = await readFile(tokenPath)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (error) {
    return null
  }
}

async function saveCredentials (client) {
  const content = await readFile(credentialsPath)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token
  })
  await writeFile(tokenPath, payload)
}

async function authorize () {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    googleApi.client = client
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: credentialsPath
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  googleApi.client = client
  return client
}
