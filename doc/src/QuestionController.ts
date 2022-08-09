import { PostQuestionResponse, Type } from '@y-celestial/pollux-service';
import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';

@Route('question')
@Tags('題目')
export class QuestionController extends Controller {
  /**
   * 新增題目
   * @example _postQuestionRequest  {
   *   "type": "S",
   *   "question": "abc",
   *   "answer": "1"
   * }
   */
  @Example({
    id: 'question-id',
    type: 'S' as Type,
    question: '1+1=? (1) 1 (2) 2',
    answer: '2',
    ownerId: 'owner-id',
    dateCreated: 1656581359000,
    dateUpdated: 1656581359000,
  })
  @Post()
  postQuestion(@Body() _postQuestionRequest: PostQuestionResponse) {
    return {
      id: 'question-id',
      type: 'S' as Type,
      question: '1+1=? (1) 1 (2) 2',
      answer: '2',
      ownerId: 'owner-id',
      dateCreated: 1656581359000,
      dateUpdated: 1656581359000,
    };
  }
}
