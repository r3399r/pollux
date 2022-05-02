import { ConflictError } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import {
  GetQuestionLabelResponse,
  GetQuestionResponse,
  PostQuestionLabelRequest,
  PostQuestionLabelResponse,
  PostQuestionRequest,
  PostQuestionResponse,
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

  public async getQuestion(token: string): Promise<GetQuestionResponse> {
    const { userId } = await this.tokenModel.find(token);

    let res: Question[] = [];
    const labels = await this.labelModel.findAllByOwner(userId);
    await Promise.all(
      labels.map(async (v) => {
        const questions = await this.questionModel.findAllByLabel(v.id);
        res = [...res, ...questions];
      })
    );

    return res;
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
