import {
  BadRequestError,
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { AuthService } from 'src/logic/AuthService';
import { auth } from './auth';

/**
 * Tests of auth lambda function
 */
describe('auth', () => {
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
    bindings.rebind<AuthService>(AuthService).toConstantValue(mockService);

    mockService.register = jest.fn(() => dummyResult);
    mockService.verify = jest.fn(() => dummyResult);
    mockService.resend = jest.fn(() => dummyResult);
    mockService.forgotPassword = jest.fn(() => dummyResult);
    mockService.confirmPassword = jest.fn(() => dummyResult);
  });

  describe('/api/auth/register', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/auth/register',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.register).toBeCalledTimes(1);
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/auth/register',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/auth/register',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  describe('/api/auth/verify', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/auth/verify',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.verify).toBeCalledTimes(1);
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/auth/verify',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/auth/verify',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  describe('/api/auth/resend', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/auth/resend',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.resend).toBeCalledTimes(1);
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/auth/resend',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/auth/resend',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  describe('/api/auth/forgot', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/auth/forgot',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.forgotPassword).toBeCalledTimes(1);
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/auth/forgot',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/auth/forgot',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  describe('/api/auth/confirm', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/auth/confirm',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.confirmPassword).toBeCalledTimes(1);
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/auth/confirm',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/auth/confirm',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  it('unknown resource should fail', async () => {
    event.resource = 'resource';
    await expect(auth(event, lambdaContext)).resolves.toStrictEqual(
      errorOutput(new InternalServerError('unknown resource'))
    );
  });
});
