import { bindings } from 'src/bindings';
import { PutUserRequest } from 'src/model/api/User';
import { TokenModel } from 'src/model/entity/Token';
import { UserModel } from 'src/model/entity/User';
import { UserService } from './UserService';

/**
 * Tests of the UserService class.
 */
describe('UserService', () => {
  let service: UserService;
  let mockUserModel: any;
  let mockTokenModel: any;

  beforeEach(() => {
    mockUserModel = {};
    mockTokenModel = {};

    bindings.rebind<UserModel>(UserModel).toConstantValue(mockUserModel);
    bindings.rebind<TokenModel>(TokenModel).toConstantValue(mockTokenModel);

    mockUserModel.create = jest.fn();
    mockUserModel.find = jest.fn(() => ({ id: 'id', nickname: 'nickname' }));
    mockUserModel.replace = jest.fn();
    mockTokenModel.create = jest.fn();
    mockTokenModel.find = jest.fn(() => ({ userId: 'user-id' }));

    service = bindings.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should work', async () => {
      await service.createUser();
      expect(mockUserModel.create).toBeCalledTimes(1);
      expect(mockTokenModel.create).toBeCalledTimes(1);
    });
  });

  describe('getUser', () => {
    it('should work', async () => {
      expect(await service.getUser('token')).toStrictEqual({
        id: 'id',
        nickname: 'nickname',
      });
      expect(mockUserModel.find).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
    });
  });

  describe('modifyUser', () => {
    it('should work', async () => {
      await service.modifyUser('token', {} as PutUserRequest);
      expect(mockUserModel.find).toBeCalledTimes(1);
      expect(mockUserModel.replace).toBeCalledTimes(1);
      expect(mockTokenModel.find).toBeCalledTimes(1);
    });
  });
});
