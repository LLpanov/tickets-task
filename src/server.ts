import { config } from './config/config.js'
import app from './app.js'

const { PORT } = config

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}... 🌈`)
})

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION 💥 Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
