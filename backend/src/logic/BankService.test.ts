import { LambdaEvent, UnauthorizedError } from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { BankModel } from 'src/model/entity/Bank';
import { BankQuestionModel } from 'src/model/entity/BankQuestion';
import { QuestionModel } from 'src/model/entity/Question';
import { TokenModel } from 'src/model/entity/Token';
import { LambdaSetup } from 'src/util/LambdaSetup';
import { BankService } from './BankService';

/**
 * Tests of the BankService class.
 */
describe('BankService', () => {
  let service: BankService;
  let mockBankModel: any;
  let mockTokenModel: any;
  let mockQuestionModel: any;
  let mockBankQuestionModel: any;

  beforeEach(() => {
    LambdaSetup.setup({
      headers: { 'x-api-token': 'token' },
    } as unknown as LambdaEvent);

    mockBankModel = {};
    mockTokenModel = {};
    mockQuestionModel = {};
    mockBankQuestionModel = {};

    bindings.rebind<BankModel>(BankModel).toConstantValue(mockBankModel);
    bindings.rebind<TokenModel>(TokenModel).toConstantValue(mockTokenModel);
    bindings
      .rebind<QuestionModel>(QuestionModel)
      .toConstantValue(mockQuestionModel);
    bindings
      .rebind<BankQuestionModel>(BankQuestionModel)
      .toConstantValue(mockBankQuestionModel);

    mockBankModel.create = jest.fn();
    mockBankModel.findAllByOwner = jest.fn(() => [{ id: 'bank-id' }]);
    mockTokenModel.find = jest.fn(() => ({ userId: 'user-id' }));
    mockQuestionModel.findAllByOwner = jest.fn(() => [
      { id: 'question-id1' },
      { id: 'question-id2' },
    ]);
    mockBankQuestionModel.create = jest.fn();

    service = bindings.get<BankService>(BankService);
  });

  describe('createBank', () => {
    it('should work', async () => {
      await service.createBank({
        name: 'name',
        questionId: ['question-id1', 'question-id2'],
      });
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.findAllByOwner).toBeCalledTimes(1);
      expect(mockBankModel.create).toBeCalledTimes(1);
      expect(mockBankQuestionModel.create).toBeCalledTimes(2);
    });

    it('should fail if not owned', async () => {
      await expect(() =>
        service.createBank({
          name: 'name',
          questionId: ['question-id1', 'question-id3'],
        })
      ).rejects.toThrow(UnauthorizedError);
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockQuestionModel.findAllByOwner).toBeCalledTimes(1);
      expect(mockBankModel.create).toBeCalledTimes(0);
      expect(mockBankQuestionModel.create).toBeCalledTimes(0);
    });
  });

  describe('getBank', () => {
    it('should work', async () => {
      await service.getBank();
      expect(mockTokenModel.find).toBeCalledTimes(1);
      expect(mockBankModel.findAllByOwner).toBeCalledTimes(1);
    });
  });
});
