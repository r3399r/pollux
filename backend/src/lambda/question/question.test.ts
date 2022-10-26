import { bindings } from 'src/bindings';
import {
  BadRequestError,
  InternalServerError,
} from 'src/celestial-service/error';
import { errorOutput, successOutput } from 'src/celestial-service/LambdaOutput';
import { LambdaContext, LambdaEvent } from 'src/celestial-service/model/Lambda';
import { QuestionService } from 'src/logic/QuestionService';
import { question } from './question';

/**
 * Tests of question lambda function
 */
describe('question', () => {
  let event: LambdaEvent;
  let lambdaContext: LambdaContext | undefined;
  let mockQuestionService: any;

  beforeEach(() => {
    lambdaContext = { awsRequestId: '456' };

    mockQuestionService = {};
    bindings
      .rebind<QuestionService>(QuestionService)
      .toConstantValue(mockQuestionService);

    mockQuestionService.createQuestion = jest.fn();
    mockQuestionService.cleanup = jest.fn();
  });

  describe('/api/question', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'POST',
        headers: null,
        body: JSON.stringify({ a: '1' }),
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {},
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(undefined)
      );
      expect(mockQuestionService.createQuestion).toBeCalledTimes(1);
    });

    it('POST should fail without body', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'POST',
        headers: null,
        body: null,
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {},
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'XXX',
        headers: null,
        body: JSON.stringify({ a: '1' }),
        pathParameters: null,
        queryStringParameters: null,
        requestContext: {},
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  it('unknown resource should fail', async () => {
    event.resource = 'resource';
    await expect(question(event, lambdaContext)).resolves.toStrictEqual(
      errorOutput(new InternalServerError('unknown resource'))
    );
  });
});
