import { bindings } from 'src/bindings';
import { NowService } from './NowService';

/**
 * Tests of the NowService class.
 */
describe('NowService', () => {
  let service: NowService;

  beforeEach(() => {
    service = bindings.get<NowService>(NowService);
  });

  describe('getNow', () => {
    it('should work', async () => {
      const res = await service.getNow();
      expect(new Date(res).getTime() - new Date().getTime()).toBeLessThan(100);
    });
  });
});
