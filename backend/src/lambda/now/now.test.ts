import {
  errorOutput,
  InternalServerError,
  LambdaContext,
  LambdaEvent,
  successOutput,
} from '@y-celestial/service';
import { bindings } from 'src/bindings';
import { NowService } from 'src/logic/NowService';
import { now } from './now';

/**
 * Tests of now lambda function
 */
describe('now', () => {
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
    bindings.rebind<NowService>(NowService).toConstantValue(mockService);

    mockService.getNow = jest.fn(() => dummyResult);
  });

  describe('/api/now', () => {
    it('GET should work', async () => {
      event = {
        resource: '/api/now',
        httpMethod: 'GET',
        headers: null,
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(now(event, lambdaContext)).resolves.toStrictEqual(
        successOutput(dummyResult)
      );
      expect(mockService.getNow).toBeCalledTimes(1);
    });

    it('unknown http method should fail', async () => {
      event = {
        resource: '/api/now',
        httpMethod: 'XXX',
        headers: null,
        body: null,
        pathParameters: null,
        queryStringParameters: null,
      };
      await expect(now(event, lambdaContext)).resolves.toStrictEqual(
        errorOutput(new InternalServerError('unknown http method'))
      );
    });
  });

  it('unknown resource should fail', async () => {
    event.resource = 'resource';
    await expect(now(event, lambdaContext)).resolves.toStrictEqual(
      errorOutput(new InternalServerError('unknown resource'))
    );
  });
});
