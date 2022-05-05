import express from 'express'

const app = express()
const port = 3333;

app.get('/',(req,res) => {
  res.send('Pagina Root')
})

app.listen(port, () => {
  console.log(`Server is running in port: http://localhost:${port} `)
});