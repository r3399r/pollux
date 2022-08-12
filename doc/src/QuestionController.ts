import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { PostQuestionRequest, PostQuestionResponse, Type } from '@y-celestial/pollux-service'

@Route('question')
@Tags('題目')
export class QuestionController extends Controller {
  /**
   * 新增題目
   * @example _postQuestionRequest  {
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
    userId:'user-id',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  })
  @Post()
  postQuestion(@Body() _postQuestionRequest: PostQuestionRequest): PostQuestionResponse {
    return {} as any;
  }
}
