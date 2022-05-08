import {
  BadRequestError,
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { UserService } from 'src/logic/UserService';
import { user } from './user';

/**
 * Tests of user lambda function
 */
describe('user', () => {
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
    bindings.rebind<UserService>(UserService).toConstantValue(mockService);

    mockService.createUser = jest.fn(() => dummyResult);
    mockService.getUser = jest.fn(() => dummyResult);
    mockService.modifyUser = jest.fn(() => dummyResult);
  });

  describe('/api/user', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'POST',
        headers: { ['x-api-timestamp']: String(Date.now()) },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.createUser).toBeCalledTimes(1);
    });

    it('POST should fail if missing headers', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'POST',
        headers: null,
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('headers required'))
      );
    });

    it('POST should fail if timstamp far from now', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'POST',
        headers: { ['x-api-timestamp']: '300' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('out of time window'))
      );
    });

    it('POST should fail if timstamp is not number', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'POST',
        headers: { ['x-api-timestamp']: '300a' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('timstamp should be number'))
      );
    });

    it('GET should work', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'GET',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.getUser).toBeCalledTimes(1);
    });

    it('PUT should work', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'PUT',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.modifyUser).toBeCalledTimes(1);
    });

    it('PUT should fail if missing body', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'PUT',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/user',
        httpMethod: 'XXX',
        headers: { ['x-api-timestamp']: String(Date.now()) },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(user(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  it('unknown resource should fail', async () => {
    event.resource = 'resource';
    await expect(user(event, lambdaContext)).resolves.toStrictEqual(
      errorOutput(new InternalServerError('unknown resource'))
    );
  });
});
