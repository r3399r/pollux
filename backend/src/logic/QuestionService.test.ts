import {
  ConflictError,
  LambdaEvent,
  UnauthorizedError,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { PostQuestionRequest } from 'src/model/api/Question';
import { LabelModel } from 'src/model/entity/Label';
import { QuestionModel } from 'src/model/entity/Question';
import { TokenModel } from 'src/model/entity/Token';
import { LambdaSetup } from 'src/util/LambdaSetup';
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
    LambdaSetup.setup({
      headers: { 'x-api-token': 'token' },
      requestContext: { authorizer: { claims: { sub: 'test-user' } } },
    } as unknown as LambdaEvent);

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
    mockQuestionModel.hardDelete = jest.fn();
    mockTokenModel.find = jest.fn(() => ({ userId: 'user-id' }));
    mockLabelModel.create = jest.fn();
    mockLabelModel.find = jest.fn(() => ({
      id: 'label-id',
      ownerId: 'user-id',
    }));
    mockLabelModel.findAllByOwner = jest.fn(() => [
      { id: 'label-id', label: 'label1' },
    ]);

    service = bindings.get<QuestionService>(QuestionService);
  });

  describe('createQuestion', () => {
    it('should work', async () => {
      await service.createQuestion({} as PostQuestionRequest);
      expect(mockQuestionModel.create).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.find).toBeCalledTimes(1);
    });
  });

  describe('reviseQuestion', () => {
    it('should work', async () => {
      await service.reviseQuestion('id', {} as PostQuestionRequest);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.replace).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
    });

    it('should fail with unauthorized', async () => {
      mockQuestionModel.find = jest.fn(() => ({ ownerId: 'user-id2' }));
      await expect(() =>
        service.reviseQuestion('id', {} as PostQuestionRequest)
      ).rejects.toThrow(UnauthorizedError);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.replace).toBeCalledTimes(0);
      expect(mockTokenModel.find).toBeCalledTimes(1);
    });
  });

  describe('getQuestion', () => {
    it('should work', async () => {
      await service.getQuestion({ labelId: 'label-id' });
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
        service.getQuestion({ labelId: 'label-id' })
      ).rejects.toThrow(UnauthorizedError);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.findAllByLabel).toBeCalledTimes(0);
    });
  });

  describe('deleteQuestion', () => {
    it('should work', async () => {
      await service.deleteQuestion('id');
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.hardDelete).toBeCalledTimes(1);
    });

    it('should fail with unauthorized', async () => {
      mockQuestionModel.find = jest.fn(() => ({ ownerId: 'user-id2' }));
      await expect(() => service.deleteQuestion('id')).rejects.toThrow(
        UnauthorizedError
      );
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.hardDelete).toBeCalledTimes(0);
    });
  });

  describe('createLabel', () => {
    it('should work', async () => {
      await service.createLabel({ label: 'label' });
      expect(mockLabelModel.findAllByOwner).toBeCalledTimes(1);
      expect(mockLabelModel.create).toBeCalledTimes(1);
    });

    it('should fail with conlict', async () => {
      await expect(() =>
        service.createLabel({ label: 'label1' })
      ).rejects.toThrow(ConflictError);
      expect(mockLabelModel.findAllByOwner).toBeCalledTimes(1);
      expect(mockLabelModel.create).toBeCalledTimes(0);
    });
  });

  describe('getLabel', () => {
    it('should work', async () => {
      await service.getLabel();
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockLabelModel.findAllByOwner).toBeCalledTimes(1);
    });
  });
});
