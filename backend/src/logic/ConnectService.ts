import { BadRequestError, NotFoundError } from '@y-celestial/service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { inject, injectable } from 'inversify';
import { UserUserAccess } from 'src/access/UserUserAccess';
import { PostConnectRquest, PutConnectRequest } from 'src/model/api/Connect';
import { UserUserEntity } from 'src/model/entity/UserUserEntity';
import { cognitoSymbol } from 'src/util/LambdaSetup';

/**
 * Service class for Connect
 */
@injectable()
export class ConnectService {
  @inject(CognitoIdentityServiceProvider)
  private readonly cognitoIdentityServiceProvider!: CognitoIdentityServiceProvider;

  @inject(cognitoSymbol)
  private readonly cognitoUserId!: string;

  @inject(UserUserAccess)
  private readonly userUserAccess!: UserUserAccess;

  public async cleanup() {
    await this.userUserAccess.cleanup();
  }

  public async getConnects() {
    return await this.userUserAccess.findMany({
      where: { srcUserId: this.cognitoUserId },
    });
  }

  public async buildConnect(data: PostConnectRquest) {
    const res = await this.cognitoIdentityServiceProvider
      .adminGetUser({
        UserPoolId: process.env.USER_POOL_ID ?? '',
        Username: data.dstUserId,
      })
      .promise();

    if (res.UserStatus !== 'CONFIRMED')
      throw new BadRequestError('user unconfirmed');

    const userUser = new UserUserEntity();
    userUser.srcUserId = this.cognitoUserId;
    userUser.dstUserId = res.Username;
    userUser.nickname = data.nickname;

    await this.userUserAccess.save(userUser);
  }

  public async reviseConnect(id: string, data: PutConnectRequest) {
    const oldUserUser = await this.userUserAccess.findById(id);
    if (oldUserUser.srcUserId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const userUser = new UserUserEntity();
    userUser.id = id;
    userUser.srcUserId = this.cognitoUserId;
    userUser.dstUserId = oldUserUser.dstUserId;
    userUser.nickname = data.nickname;

    const res = await this.userUserAccess.update(userUser);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }

  public async deleteConnect(id: string) {
    const oldUserUser = await this.userUserAccess.findById(id);
    if (oldUserUser.srcUserId !== this.cognitoUserId)
      throw new NotFoundError('not found');

    const res = await this.userUserAccess.hardDeleteById(id);

    if (res.affected === 0) throw new BadRequestError('nothing happened.');
  }
}
