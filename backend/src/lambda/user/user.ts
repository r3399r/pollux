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
import {
  GetUserResponse,
  PostUserResponse,
  PutUserRequest,
  PutUserResponse,
} from 'src/model/api/User';

export async function user(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    const service: UserService = bindings.get<UserService>(UserService);

    let res: PostUserResponse | GetUserResponse | PutUserResponse;

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
    case 'GET':
      if (event.headers?.['x-api-token'] === undefined)
        throw new BadRequestError('headers required');

      return service.getUser(event.headers['x-api-token']);
    case 'PUT':
      if (event.headers?.['x-api-token'] === undefined)
        throw new BadRequestError('headers required');
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.modifyUser(
        event.headers['x-api-token'],
        JSON.parse(event.body) as PutUserRequest
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}
