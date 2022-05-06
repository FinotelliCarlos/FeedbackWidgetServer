import { MailAdapter } from '../adapters/mailAdapter'
import { FeedbacksRepository } from '../repositories/feedbacksRepository'

export interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private FeedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    await this.FeedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'New Feedback',
      body: [
        `<div styles="font-family: sans-serif; font-size: 1rem; color: #333;">`,
        `<h2>Novo Feedback: ${type}</h2>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Cometario: ${comment}</p>`,
        `<p>Screenshot: ${screenshot}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}
