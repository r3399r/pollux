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
import { QuestionService } from 'src/logic/QuestionService';
import {
  GetQuestionParam,
  GetQuestionResponse,
  PostQuestionRequest,
  PostQuestionResponse,
  PutQuestionRequest,
  PutQuestionTagRequest,
  PutQuestionTagResponse,
} from 'src/model/api/Question';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function question(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  let service: QuestionService | null = null;
  try {
    LambdaSetup.setup(event);
    service = bindings.get(QuestionService);

    let res:
      | PostQuestionResponse
      | PutQuestionTagResponse
      | void
      | GetQuestionResponse;

    switch (event.resource) {
      case '/api/question':
        res = await apiQuestion(event, service);
        break;
      case '/api/question/{id}':
        res = await apiQuestionId(event, service);
        break;
      case '/api/question/{id}/tag':
        res = await apiQuestionIdTag(event, service);
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

async function apiQuestion(event: LambdaEvent, service: QuestionService) {
  switch (event.httpMethod) {
    case 'GET':
      return service.getQuestionOfUser(
        event.queryStringParameters as GetQuestionParam
      );
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createQuestion(
        JSON.parse(event.body) as PostQuestionRequest
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiQuestionId(event: LambdaEvent, service: QuestionService) {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.updateQuestion(
        event.pathParameters.id,
        JSON.parse(event.body) as PutQuestionRequest
      );
    case 'DELETE':
      return service.deleteQuestion(event.pathParameters.id);
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiQuestionIdTag(event: LambdaEvent, service: QuestionService) {
  if (event.pathParameters === null)
    throw new BadRequestError('pathParameters should not be empty');
  switch (event.httpMethod) {
    case 'PUT':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.replaceQuestionTagPair(
        event.pathParameters.id,
        JSON.parse(event.body) as PutQuestionTagRequest
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}
