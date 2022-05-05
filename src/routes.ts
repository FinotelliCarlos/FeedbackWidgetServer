import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f5728d011d65a5',
    pass: 'f50c5f2e8412d9'
  }
})

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedback <feedback.widget@feedback.com>',
    to: 'Carlos Finotelli <carlos.finotelli@outlook.com>',
    subject: 'New Feedback received!',
    html: [
      `<div styles="font-family: sans-serif; font-size: 1rem; color: #333;">`,
      `<h2>Novo Feedback: ${type}</h2>`,
      `<p>Tipo: ${type}</p>`,
      `<p>Cometario: ${comment}</p>`,
      `<p>Screenshot: ${screenshot}</p>`,
      `</div>`
    ].join('\n')
  })

  res.status(201).json({ data: feedback })
})
