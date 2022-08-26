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
import { ConnectService } from 'src/logic/ConnectService';
import {
  GetConnectResponse,
  PostConnectRquest,
  PutConnectRequest,
} from 'src/model/api/Connect';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function connect(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  let service: ConnectService | null = null;
  try {
    LambdaSetup.setup(event);
    service = bindings.get(ConnectService);

    let res: GetConnectResponse | void;

    switch (event.resource) {
      case '/api/connect':
        res = await apiConnect(event, service);
        break;
      case '/api/connect/{id}':
        res = await apiConnectId(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  } finally {
    await service?.cleanup();
  }
}

async function apiConnect(event: LambdaEvent, service: ConnectService) {
  switch (event.httpMethod) {
    case 'GET':
      return service.getConnects();
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.buildConnect(JSON.parse(event.body) as PostConnectRquest);
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiConnectId(event: LambdaEvent, service: ConnectService) {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.reviseConnect(
        event.pathParameters.id,
        JSON.parse(event.body) as PutConnectRequest
      );
    case 'DELETE':
      return service.deleteConnect(event.pathParameters.id);
    default:
      throw new InternalServerError('unknown http method');
  }
}
