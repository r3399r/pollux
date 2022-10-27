import { GetVariableResponse } from '@y-celestial/pollux-service';
import { Controller, Example, Get, Query, Route, Tags } from 'tsoa';

@Route('variable')
@Tags('環境變數')
export class VariableController extends Controller {
  /**
   * @summary 取得指定環境變數
   */
  @Example<GetVariableResponse>({
    a: '1',
    b: '2',
    c: '3',
  })
  @Get()
  getVariable(@Query('name') _name: string): GetVariableResponse {
    return {};
  }
}
