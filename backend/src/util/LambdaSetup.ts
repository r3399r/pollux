import { LambdaEvent } from '@y-celestial/service';
import { bindings } from 'src/bindings';

export const cognitoSymbol = Symbol('cognito');

/**
 * initial lambda config
 */
export class LambdaSetup {
  public static setup(event: LambdaEvent): void {
    this.bind<string | null>(
      cognitoSymbol,
      event.requestContext.authorizer?.claims.sub ?? null
    );
  }

  private static bind<T>(bindingId: symbol, values: T): void {
    if (bindings.isBound(bindingId) === false)
      bindings.bind<T>(bindingId).toConstantValue(values);
    else bindings.rebind<T>(bindingId).toConstantValue(values);
  }
}
