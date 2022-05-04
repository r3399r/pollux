import { ConflictError, UnauthorizedError } from '@y-celestial/service';
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
    mockQuestionModel.find = jest.fn(() => ({ ownerId: 'user-id' }));
    mockQuestionModel.replace = jest.fn();
    mockQuestionModel.findAllByLabel = jest.fn(() => [{ id: '1' }]);
    mockTokenModel.find = jest.fn(() => ({ userId: 'user-id' }));
    mockLabelModel.create = jest.fn();
    mockLabelModel.find = jest.fn(() => ({
      id: 'label-id',
      ownerId: 'user-id',
    }));
    mockLabelModel.findAllByOwner = jest.fn(() => [
      { id: 'label-id', label: 'label1' },
    ]);
    mockLabelModel.hardDelete = jest.fn();

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

  describe('reviseQuestion', () => {
    it('should work', async () => {
      await service.reviseQuestion('token', 'id', {} as PostQuestionRequest);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.replace).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.hardDelete).toBeCalledTimes(0);
    });

    it('should work if label not used', async () => {
      mockQuestionModel.findAllByLabel = jest.fn(() => []);
      await service.reviseQuestion('token', 'id', {} as PostQuestionRequest);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.replace).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.hardDelete).toBeCalledTimes(1);
    });

    it('should fail with unauthorized', async () => {
      mockQuestionModel.find = jest.fn(() => ({ ownerId: 'user-id2' }));
      await expect(() =>
        service.reviseQuestion('token', 'id', {} as PostQuestionRequest)
      ).rejects.toThrow(UnauthorizedError);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.replace).toBeCalledTimes(0);
      expect(mockTokenModel.find).toBeCalledTimes(1);
    });
  });

  describe('getQuestion', () => {
    it('should work', async () => {
      await service.getQuestion('token', { labelId: 'label-id' });
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.findAllByLabel).toBeCalledTimes(1);
    });

    it('should fail with unauthorized', async () => {
      mockLabelModel.find = jest.fn(() => ({
        id: 'label-id',
        ownerId: 'user-id2',
      }));
      await expect(() =>
        service.getQuestion('token', { labelId: 'label-id' })
      ).rejects.toThrow(UnauthorizedError);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.findAllByLabel).toBeCalledTimes(0);
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
