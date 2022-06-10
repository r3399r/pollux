import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { injectable } from 'inversify';
import {
  PostConfirmRequest,
  PostForgotRequest,
  PostRegisterRequest,
  PostRegisterResponse,
  PostResendRequest,
  PostVerifyRequest,
} from 'src/model/api/Auth';

/**
 * Service class for Auth
 */
@injectable()
export class AuthService {
  private userPoolId = process.env.USER_POOL_ID ?? '';
  private clientId = process.env.CLIENT_ID ?? '';

  public register(body: PostRegisterRequest): Promise<PostRegisterResponse> {
    const userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });

    return new Promise((resolve, reject) => {
      userPool.signUp(body.email, body.password, [], [], (err, result) => {
        if (err || result === undefined) reject(err);
        else resolve(result.user);
      });
    });
  }

  public verify(body: PostVerifyRequest): Promise<void> {
    const userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
    const cognitoUser = new CognitoUser({
      Username: body.email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(body.code, true, (err) => {
        if (err) reject(err);
        else resolve(undefined);
      });
    });
  }

  public resend(body: PostResendRequest): Promise<void> {
    const userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
    const cognitoUser = new CognitoUser({
      Username: body.email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err) => {
        if (err) reject(err);
        else resolve(undefined);
      });
    });
  }

  public forgotPassword(body: PostForgotRequest): Promise<void> {
    const userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
    const cognitoUser = new CognitoUser({
      Username: body.email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  public confirmPassword(body: PostConfirmRequest): Promise<void> {
    const userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
    const cognitoUser = new CognitoUser({
      Username: body.email,
      Pool: userPool,
    });

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(body.code, body.newPassword, {
        onSuccess() {
          resolve(undefined);
        },
        onFailure(err) {
          reject(err);
        },
      });
    });
  }
}
