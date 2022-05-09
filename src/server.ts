import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()
const devPort = 3333

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || devPort, () => {
  console.log(`Server running! `)
})
