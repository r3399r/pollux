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
import { BankService } from 'src/logic/BankService';
import { PostBankRequest, PostBankResponse } from 'src/model/api/Bank';

export async function bank(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    const service: BankService = bindings.get<BankService>(BankService);

    let res: PostBankResponse;

    switch (event.resource) {
      case '/api/bank':
        res = await apiBank(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  }
}

async function apiBank(event: LambdaEvent, service: BankService) {
  if (event.headers === null) throw new BadRequestError('headers required');

  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createBank(
        event.headers['x-api-token'],
        JSON.parse(event.body) as PostBankRequest
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}
