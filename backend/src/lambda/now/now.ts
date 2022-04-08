import {
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  LambdaOutput,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { NowService } from 'src/logic/NowService';

export async function now(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    const service: NowService = bindings.get<NowService>(NowService);

    let res: string;

    switch (event.resource) {
      case '/api/now':
        res = await apiNow(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  }
}

async function apiNow(event: LambdaEvent, service: NowService) {
  switch (event.httpMethod) {
    case 'GET':
      return service.getNow();
    default:
      throw new InternalServerError('unknown http method');
  }
}
