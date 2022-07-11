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
  GetQuestionLabelResponse,
  GetQuestionParams,
  GetQuestionResponse,
  PostQuestionLabelRequest,
  PostQuestionLabelResponse,
  PostQuestionRequest,
  PostQuestionResponse,
  PutQuestionIdResponse,
} from 'src/model/api/Question';
import { LambdaSetup } from 'src/util/LambdaSetup';

export async function question(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    LambdaSetup.setup(event);

    const service: QuestionService =
      bindings.get<QuestionService>(QuestionService);

    let res:
      | PostQuestionResponse
      | GetQuestionResponse
      | PutQuestionIdResponse
      | PostQuestionLabelResponse
      | GetQuestionLabelResponse
      | void;

    switch (event.resource) {
      case '/api/question':
        res = await apiQuestion(event, service);
        break;
      case '/api/question/{id}':
        res = await apiQuestionId(event, service);
        break;
      case '/api/question/label':
        res = await apiQuestionLabel(event, service);
        break;
      default:
        throw new InternalServerError('unknown resource');
    }

    return successOutput(res);
  } catch (e) {
    return errorOutput(e);
  }
}

async function apiQuestion(event: LambdaEvent, service: QuestionService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createQuestion(
        event.requestContext.authorizer?.claims.sub,
        JSON.parse(event.body) as PostQuestionRequest
      );
    case 'GET':
      if (event.queryStringParameters === null)
        throw new BadRequestError('queryStringParameters should not be empty');

      return service.getQuestion(
        event.queryStringParameters as GetQuestionParams
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiQuestionId(event: LambdaEvent, service: QuestionService) {
  if (event.pathParameters === null)
    throw new BadRequestError('missing pathParameters');

  switch (event.httpMethod) {
    // case 'PUT':
    //   if (event.body === null)
    //     throw new BadRequestError('body should not be empty');

    //   return service.reviseQuestion(
    //     event.pathParameters.id,
    //     JSON.parse(event.body) as PostQuestionRequest
    //   );
    case 'DELETE':
      return service.deleteQuestion(event.pathParameters.id);
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiQuestionLabel(event: LambdaEvent, service: QuestionService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createLabel(
        JSON.parse(event.body) as PostQuestionLabelRequest
      );
    case 'GET':
      return service.getLabel();
    default:
      throw new InternalServerError('unknown http method');
  }
}
