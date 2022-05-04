import { ConflictError, UnauthorizedError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import {
  GetQuestionLabelResponse,
  GetQuestionParams,
  GetQuestionResponse,
  PostQuestionLabelRequest,
  PostQuestionLabelResponse,
  PostQuestionRequest,
  PostQuestionResponse,
  PutQuestionIdRequest,
  PutQuestionIdResponse,
} from 'src/model/api/Question';
import { Label, LabelModel } from 'src/model/entity/Label';
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
  @inject(LabelModel)
  private readonly labelModel!: LabelModel;

  public async createQuestion(
    token: string,
    data: PostQuestionRequest
  ): Promise<PostQuestionResponse> {
    // check if input label id exists
    const { id: labelId } = await this.labelModel.find(data.labelId);

    const { userId } = await this.tokenModel.find(token);
    const question: Question = {
      id: uuidv4(),
      labelId,
      type: data.type,
      question: data.question,
      answer: data.answer,
      ownerId: userId,
    };

    await this.questionModel.create(question);

    return question;
  }

  public async reviseQuestion(
    token: string,
    id: string,
    data: PutQuestionIdRequest
  ): Promise<PutQuestionIdResponse> {
    const { userId } = await this.tokenModel.find(token);
    const oldQuestion = await this.questionModel.find(id);

    // check input label exists
    await this.labelModel.find(data.labelId);

    if (oldQuestion.ownerId !== userId)
      throw new UnauthorizedError('unauthorized');

    const newQuestion = {
      ...oldQuestion,
      labelId: data.labelId,
      type: data.type,
      question: data.question,
      answer: data.answer,
    };

    await this.questionModel.replace(newQuestion);

    return newQuestion;
  }

  public async getQuestion(
    token: string,
    params: GetQuestionParams
  ): Promise<GetQuestionResponse> {
    const { userId } = await this.tokenModel.find(token);
    const label = await this.labelModel.find(params.labelId);

    if (label.ownerId !== userId) throw new UnauthorizedError('unauthorized');

    return await this.questionModel.findAllByLabel(params.labelId);
  }

  public async deleteQuestion(token: string, id: string) {
    const { userId } = await this.tokenModel.find(token);
    const question = await this.questionModel.find(id);
    if (question.ownerId !== userId)
      throw new UnauthorizedError('unauthorized');
    await this.questionModel.hardDelete(id);
  }

  public async createLabel(
    token: string,
    data: PostQuestionLabelRequest
  ): Promise<PostQuestionLabelResponse> {
    const { userId } = await this.tokenModel.find(token);
    const labels = await this.labelModel.findAllByOwner(userId);

    if (labels.map((v) => v.label).includes(data.label))
      throw new ConflictError('label already exists');

    const newLabel: Label = {
      id: uuidv4(),
      label: data.label,
      ownerId: userId,
    };
    await this.labelModel.create(newLabel);

    return newLabel;
  }

  public async getLabel(token: string): Promise<GetQuestionLabelResponse> {
    const { userId } = await this.tokenModel.find(token);

    return await this.labelModel.findAllByOwner(userId);
  }
}
