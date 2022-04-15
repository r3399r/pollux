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
import { UserService } from 'src/logic/UserService';
import { PostUserResponse } from 'src/model/api/User';

export async function user(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    const service: UserService = bindings.get<UserService>(UserService);

    let res: PostUserResponse;

    switch (event.resource) {
      case '/api/user':
        res = await apiUser(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  }
}

async function apiUser(event: LambdaEvent, service: UserService) {
  const ts = event.headers?.['x-api-timestamp'];
  switch (event.httpMethod) {
    case 'POST':
      if (ts === undefined) throw new BadRequestError('headers required');
      if (Number.isNaN(Number(ts)))
        throw new BadRequestError('timstamp should be number');
      if (Math.abs(Number(ts) - Date.now()) > 5000)
        throw new BadRequestError('out of time window');

      return service.createUser();
    default:
      throw new InternalServerError('unknown http method');
  }
}
