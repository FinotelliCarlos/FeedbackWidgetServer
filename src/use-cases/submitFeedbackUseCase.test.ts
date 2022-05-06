import { SubmitFeedbackUseCase } from './submitFeedbackUseCase'

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Exemplo de comentario',
        screenshot: 'data:image/png;base64,exemplo.png'
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Exemplo de comentario',
        screenshot: 'data:image/png;base64,exemplo.png'
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,exemplo.png'
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Exemplo de comentario',
        screenshot: 'exemplo.png'
      })
    ).resolves.not.toThrow()
  })
})
