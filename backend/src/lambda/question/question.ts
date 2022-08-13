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
  PostQuestionRequest,
  PostQuestionResponse,
  PostQuestionTagRequest,
  PostQuestionTagResponse,
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

    let res: PostQuestionResponse | PostQuestionTagResponse;

    switch (event.resource) {
      case '/api/question':
        res = await apiQuestion(event, service);
        break;
      case '/api/question/tag':
        res = await apiQuestionTag(event, service);
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

async function apiQuestionTag(event: LambdaEvent, service: QuestionService) {
  switch (event.httpMethod) {
    case 'POST':
      if (event.body === null)
        throw new BadRequestError('body should not be empty');

      return service.replaceQuestionTagPair(
        JSON.parse(event.body) as PostQuestionTagRequest
      );
    default:
      throw new InternalServerError('unknown http method');
  }
}
