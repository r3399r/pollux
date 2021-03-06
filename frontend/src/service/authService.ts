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

export const getCurrentUserSession = async (): Promise<CognitoUserSession> => {
  const { userPoolClientId, userPoolId } = await getUserPoolVariable();
  const userPool = new CognitoUserPool({
    UserPoolId: userPoolId ?? '',
    ClientId: userPoolClientId ?? '',
  });

  return await new Promise((resolve, reject) => {
    userPool.getCurrentUser()?.getSession((err: null, result: CognitoUserSession) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
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
    await new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (r) => resolve(r),
        onFailure: (e) => reject(e),
      });
    });

    dispatch(setIsLogin(true));
  } catch (err) {
    const message = (err as Error).message;
    switch (message) {
      case 'Incorrect username or password.':
        throw 'email ???????????????';
      case 'User does not exist.':
        throw 'email ?????????';
      case 'User is not confirmed.':
        throw 'email ????????????';
      default:
        throw '???????????????';
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
        throw '??? email ?????????';
      case 'Password did not conform with policy: Password not long enough':
        throw '????????????????????? 8 ???';
      case 'Password did not conform with policy: Password must have lowercase characters':
        throw '?????????????????????????????????';
      case 'Password did not conform with policy: Password must have uppercase characters':
        throw '?????????????????????????????????';
      case 'Password did not conform with policy: Password must have numeric characters':
        throw '?????????????????????';
      default:
        throw '???????????????';
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
        throw '??? email ????????????';
      case 'User is already confirmed.':
        throw '??? email ???????????????';
      default:
        throw '???????????????';
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
        throw '??????????????????????????????';
      case 'User cannot be confirmed. Current status is CONFIRMED':
        throw '??? email ?????????';
      default:
        throw '???????????????';
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
        throw '??? email ????????????';
      case 'Username/client id combination not found.':
        throw '??? email ????????????';
      default:
        throw '???????????????';
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
        throw '??????????????????????????????';
      case 'Password does not conform to policy: Password not long enough':
        throw '????????????????????? 8 ???';
      case 'Password does not conform to policy: Password must have lowercase characters':
        throw '?????????????????????????????????';
      case 'Password does not conform to policy: Password must have uppercase characters':
        throw '?????????????????????????????????';
      case 'Password does not conform to policy: Password must have numeric characters':
        throw '?????????????????????';
      case 'Attempt limit exceeded, please try after some time.':
        throw '?????????????????????????????????';
      default:
        throw '???????????????';
    }
  }
};
