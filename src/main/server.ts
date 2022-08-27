import dotenv from 'dotenv'
import { setupDB } from './config/db'
dotenv.config()
import env from './config/env'

const runApp = async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => console.log('server run', env))
}

runApp()
setupDB()
