import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { PostQuestionRequest, PostQuestionResponse, PostQuestionTagRequest, PostQuestionTagResponse, Type } from '@y-celestial/pollux-service'

@Route('question')
@Tags('題目')
export class QuestionController extends Controller {
  /**
   * 新增題目
   * @example _postQuestionRequest {
   *   "type": "S",
   *   "question": "1+1=? (1) 1 (2) 2",
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
  postQuestion(@Body() _postQuestionRequest: PostQuestionRequest): PostQuestionResponse {
    return {} as any;
  }
  /**
   * 新增標籤至題目
   * @example _postQuestionTagRequest [{
   *   "questionId": "question-id-1",
   *   "tag_id": ["tag-id-1", "tag-id-2"]
   * }]
   */
  @Example<PostQuestionTagResponse>([{
    id: 'question-tag-id-1',
    questionId: 'question-id-1',
    tagId: 'tag-id-1'
  },{
    id: 'question-tag-id-2',
    questionId: 'question-id-1',
    tagId: 'tag-id-2'
  }])
  @Post("tag")
  postQuestionTag(@Body() _postQuestionTagRequest: PostQuestionTagRequest): PostQuestionTagResponse {
    return {} as any;
  }
}
