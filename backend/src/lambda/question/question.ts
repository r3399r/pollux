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
} from 'src/model/api/Question';

export async function question(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    const service: QuestionService =
      bindings.get<QuestionService>(QuestionService);

    let res:
      | PostQuestionResponse
      | PostQuestionLabelResponse
      | GetQuestionResponse
      | GetQuestionLabelResponse;

    switch (event.resource) {
      case '/api/question':
        res = await apiQuestion(event, service);
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
  if (event.headers === null) throw new BadRequestError('headers required');

  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createQuestion(
        event.headers['x-api-token'],
        JSON.parse(event.body) as PostQuestionRequest
      );
    case 'GET':
      if (event.queryStringParameters === null)
        throw new BadRequestError('queryStringParameters should not be empty');

      return service.getQuestion(
        event.headers['x-api-token'],
        event.queryStringParameters as GetQuestionParams
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}

async function apiQuestionLabel(event: LambdaEvent, service: QuestionService) {
  if (event.headers === null) throw new BadRequestError('headers required');

  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.createLabel(
        event.headers['x-api-token'],
        JSON.parse(event.body) as PostQuestionLabelRequest
      );
    case 'GET':
      return service.getLabel(event.headers['x-api-token']);
    default:
      throw new InternalServerError('unknown http method');
  }
}
