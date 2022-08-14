import { BadRequestError, NotFoundError } from '@y-celestial/service';
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
  PutQuestionRequest,
  PutQuestionTagRequest,
  PutQuestionTagResponse,
} from 'src/model/api/Question';
import { QuestionEntity } from 'src/model/entity/QuestionEntity';
import { QuestionTagEntity } from 'src/model/entity/QuestionTagEntity';
import { cognitoSymbol } from 'src/util/LambdaSetup';
import { difference, intersection } from 'src/util/setTheory';

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
    const oldQuestion = await this.questionAccess.findById(id);
    if (oldQuestion.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

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
    const question = await this.questionAccess.findById(id);
    if (question.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const res = await this.questionAccess.hardDeleteById(id);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async replaceQuestionTagPair(
    id: string,
    data: PutQuestionTagRequest
  ): Promise<PutQuestionTagResponse> {
    await this.questionTagAccess.startTransaction();
    try {
      const question = await this.questionAccess.findById(id);
      if (question.userId !== this.cognitoUserId)
        throw new NotFoundError('not found');

      const oldPairs = await this.questionTagAccess.findMany({
        where: { questionId: id },
      });

      const deletedTagId = difference(
        oldPairs.map((v) => v.tagId),
        data
      );
      const newTagId = difference(
        data,
        oldPairs.map((v) => v.tagId)
      );
      const commonTagId = intersection(
        data,
        oldPairs.map((v) => v.tagId)
      );

      for (const tagId of deletedTagId) {
        const pid = oldPairs.find((v) => v.tagId === tagId)?.id;
        if (pid) await this.questionTagAccess.hardDeleteById(pid);
      }

      const entities = newTagId.map((v) => {
        const questionTag = new QuestionTagEntity();
        questionTag.questionId = id;
        questionTag.tagId = v;

        return questionTag;
      });

      const res = await this.questionTagAccess.saveMany(entities);
      await this.questionTagAccess.commitTransaction();

      return [...res, ...oldPairs.filter((v) => commonTagId.includes(v.tagId))];
    } catch (e) {
      await this.questionTagAccess.rollbackTransaction();
      throw e;
    }
  }
}
