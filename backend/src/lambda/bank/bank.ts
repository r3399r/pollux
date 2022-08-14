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
import {
  GetBankResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankRequest,
} from 'src/model/api/Bank';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function bank(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  let service: BankService | null = null;
  try {
    LambdaSetup.setup(event);
    service = bindings.get(BankService);

    let res: PostBankResponse | GetBankResponse | void;

    switch (event.resource) {
      case '/api/bank':
        res = await apiBank(event, service);
        break;
      case '/api/bank/{id}':
        res = await apiBankId(event, service);
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

async function apiBank(event: LambdaEvent, service: BankService) {
  switch (event.httpMethod) {
    case 'GET':
      return service.getBankOfUser();
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createBank(JSON.parse(event.body) as PostBankRequest);
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiBankId(event: LambdaEvent, service: BankService) {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.updateBank(
        event.pathParameters.id,
        JSON.parse(event.body) as PutBankRequest
      );
    case 'DELETE':
      return service.deleteBank(event.pathParameters.id);
    default:
      throw new InternalServerError('unknown http method');
  }
}
