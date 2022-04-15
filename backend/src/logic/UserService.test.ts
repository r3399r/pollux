import { bindings } from 'src/bindings';
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
    mockTokenModel.create = jest.fn();

    service = bindings.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should work', async () => {
      await service.createUser();
      expect(mockUserModel.create).toBeCalledTimes(1);
      expect(mockTokenModel.create).toBeCalledTimes(1);
    });
  });
});
