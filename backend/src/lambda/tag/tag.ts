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
import { TagService } from 'src/logic/TagService';
import {
  GetTagResponse,
  PostTagRequest,
  PostTagResponse,
  PutTagRequest,
  PutTagResponse,
} from 'src/model/api/Tag';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function tag(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  let service: TagService | null = null;
  try {
    LambdaSetup.setup(event);
    service = bindings.get(TagService);

    let res: PostTagResponse | GetTagResponse | PutTagResponse | void;

    switch (event.resource) {
      case '/api/tag':
        res = await apiTag(event, service);
        break;
      case '/api/tag/{id}':
        res = await apiTagId(event, service);
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

async function apiTag(event: LambdaEvent, service: TagService) {
  switch (event.httpMethod) {
    case 'GET':
      return service.getTagOfUser();
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createTag(JSON.parse(event.body) as PostTagRequest);
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiTagId(event: LambdaEvent, service: TagService) {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.reviseTag(
        event.pathParameters.id,
        JSON.parse(event.body) as PutTagRequest
      );
    case 'DELETE':
      return service.deleteTag(event.pathParameters.id);
    default:
      throw new InternalServerError('unknown http method');
  }
}
