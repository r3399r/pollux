import { inject, injectable } from 'inversify';
import { UserModel } from 'src/model/entity/User';

/**
 * Service class for Cognito
 */
@injectable()
export class CognitoService {
  @inject(UserModel)
  private readonly userModel!: UserModel;

  public async addUser(id: string) {
    await this.userModel.create({ id, nickname: '路人甲' });
  }
}
