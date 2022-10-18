import { GetVariableParam, GetVariableResponse } from '@y-celestial/pollux-service';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { dispatch, getState } from 'src/redux/store';
import { finishWaiting, setIsLogin, startWaiting } from 'src/redux/uiSlice';
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
    dispatch(startWaiting());

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
        throw 'email 或密碼錯誤';
      case 'User does not exist.':
        throw 'email 不存在';
      case 'User is not confirmed.':
        throw 'email 尚未認證';
      default:
        throw '請聯繫客服';
    }
  } finally {
    dispatch(finishWaiting());
  }
};
