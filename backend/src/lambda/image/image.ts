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
import { ImageService } from 'src/logic/ImageService';
import { PostImageResponse } from 'src/model/api/Image';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function image(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  let service: ImageService | null = null;
  try {
    LambdaSetup.setup(event);
    service = bindings.get(ImageService);

    let res: PostImageResponse;

    switch (event.resource) {
      case '/api/image':
        res = await apiImage(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  } finally {
    // await service?.cleanup();
  }
}

async function apiImage(event: LambdaEvent, service: ImageService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.addImage(event.body);
    default:
      throw new InternalServerError('unknown http method');
  }
}
