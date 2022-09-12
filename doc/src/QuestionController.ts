import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Tags,
} from 'tsoa';
import {
  GetQuestionResponse,
  PostQuestionRequest,
  PostQuestionResponse,
  PutQuestionRequest,
  PutQuestionTagRequest,
  PutQuestionTagResponse,
  Type,
} from '@y-celestial/pollux-service';

@Route('question')
@Tags('題目')
export class QuestionController extends Controller {
  /**
   * 取得使用者的題目
   */
  @Example<GetQuestionResponse>([
    {
      id: 'question-id',
      type: Type.Single,
      content: '1+1=? (1) 1 (2) 2',
      answer: '2',
      userId: 'user-id',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      tag: ['tag-id-1::name-1', 'tag-id-2::name-2'],
    },
  ])
  @Get()
  getQuestion(@Query('tagId') _tagId: string): GetQuestionResponse {
    return {} as any;
  }
  /**
   * 新增題目
   * @example _postQuestionRequest {
   *   "type": "S",
   *   "content": "1+1=? (1) 1 (2) 2",
   *   "answer": "2"
   * }
   */
  @Example<PostQuestionResponse>({
    id: 'question-id',
    type: Type.Single,
    content: '1+1=? (1) 1 (2) 2',
    answer: '2',
    userId: 'user-id',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  })
  @Post()
  postQuestion(
    @Body() _postQuestionRequest: PostQuestionRequest
  ): PostQuestionResponse {
    return {} as any;
  }
  /**
   * 刪除題目
   */
  @Delete('{id}')
  deleteQuestion(@Path('id') _id: string) {}
  /**
   * 修改題目
   * @example _putQuestionRequest {
   *   "type": "S",
   *   "content": "1+1=? (1) 1 (2) 2",
   *   "answer": "2"
   * }
   */
  @Put('{id}')
  putQuestion(
    @Path('id') _id: string,
    @Body() _putQuestionRequest: PutQuestionRequest
  ) {}
  /**
   * 設定題目之標籤
   * @example _putQuestionTagRequest ["tag-id-1", "tag-id-2"]
   */
  @Example<PutQuestionTagResponse>([
    {
      id: 'question-tag-id-1',
      questionId: 'question-id-1',
      tagId: 'tag-id-1',
    },
    {
      id: 'question-tag-id-2',
      questionId: 'question-id-1',
      tagId: 'tag-id-2',
    },
  ])
  @Put('{id}/tag')
  putQuestionTag(
    @Path('id') _id: string,
    @Body() _putQuestionTagRequest: PutQuestionTagRequest
  ): PutQuestionTagResponse {
    return {} as any;
  }
}
