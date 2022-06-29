import { Controller, Example, Get, Query, Route, Tags } from 'tsoa';
import { GetVariableResponse } from '../model/api/Variable';

@Route('variable')
@Tags('環境變數')
export class VariableController extends Controller {
  /**
   * 取得指定環境變數
   */
  @Example<GetVariableResponse>({
    a: '1',
    b: '2',
    c: '3',
  })
  @Get()
  getVariable(@Query('name') _name: string): GetVariableResponse {
    return { a: '1', b: '2' };
  }
}
