import { GetVariableParam, GetVariableResponse } from '@y-celestial/pollux-service';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { dispatch, getState } from 'src/redux/store';
import { setIsLogin, showLoading } from 'src/redux/uiSlice';
import { setVariable, VariableState } from 'src/redux/variableSlice';
import http from 'src/util/http';

const getUserPoolVariable = async (): Promise<VariableState> => {
  const state = getState().variable;
  if (state.userPoolClientId === undefined || state.userPoolId === undefined) {
    const res = await http.get<GetVariableResponse, GetVariableParam>('variable', {
      params: { name: 'USER_POOL_ID,USER_POOL_CLIENT_ID' },
    });
    const variable = {
      userPoolClientId: res.data.USER_POOL_CLIENT_ID,
      userPoolId: res.data.USER_POOL_ID,
    };
    dispatch(setVariable(variable));

    return variable;
  }

  return state;
};

export const login = async (username: string, password: string) => {
  try {
    dispatch(showLoading(true));
    const { userPoolClientId, userPoolId } = await getUserPoolVariable();
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId ?? '',
      ClientId: userPoolClientId ?? '',
    });
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool,
    });
    const userSession: CognitoUserSession = await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (r) => resolve(r),
        onFailure: (e) => reject(e),
      });
    });

    localStorage.setItem('accessToken', userSession.getAccessToken().getJwtToken());
    localStorage.setItem('refreshToken', userSession.getRefreshToken().getToken());

    dispatch(setIsLogin(true));
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'Incorrect username or password.':
        throw 'email 或密碼錯誤';
      case 'User does not exist.':
        throw 'email 不存在';
      case 'User is not confirmed.':
        throw 'email 尚未認證';
      default:
        throw '請聯繫客服';
    }
  } finally {
    dispatch(showLoading(false));
  }
};

export const register = async (email: string, password: string) => {
  try {
    const { userPoolClientId, userPoolId } = await getUserPoolVariable();
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId ?? '',
      ClientId: userPoolClientId ?? '',
    });

    await new Promise((resolve, reject) => {
      userPool.signUp(email, password, [], [], (err, result) => {
        if (err || result === undefined) reject(err);
        else resolve(result.user);
      });
    });
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'An account with the given email already exists.':
        throw '此 email 已註冊';
      case 'Password did not conform with policy: Password not long enough':
        throw '密碼長度需至少 8 碼';
      case 'Password did not conform with policy: Password must have lowercase characters':
        throw '密碼需含有小寫英文字母';
      case 'Password did not conform with policy: Password must have uppercase characters':
        throw '密碼需含有大寫英文字母';
      case 'Password did not conform with policy: Password must have numeric characters':
        throw '密碼需含有數字';
      default:
        throw '請聯繫客服';
    }
  }
};

export const resend = async (email: string) => {
  try {
    const { userPoolClientId, userPoolId } = await getUserPoolVariable();
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId ?? '',
      ClientId: userPoolClientId ?? '',
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    await new Promise((resolve, reject) => {
      cognitoUser.resendConfirmationCode((err) => {
        if (err) reject(err);
        else resolve(undefined);
      });
    });
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'Username/client id combination not found.':
        throw '此 email 未註冊過';
      default:
        throw '請聯繫客服';
    }
  }
};

export const verify = async (email: string, code: string) => {
  try {
    const { userPoolClientId, userPoolId } = await getUserPoolVariable();
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId ?? '',
      ClientId: userPoolClientId ?? '',
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    await new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err) => {
        if (err) reject(err);
        else resolve(undefined);
      });
    });
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'Invalid verification code provided, please try again.':
        throw '錯誤的認證碼，請重試';
      case 'User cannot be confirmed. Current status is CONFIRMED':
        throw '此 email 已認證';
      default:
        throw '請聯繫客服';
    }
  }
};

export const forgot = async (email: string) => {
  try {
    const { userPoolClientId, userPoolId } = await getUserPoolVariable();
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId ?? '',
      ClientId: userPoolClientId ?? '',
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    await new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'Cannot reset password for the user as there is no registered/verified email or phone_number':
        throw '此 email 尚未認證';
      case 'Username/client id combination not found.':
        throw '此 email 未註冊過';
      default:
        throw '請聯繫客服';
    }
  }
};

export const confirm = async (email: string, newPassword: string, code: string) => {
  try {
    const { userPoolClientId, userPoolId } = await getUserPoolVariable();
    const userPool = new CognitoUserPool({
      UserPoolId: userPoolId ?? '',
      ClientId: userPoolClientId ?? '',
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    await new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess() {
          resolve(undefined);
        },
        onFailure(err) {
          reject(err);
        },
      });
    });
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'Invalid verification code provided, please try again.':
        throw '錯誤的認證碼，請重試';
      case 'Password does not conform to policy: Password not long enough':
        throw '密碼長度需至少 8 碼';
      case 'Password does not conform to policy: Password must have lowercase characters':
        throw '密碼需含有小寫英文字母';
      case 'Password does not conform to policy: Password must have uppercase characters':
        throw '密碼需含有大寫英文字母';
      case 'Password does not conform to policy: Password must have numeric characters':
        throw '密碼需含有數字';
      case 'Attempt limit exceeded, please try after some time.':
        throw '設定太頻繁，請稍後再試';
      default:
        throw '請聯繫客服';
    }
  }
};
