import { LambdaEvent } from '@y-celestial/service';
import { bindings } from 'src/bindings';

export const tokenSymbol = Symbol('token');

/**
 * initial lambda config
 */
export class LambdaSetup {
  public static setup(event: LambdaEvent): void {
    this.bind<string>(tokenSymbol, event.headers?.['x-api-token'] ?? '');
  }

  private static bind<T>(bindingId: symbol, values: T): void {
    if (bindings.isBound(bindingId) === false)
      bindings.bind<T>(bindingId).toConstantValue(values);
    else bindings.rebind<T>(bindingId).toConstantValue(values);
  }
}
