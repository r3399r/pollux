import { injectable } from 'inversify';
import { GetVariableParam, GetVariableResponse } from 'src/model/api/Variable';

/**
 * Service class for Variable
 */
@injectable()
export class VariableService {
  public async getVariable(
    param: GetVariableParam
  ): Promise<GetVariableResponse> {
    const items = param.name.split(',');

    const res: GetVariableResponse = {};
    items.forEach((v) => {
      const env = process.env[v];
      if (env !== undefined) res[v] = env;
    });

    return res;
  }
}
