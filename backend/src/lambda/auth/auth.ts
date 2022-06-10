import {
  BadRequestError,
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  LambdaOutput,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { AuthService } from 'src/logic/AuthService';
import { PostRegisterResponse } from 'src/model/api/Auth';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function auth(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    LambdaSetup.setup(event);

    const service: AuthService = bindings.get<AuthService>(AuthService);

    let res: PostRegisterResponse | void;

    switch (event.resource) {
      case '/api/auth/register':
        res = await apiAuthRegister(event, service);
        break;
      case '/api/auth/verify':
        res = await apiAuthVerify(event, service);
        break;
      case '/api/auth/resend':
        res = await apiAuthResend(event, service);
        break;
      case '/api/auth/forgot':
        res = await apiAuthForgot(event, service);
        break;
      case '/api/auth/confirm':
        res = await apiAuthConfirm(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  }
}

async function apiAuthRegister(event: LambdaEvent, service: AuthService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.register(JSON.parse(event.body));
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiAuthVerify(event: LambdaEvent, service: AuthService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.verify(JSON.parse(event.body));
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiAuthResend(event: LambdaEvent, service: AuthService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.resend(JSON.parse(event.body));
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiAuthForgot(event: LambdaEvent, service: AuthService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.forgotPassword(JSON.parse(event.body));
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiAuthConfirm(event: LambdaEvent, service: AuthService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.confirmPassword(JSON.parse(event.body));
    default:
      throw new InternalServerError('unknown http method');
  }
}
