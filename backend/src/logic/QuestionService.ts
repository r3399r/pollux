import { BadRequestError } from '@y-celestial/service';
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

  public async replaceQuestionTagPair(
    data: PostQuestionTagRequest
  ): Promise<PostQuestionTagResponse> {
    await this.questionTagAccess.startTransaction();
    try {
      const pairs: QuestionTag[] = [];

      await Promise.all(
        data.map(async (v) => {
          await this.questionTagAccess.hardDeleteByQuestionId(v.questionId);
          for (const tagId of v.tagId) {
            const pair = new QuestionTagEntity();
            pair.questionId = v.questionId;
            pair.tagId = tagId;

            pairs.push(pair);
          }
        })
      );

      const res = await this.questionTagAccess.saveMany(pairs);

      await this.questionTagAccess.commitTransaction();

      return res;
    } catch (e) {
      await this.questionTagAccess.rollbackTransaction();

      const err = e as Error;
      if (err.name === 'QueryFailedError') throw new BadRequestError();
      throw e;
    }
  }
}
