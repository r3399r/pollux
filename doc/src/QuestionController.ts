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
  PostQuestionTagRequest,
  PostQuestionTagResponse,
  PutQuestionRequest,
  Type,
} from '@y-celestial/pollux-service';

@Route('question')
@Tags('題目')
export class QuestionController extends Controller {
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
   * 修改題目
   * @example _putQuestionRequest {
   *   "type": "S",
   *   "content": "1+1=? (1) 1 (2) 2",
   *   "answer": "2"
   * }
   */
  @Put('{id}')
  putTag(
    @Path('id') _id: string,
    @Body() _putQuestionRequest: PutQuestionRequest
  ) {}
  /**
   * 刪除題目
   */
  @Delete('{id}')
  deleteTag(@Path('id') _id: string) {}
  /**
   * 設定題目之標籤
   * @example _putQuestionTagRequest ["tag-id-1", "tag-id-2"]
   */
  @Example<PostQuestionTagResponse>([
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
  @Put('tag')
  putQuestionTag(
    @Body() _putQuestionTagRequest: PostQuestionTagRequest
  ): PostQuestionTagResponse {
    return {} as any;
  }
}
