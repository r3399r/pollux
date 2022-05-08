import { randBase58 } from '@y-celestial/service';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import {
  GetUserResponse,
  PostUserResponse,
  PutUserRequest,
  PutUserResponse,
} from 'src/model/api/User';
import { Token, TokenModel } from 'src/model/entity/Token';
import { User, UserModel } from 'src/model/entity/User';
import { tokenSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for User
 */
@injectable()
export class UserService {
  @inject(UserModel)
  private readonly userModel!: UserModel;
  @inject(TokenModel)
  private readonly tokenModel!: TokenModel;
  @inject(tokenSymbol)
  private readonly token!: string;

  public async createUser(): Promise<PostUserResponse> {
    const user: User = { id: uuidv4(), nickname: '過客' };
    const token: Token = {
      token: randBase58(64),
      userId: user.id,
    };
    await this.userModel.create(user);
    await this.tokenModel.create(token);

    return { ...user, token: token.token };
  }

  public async getUser(): Promise<GetUserResponse> {
    const { userId } = await this.tokenModel.find(this.token);
    const user = await this.userModel.find(userId);

    return { id: user.id, nickname: user.nickname };
  }

  public async modifyUser(body: PutUserRequest): Promise<PutUserResponse> {
    const { userId } = await this.tokenModel.find(this.token);
    const user = await this.userModel.find(userId);

    const newUser = { id: user.id, nickname: body.nickname };
    await this.userModel.replace(newUser);

    return newUser;
  }
}
