import { inject, injectable } from 'inversify';
import { IsNull } from 'typeorm';
import { DbAccess } from 'src/access/DbAccess';
import { QuestionAccess } from 'src/access/QuestionAccess';
import { QuestionTagAccess } from 'src/access/QuestionTagAccess';
import { ViewQuestionAccess } from 'src/access/ViewQuestionAccess';
import { BadRequestError, NotFoundError } from 'src/celestial-service/error';
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

  @inject(DbAccess)
  private readonly dbAccess!: DbAccess;

  @inject(QuestionAccess)
  private readonly questionAccess!: QuestionAccess;

  @inject(QuestionTagAccess)
  private readonly questionTagAccess!: QuestionTagAccess;

  @inject(ViewQuestionAccess)
  private readonly vQuestionAccess!: ViewQuestionAccess;

  public async cleanup() {
    await this.dbAccess.cleanup();
  }

  public async createQuestion(
    data: PostQuestionRequest
  ): Promise<PostQuestionResponse> {
    await this.dbAccess.startTransaction();
    try {
      const question = new QuestionEntity();
      question.content = data.content;
      question.answer = data.answer ?? null;
      question.solution = data.solution ?? null;
      question.isMathjax = data.isMathjax;
      question.userId = this.cognitoUserId;

      const res = await this.questionAccess.save(question);

      const questionTags = data.tagId.map((id) => {
        const questionTag = new QuestionTagEntity();
        questionTag.questionId = res.id;
        questionTag.tagId = id;

        return questionTag;
      });

      await this.questionTagAccess.saveMany(questionTags);
      await this.dbAccess.commitTransaction();

      return { ...res, tagId: data.tagId };
    } catch (e) {
      await this.dbAccess.rollbackTransaction();
      throw e;
    }
  }

  public async getQuestionOfUser(
    param: GetQuestionParam | null
  ): Promise<GetQuestionResponse> {
    if (param === null) {
      const res = await this.vQuestionAccess.findMany({
        where: { userId: this.cognitoUserId },
      });

      return res.map((v) => ({ ...v, tagId: v.tagId?.split(',') ?? [] }));
    }
    if (param.tagId === 'null') {
      const res = await this.vQuestionAccess.findMany({
        where: { userId: this.cognitoUserId, tagId: IsNull() },
      });

      return res.map((v) => ({ ...v, tagId: v.tagId?.split(',') ?? [] }));
    }

    const tagIds = param.tagId.split(',');
    const questionTags = await this.questionTagAccess.findMany({
      where: tagIds.map((v) => ({ tagId: v })),
    });
    const questionIds = [...new Set(questionTags)];

    const res = await this.vQuestionAccess.findMany({
      where: questionIds.map((v) => ({
        userId: this.cognitoUserId,
        id: v.questionId,
      })),
    });

    return res.map((v) => ({ ...v, tagId: v.tagId?.split(',') ?? [] }));
  }

  public async updateQuestion(id: string, data: PutQuestionRequest) {
    const oldQuestion = await this.questionAccess.findById(id);
    if (oldQuestion.userId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const question = new QuestionEntity();
    question.id = id;
    question.content = data.content;
    question.answer = data.answer ?? null;
    question.solution = data.solution ?? null;
    question.isMathjax = data.isMathjax;
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
    await this.dbAccess.startTransaction();
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
      await this.dbAccess.commitTransaction();

      return [...res, ...oldPairs.filter((v) => commonTagId.includes(v.tagId))];
    } catch (e) {
      await this.dbAccess.rollbackTransaction();
      throw e;
    }
  }
}
