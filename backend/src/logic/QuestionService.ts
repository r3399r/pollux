import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import {
  PostQuestionRequest,
  PostQuestionResponse,
} from 'src/model/api/Question';
import { Question, QuestionModel } from 'src/model/entity/Question';
import { TokenModel } from 'src/model/entity/Token';

/**
 * Service class for Question
 */
@injectable()
export class QuestionService {
  @inject(QuestionModel)
  private readonly questionModel!: QuestionModel;
  @inject(TokenModel)
  private readonly tokenModel!: TokenModel;

  public async createQuestion(
    token: string,
    data: PostQuestionRequest
  ): Promise<PostQuestionResponse> {
    const { userId } = await this.tokenModel.find(token);
    const question: Question = { id: uuidv4(), owner: userId, ...data };

    await this.questionModel.create(question);

    return question;
  }
}
