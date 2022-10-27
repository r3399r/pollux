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
  PostBankQuestionRequest,
  PostBankQuestionResponse,
  PostBankRequest,
  PostBankResponse,
  PutBankRequest,
} from '@y-celestial/pollux-service';

@Route('bank')
@Tags('題庫')
export class BankController extends Controller {
  /**
   * @summary 取得使用者的題庫
   */
  @Example<GetBankResponse>([
    {
      id: 'bank-id',
      name: 'bank-name',
      userId: 'user-id',
      questionCount: 10,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
  ])
  @Get()
  getBank(): GetBankResponse {
    return {} as any;
  }
  /**
   * @summary 新增題庫
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
   * @summary 刪除題庫
   */
  @Delete('{id}')
  deleteBank(@Path('id') _id: string) {}
  /**
   * @summary 修改題庫名
   * @example _putBankRequest {
   *   "name": "bank-name"
   * }
   */
  @Put('{id}')
  putBank(@Path('id') _id: string, @Body() _putBankRequest: PutBankRequest) {}
  /**
   * @summary 新增題目至題庫
   * @example _postBankQuestionRequest ["question-id-1", "question-id-2"]
   */
  @Example<PostBankQuestionResponse>([
    {
      id: 'bank-question-pair-1',
      bankId: 'bank-id',
      questionId: 'question-id-1',
    },
    {
      id: 'bank-question-pair-2',
      bankId: 'bank-id',
      questionId: 'question-id-2',
    },
  ])
  @Post('{id}/question')
  postBankQuestion(
    @Body() _postBankQuestionRequest: PostBankQuestionRequest
  ): PostBankQuestionResponse {
    return {} as any;
  }
  /**
   * @summary 刪除題庫之題目
   */
  @Delete('{id}/question/{qid}')
  deleteBankQuestion(@Path('id') _id: string, @Path('qid') _qid: string) {}
}
