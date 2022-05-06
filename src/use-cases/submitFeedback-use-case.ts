import { FeedbacksRepository } from "../repositories/feedbacksRepository";

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase{
  constructor(
    private FeedbacksRepository: FeedbacksRepository
  ){}

  async execute(request : SubmitFeedbackUseCaseRequest){
    const { type, comment, screenshot } = request;

    await this.FeedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

  }
}