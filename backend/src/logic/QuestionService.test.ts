import { ConflictError } from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { PostQuestionRequest } from 'src/model/api/Question';
import { LabelModel } from 'src/model/entity/Label';
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
  let mockLabelModel: any;

  beforeEach(() => {
    mockQuestionModel = {};
    mockTokenModel = {};
    mockLabelModel = {};

    bindings
      .rebind<QuestionModel>(QuestionModel)
      .toConstantValue(mockQuestionModel);
    bindings.rebind<TokenModel>(TokenModel).toConstantValue(mockTokenModel);
    bindings.rebind<LabelModel>(LabelModel).toConstantValue(mockLabelModel);

    mockQuestionModel.create = jest.fn();
    mockTokenModel.find = jest.fn(() => ({ userId: 'user-id' }));
    mockLabelModel.create = jest.fn();
    mockLabelModel.find = jest.fn(() => ({ id: 'label-id' }));
    mockLabelModel.findAllByOwner = jest.fn(() => [
      { id: 'label-id', label: 'label1' },
    ]);

    service = bindings.get<QuestionService>(QuestionService);
  });

  describe('createQuestion', () => {
    it('should work', async () => {
      await service.createQuestion('token', {} as PostQuestionRequest);
      expect(mockQuestionModel.create).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.find).toBeCalledTimes(1);
    });
  });

  describe('createLabel', () => {
    it('should work', async () => {
      await service.createLabel('token', { label: 'label' });
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.findAllByOwner).toBeCalledTimes(1);
      expect(mockLabelModel.create).toBeCalledTimes(1);
    });

    it('should fail with conlict', async () => {
      await expect(() =>
        service.createLabel('token', { label: 'label1' })
      ).rejects.toThrow(ConflictError);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.findAllByOwner).toBeCalledTimes(1);
      expect(mockLabelModel.create).toBeCalledTimes(0);
    });
  });

  describe('getLabel', () => {
    it('should work', async () => {
      await service.getLabel('token');
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.findAllByOwner).toBeCalledTimes(1);
    });
  });
});
