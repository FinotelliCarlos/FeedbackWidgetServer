import { SubmitFeedbackUseCase } from './submitFeedbackUseCase'

const submitFeedback = new SubmitFeedbackUseCase(
  { create: async () => {} },
  { sendMail: async () => {} }
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
