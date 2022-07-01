import { CognitoEvent, LambdaContext } from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { CognitoService } from 'src/logic/CognitoService';

export async function cognito(event: CognitoEvent, _context?: LambdaContext) {
  const service: CognitoService = bindings.get<CognitoService>(CognitoService);

  await service.addUser(event.request.userAttributes.sub);

  return event;
}
