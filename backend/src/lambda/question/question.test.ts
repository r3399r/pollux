import {
  BadRequestError,
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { QuestionService } from 'src/logic/QuestionService';
import { question } from './question';

/**
 * Tests of question lambda function
 */
describe('question', () => {
  let event: LambdaEvent;
  let lambdaContext: LambdaContext | undefined;
  let mockService: any;
  let dummyResult: any;

  beforeAll(() => {
    dummyResult = '12345';
  });

  beforeEach(() => {
    lambdaContext = { awsRequestId: '456' };

    mockService = {};
    bindings
      .rebind<QuestionService>(QuestionService)
      .toConstantValue(mockService);

    mockService.createQuestion = jest.fn(() => dummyResult);
  });

  describe('/api/question', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.createQuestion).toBeCalledTimes(1);
    });

    it('should fail if missing headers', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'POST',
        headers: null,
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('headers required'))
      );
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
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
