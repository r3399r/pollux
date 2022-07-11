import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { Type } from '../constant/Question';

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
    id: 'abcdefg',
    type: 'S' as Type,
    question: 'abc',
    answer: '1',
    ownerId: 'owner-id-abc',
    dateCreated: 1656581359000,
    dateUpdated: 1656581359000,
  })
  @Post()
  getVariable(@Body() _postQuestionRequest: any) {
    return {
      id: 'abcdefg',
      type: 'S' as Type,
      question: 'abc',
      answer: '1',
      ownerId: 'owner-id-abc',
      dateCreated: 1656581359000,
      dateUpdated: 1656581359000,
    };
  }
}
