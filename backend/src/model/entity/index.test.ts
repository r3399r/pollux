import { DbService, ModelBase } from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { Bank, BankModel } from './Bank';
import { BankQuestion, BankQuestionModel } from './BankQuestion';
import { Label, LabelModel } from './Label';
import { Question, QuestionModel } from './Question';
import { Token, TokenModel } from './Token';
import { User, UserModel } from './User';

/**
 * Tests for the class of entities.
 */
describe('entities', () => {
  let mockDbService: any;
  const dummyResult = { a: 1 };

  const doTest = async <T extends ModelBase, K>(model: T) => {
    expect(await model.find('id')).toBe(dummyResult);
    expect(await model.findAll()).toStrictEqual([dummyResult]);
    await model.create({} as K);
    await model.replace({} as K);
    await model.softDelete('id');
    await model.hardDelete('id');
    expect(mockDbService.createItem).toBeCalledTimes(1); // create
    expect(mockDbService.putItem).toBeCalledTimes(2); // replace, softDelete
    expect(mockDbService.getItem).toBeCalledTimes(2); // find, softDelete
    expect(mockDbService.getItems).toBeCalledTimes(1); // findAll
    expect(mockDbService.deleteItem).toBeCalledTimes(1); // hardDelete
  };

  beforeEach(() => {
    mockDbService = {};
    bindings.rebind<DbService>(DbService).toConstantValue(mockDbService);

    mockDbService.getItem = jest.fn(() => dummyResult);
    mockDbService.getItems = jest.fn(() => [dummyResult]);
    mockDbService.getItemsByIndex = jest.fn(() => [dummyResult]);
    mockDbService.createItem = jest.fn();
    mockDbService.putItem = jest.fn();
    mockDbService.deleteItem = jest.fn();
  });

  describe('bank', () => {
    it('should work for general functions', async () => {
      const model = bindings.get<BankModel>(BankModel);
      await doTest<BankModel, Bank>(model);
    });

    it('findAllByOwner should work', async () => {
      const model = bindings.get<BankModel>(BankModel);
      expect(await model.findAllByOwner('user-id')).toStrictEqual([
        dummyResult,
      ]);
    });
  });

  describe('bankQuestion', () => {
    it('should work for general functions', async () => {
      const model = bindings.get<BankQuestionModel>(BankQuestionModel);
      await doTest<BankQuestionModel, BankQuestion>(model);
    });
  });

  describe('question', () => {
    it('should work for general functions', async () => {
      const model = bindings.get<QuestionModel>(QuestionModel);
      await doTest<QuestionModel, Question>(model);
    });

    it('findAllByLabel should work', async () => {
      const model = bindings.get<QuestionModel>(QuestionModel);
      expect(await model.findAllByLabel('label-id')).toStrictEqual([
        dummyResult,
      ]);
    });

    it('findAllByOwner should work', async () => {
      const model = bindings.get<QuestionModel>(QuestionModel);
      expect(await model.findAllByOwner('user-id')).toStrictEqual([
        dummyResult,
      ]);
    });
  });

  describe('token', () => {
    it('should work for general functions', async () => {
      const model = bindings.get<TokenModel>(TokenModel);
      await doTest<TokenModel, Token>(model);
    });
  });

  describe('user', () => {
    it('should work for general functions', async () => {
      const model = bindings.get<UserModel>(UserModel);
      await doTest<UserModel, User>(model);
    });
  });

  describe('label', () => {
    it('should work for general functions', async () => {
      const model = bindings.get<LabelModel>(LabelModel);
      await doTest<LabelModel, Label>(model);
    });

    it('findAllByOwner should work', async () => {
      const model = bindings.get<LabelModel>(LabelModel);
      expect(await model.findAllByOwner('user-id')).toStrictEqual([
        dummyResult,
      ]);
    });
  });
});
