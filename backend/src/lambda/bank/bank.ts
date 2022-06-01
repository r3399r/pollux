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
  GetBankIdResponse,
  GetBankResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankIdRequest,
  PutBankIdResponse,
} from 'src/model/api/Bank';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function bank(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    LambdaSetup.setup(event);

    const service: BankService = bindings.get<BankService>(BankService);

    let res:
      | PostBankResponse
      | GetBankResponse
      | void
      | PutBankIdResponse
      | GetBankIdResponse;

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
  }
}

async function apiBank(event: LambdaEvent, service: BankService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createBank(JSON.parse(event.body) as PostBankRequest);
    case 'GET':
      return service.getBank();
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiBankId(event: LambdaEvent, service: BankService) {
  if (event.pathParameters === null)
    throw new BadRequestError('missing pathParameters');

  switch (event.httpMethod) {
    case 'GET':
      return service.getBankById(event.pathParameters.id);
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.modifyBank(
        event.pathParameters.id,
        JSON.parse(event.body) as PutBankIdRequest
      );
    case 'DELETE':
      return service.deleteBank(event.pathParameters.id);
    default:
      throw new InternalServerError('unknown http method');
  }
}
