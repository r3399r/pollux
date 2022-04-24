import { bindings } from 'src/bindings';
import { PostQuestionRequest } from 'src/model/api/Question';
import { QuestionModel } from 'src/model/entity/Question';
import { TokenModel } from 'src/model/entity/Token';
import { QuestionService } from './QuestionService';

/**
 * Tests of the QuestionService class.
 */
describe('QuestionService', () => {
  let service: QuestionService;
  let mockQuestionModel: any;
  let mockTokenModel: any;

  beforeEach(() => {
    mockQuestionModel = {};
    mockTokenModel = {};

    bindings
      .rebind<QuestionModel>(QuestionModel)
      .toConstantValue(mockQuestionModel);
    bindings.rebind<TokenModel>(TokenModel).toConstantValue(mockTokenModel);

    mockQuestionModel.create = jest.fn();
    mockTokenModel.find = jest.fn(() => ({ userId: 'user-id' }));

    service = bindings.get<QuestionService>(QuestionService);
  });

  describe('createQuestion', () => {
    it('should work', async () => {
      await service.createQuestion('token', {} as PostQuestionRequest);
      expect(mockQuestionModel.create).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
    });
  });
});
