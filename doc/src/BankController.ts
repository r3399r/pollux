import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from 'tsoa';
import {
  GetBankResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankRequest,
} from '@y-celestial/pollux-service';

@Route('bank')
@Tags('題庫')
export class BankController extends Controller {
  /**
   * 新增題庫
   * @example _postBankRequest {
   *   "name": "bank-name"
   * }
   */
  @Example<PostBankResponse>({
    id: 'bank-id',
    name: 'bank-name',
    userId: 'user-id',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  })
  @Post()
  postBank(@Body() _postBankRequest: PostBankRequest): PostBankResponse {
    return {} as any;
  }
  /**
   * 取得使用者的題庫
   */
  @Example<GetBankResponse>([
    {
      id: 'bank-id',
      name: 'bank-name',
      userId: 'user-id',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
  ])
  @Get()
  getBank(): GetBankResponse {
    return {} as any;
  }
  /**
   * 修改題庫名
   * @example _putBankRequest {
   *   "name": "bank-name"
   * }
   */
  @Put('{id}')
  putTag(@Path('id') _id: string, @Body() _putBankRequest: PutBankRequest) {}
  /**
   * 刪除題庫
   */
  @Delete('{id}')
  deleteTag(@Path('id') _id: string) {}
}
