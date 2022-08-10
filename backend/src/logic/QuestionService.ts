import { inject, injectable } from 'inversify';
import { QuestionAccess } from 'src/access/QuestionAccess';
import {
  PostQuestionRequest,
  PostQuestionResponse,
} from 'src/model/api/Question';
import { QuestionEntity } from 'src/model/entity/QuestionEntity';
import { cognitoSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for Question
 */
@injectable()
export class QuestionService {
  @inject(cognitoSymbol)
  private readonly cognitoUserId!: string;

  @inject(QuestionAccess)
  private readonly questionAccess!: QuestionAccess;

  public async cleanup() {
    await this.questionAccess.cleanup();
  }

  public async createQuestion(
    data: PostQuestionRequest
  ): Promise<PostQuestionResponse> {
    console.log(data, this.cognitoUserId);

    const question = new QuestionEntity();
    question.type = data.type;
    question.content = data.content;
    question.answer = data.answer ?? null;
    question.userId = this.cognitoUserId;

    return await this.questionAccess.save(question);
  }
}
