import { inject, injectable } from 'inversify';
import { QuestionAccess } from 'src/access/QuestionAccess';
import { QuestionTagAccess } from 'src/access/QuestionTagAccess';
import {
  PostQuestionRequest,
  PostQuestionResponse,
  PostQuestionTagRequest,
  PostQuestionTagResponse,
} from 'src/model/api/Question';
import { QuestionEntity } from 'src/model/entity/QuestionEntity';
import { QuestionTag } from 'src/model/entity/QuestionTag';
import { QuestionTagEntity } from 'src/model/entity/QuestionTagEntity';
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

  @inject(QuestionTagAccess)
  private readonly questionTagAccess!: QuestionTagAccess;

  public async cleanup() {
    await this.questionAccess.cleanup();
  }

  public async createQuestion(
    data: PostQuestionRequest
  ): Promise<PostQuestionResponse> {
    const question = new QuestionEntity();
    question.type = data.type;
    question.content = data.content;
    question.answer = data.answer ?? null;
    question.userId = this.cognitoUserId;

    return await this.questionAccess.save(question);
  }

  public async addQuestionTagPair(
    data: PostQuestionTagRequest
  ): Promise<PostQuestionTagResponse> {
    const pairs: QuestionTag[] = [];

    data.forEach((v) => {
      for (const tagId of v.tagId) {
        const pair = new QuestionTagEntity();
        pair.questionId = v.questionId;
        pair.tagId = tagId;

        pairs.push(pair);
      }
    });

    return await this.questionTagAccess.saveMany(pairs);
  }
}
