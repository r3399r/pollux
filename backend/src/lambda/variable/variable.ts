import { bindings } from 'src/bindings';
import {
  BadRequestError,
  InternalServerError,
} from 'src/celestial-service/error';
import { errorOutput, successOutput } from 'src/celestial-service/LambdaOutput';
import {
  LambdaContext,
  LambdaEvent,
  LambdaOutput,
} from 'src/celestial-service/model/Lambda';
import { VariableService } from 'src/logic/VariableService';
import { GetVariableParam, GetVariableResponse } from 'src/model/api/Variable';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function variable(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    LambdaSetup.setup(event);

    const service: VariableService =
      bindings.get<VariableService>(VariableService);

    let res: GetVariableResponse;

    switch (event.resource) {
      case '/api/variable':
        res = await apiVariable(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  }
}

async function apiVariable(event: LambdaEvent, service: VariableService) {
  switch (event.httpMethod) {
    case 'GET':
      if (event.queryStringParameters === null)
        throw new BadRequestError('queryStringParameters should not be empty');

      return service.getVariable(
        event.queryStringParameters as GetVariableParam
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}
