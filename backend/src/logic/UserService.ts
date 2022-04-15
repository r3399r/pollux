import { randBase58 } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { PostUserResponse } from 'src/model/api/User';
import { Token, TokenModel } from 'src/model/entity/Token';
import { User, UserModel } from 'src/model/entity/User';

/**
 * Service class for User
 */
@injectable()
export class UserService {
  @inject(UserModel)
  private readonly userModel!: UserModel;
  @inject(TokenModel)
  private readonly tokenModel!: TokenModel;

  public async createUser(): Promise<PostUserResponse> {
    const user: User = { id: uuidv4(), nickname: '過客' };
    const token: Token = {
      token: randBase58(64),
      purpose: 'general',
      userId: user.id,
    };
    await this.userModel.create(user);
    await this.tokenModel.create(token);

    return { ...user, token: token.token };
  }
}
