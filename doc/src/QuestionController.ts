import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { PostQuestionRequest, PostQuestionResponse } from '@y-celestial/pollux-service'

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
  @Example({
    id: 'question-id',
    type: 'S',
    content: '1+1=? (1) 1 (2) 2',
    answer: '2',
    userId: 'user-id',
    dateCreated: new Date('2022-08-10T11:04:37.212Z'),
    dateUpdated: new Date('2022-08-10T11:04:37.212Z'),
  })
  @Post()
  postQuestion(@Body() _postQuestionRequest: PostQuestionRequest): PostQuestionResponse {
    return {} as any;
  }
}
