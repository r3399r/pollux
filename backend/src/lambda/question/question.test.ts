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
    mockService.getQuestion = jest.fn(() => dummyResult);
    mockService.reviseQuestion = jest.fn(() => dummyResult);
    mockService.createLabel = jest.fn(() => dummyResult);
    mockService.getLabel = jest.fn(() => [dummyResult]);
    mockService.deleteQuestion = jest.fn(() => dummyResult);
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

    it('GET should work', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'GET',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: { c: 'abc' },
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.getQuestion).toBeCalledTimes(1);
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

    it('should fail if missing queryStringParameters', async () => {
      event = {
        resource: '/api/question',
        httpMethod: 'GET',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(
          new BadRequestError('queryStringParameters should not be empty')
        )
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

  describe('/api/question/{id}', () => {
    it('PUT should work', async () => {
      event = {
        resource: '/api/question/{id}',
        httpMethod: 'PUT',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: { id: 'id' },
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.reviseQuestion).toBeCalledTimes(1);
    });

    it('DELETE should work', async () => {
      event = {
        resource: '/api/question/{id}',
        httpMethod: 'DELETE',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: { id: 'id' },
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.deleteQuestion).toBeCalledTimes(1);
    });

    it('should fail if missing pathParameters', async () => {
      event = {
        resource: '/api/question/{id}',
        httpMethod: 'PUT',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('missing pathParameters'))
      );
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/question/{id}',
        httpMethod: 'PUT',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: { id: 'id' },
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/question/{id}',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: { id: 'id' },
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  describe('/api/question/label', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/question/label',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.createLabel).toBeCalledTimes(1);
    });

    it('POST should fail if missing body', async () => {
      event = {
        resource: '/api/question/label',
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

    it('GET should work', async () => {
      event = {
        resource: '/api/question/label',
        httpMethod: 'GET',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(question(event, lambdaContext)).resolves.toStrictEqual(
        successOutput([dummyResult])
      );
      expect(mockService.getLabel).toBeCalledTimes(1);
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/question/label',
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
