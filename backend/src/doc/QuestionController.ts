import { PostQuestionLabelRequest } from '../model/api/Question';
import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { Label } from '../model/entity/Label';

@Route('question')
@Tags('題目')
export class QuestionController extends Controller {
  /**
   * 新增標籤
   */
  @Example<PostQuestionLabelResponse>({
    id: 'abcdefg',
    label: 'math-book2',
    ownerId: 'owner-id-abc',
    dateCreated: 1656581359000,
    dateUpdated: 1656581359000,
  })
  @Post('label')
  getVariable(
    @Body() _body: PostQuestionLabelRequest
  ): PostQuestionLabelResponse {
    return {
      id: 'abcdefg',
      label: 'math-book2',
      ownerId: 'owner-id-abc',
      dateCreated: 1656581359000,
      dateUpdated: 1656581359000,
    };
  }
}

export type PostQuestionLabelResponse = Label;
