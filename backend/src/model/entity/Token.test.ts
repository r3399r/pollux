import { DbService } from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { Token, TokenModel } from './Token';

/**
 * Tests of the Token class.
 */
describe('Token', () => {
  let model: TokenModel;
  let mockDbService: any;
  const dummyResult = { a: 1 };

  beforeEach(() => {
    mockDbService = {};
    bindings.rebind<DbService>(DbService).toConstantValue(mockDbService);

    mockDbService.getItem = jest.fn(() => dummyResult);
    mockDbService.getItems = jest.fn(() => [dummyResult]);
    mockDbService.createItem = jest.fn();
    mockDbService.putItem = jest.fn();
    mockDbService.deleteItem = jest.fn();

    model = bindings.get<TokenModel>(TokenModel);
  });

  describe('find', () => {
    it('should work', async () => {
      expect(await model.find('id')).toBe(dummyResult);
    });
  });

  describe('findAll', () => {
    it('should work', async () => {
      expect(await model.findAll()).toStrictEqual([dummyResult]);
    });
  });

  describe('create', () => {
    it('should work', async () => {
      await model.create({} as Token);
      expect(mockDbService.createItem).toBeCalledTimes(1);
    });
  });

  describe('replace', () => {
    it('should work', async () => {
      await model.replace({} as Token);
      expect(mockDbService.putItem).toBeCalledTimes(1);
    });
  });

  describe('softDelete', () => {
    it('should work', async () => {
      await model.softDelete('id');
      expect(mockDbService.getItem).toBeCalledTimes(1);
      expect(mockDbService.putItem).toBeCalledTimes(1);
    });
  });

  describe('hardDelete', () => {
    it('should work', async () => {
      await model.hardDelete('id');
      expect(mockDbService.deleteItem).toBeCalledTimes(1);
    });
  });
});
