import { BadRequestError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { IsNull } from 'typeorm';
import { QuestionAccess } from 'src/access/QuestionAccess';
import { QuestionTagAccess } from 'src/access/QuestionTagAccess';
import { ViewQuestionAccess } from 'src/access/ViewQuestionAccess';
import {
  GetQuestionParam,
  GetQuestionResponse,
  PostQuestionRequest,
  PostQuestionResponse,
  PostQuestionTagRequest,
  PostQuestionTagResponse,
  PutQuestionRequest,
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

  @inject(ViewQuestionAccess)
  private readonly vQuestionAccess!: ViewQuestionAccess;

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

  public async getQuestionOfUser(
    param: GetQuestionParam | null
  ): Promise<GetQuestionResponse> {
    if (param === null)
      return await this.vQuestionAccess.findMany({
        where: { userId: this.cognitoUserId },
      });
    if (param.tagId === 'null')
      return await this.vQuestionAccess.findMany({
        where: { userId: this.cognitoUserId, tag: IsNull() },
      });

    const tagIds = param.tagId.split(',');
    const questionTags = await this.questionTagAccess.findMany({
      where: tagIds.map((v) => ({ tagId: v })),
    });
    const questionIds = [...new Set(questionTags)];

    return await this.vQuestionAccess.findMany({
      where: questionIds.map((v) => ({
        userId: this.cognitoUserId,
        id: v.questionId,
      })),
    });
  }

  public async updateQuestion(id: string, data: PutQuestionRequest) {
    const question = new QuestionEntity();
    question.id = id;
    question.type = data.type;
    question.content = data.content;
    question.answer = data.answer ?? null;
    question.userId = this.cognitoUserId;

    const res = await this.questionAccess.update(question);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async deleteQuestion(id: string) {
    const res = await this.questionAccess.hardDeleteById(id);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
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
      throw e;
    }
  }
}
