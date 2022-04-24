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
import { PostQuestionRequest } from 'src/model/api/Question';

export async function question(
  event: LambdaEvent,
  _context?: LambdaContext
): Promise<LambdaOutput> {
  try {
    const service: QuestionService =
      bindings.get<QuestionService>(QuestionService);

    let res: any;

    switch (event.resource) {
      case '/api/question':
        res = await apiQuestion(event, service);
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
    default:
      throw new InternalServerError('unknown http method');
  }
}
