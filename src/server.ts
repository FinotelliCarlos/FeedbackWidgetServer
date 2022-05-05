import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

const app = express()
const port = 3333;

app.use(express.json())

app.post('/feedbacks', async (req,res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })


  res.status(201).json({data: feedback })
})

app.listen(port, () => {
  console.log(`Server is running in port: http://localhost:${port} `)
});