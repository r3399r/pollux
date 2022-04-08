import { injectable } from 'inversify';

/**
 * Service class for Now
 */
@injectable()
export class NowService {
  public async getNow() {
    return new Date().toISOString();
  }
}
