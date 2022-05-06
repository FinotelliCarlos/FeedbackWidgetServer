import { MailAdapter, sendMailData } from '../mailAdapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'f5728d011d65a5',
    pass: 'f50c5f2e8412d9'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: sendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback <feedback.widget@feedback.com>',
      to: 'Carlos Finotelli <carlos.finotelli@outlook.com>',
      subject,
      html: body,
    })
  }
}
