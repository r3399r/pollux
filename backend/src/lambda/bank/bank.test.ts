import {
  BadRequestError,
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { BankService } from 'src/logic/BankService';
import { bank } from './bank';

/**
 * Tests of bank lambda function
 */
describe('bank', () => {
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
    bindings.rebind<BankService>(BankService).toConstantValue(mockService);

    mockService.getBank = jest.fn(() => dummyResult);
    mockService.createBank = jest.fn(() => dummyResult);
  });

  describe('/api/bank', () => {
    it('POST should work', async () => {
      event = {
        resource: '/api/bank',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(bank(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.createBank).toBeCalledTimes(1);
    });

    it('GET should work', async () => {
      event = {
        resource: '/api/bank',
        httpMethod: 'GET',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(bank(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.getBank).toBeCalledTimes(1);
    });

    it('should fail if missing body', async () => {
      event = {
        resource: '/api/bank',
        httpMethod: 'POST',
        headers: { ['x-api-token']: 'abcde' },
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(bank(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new BadRequestError('body should not be empty'))
      );
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/bank',
        httpMethod: 'XXX',
        headers: { ['x-api-token']: 'abcde' },
        body: JSON.stringify({ a: 1 }),
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(bank(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  it('unknown resource should fail', async () => {
    event.resource = 'resource';
    await expect(bank(event, lambdaContext)).resolves.toStrictEqual(
      errorOutput(new InternalServerError('unknown resource'))
    );
  });
});
