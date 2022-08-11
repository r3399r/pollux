import { Body, Controller, Example, Post, Route, Tags } from 'tsoa';
import { PostTagRequest, PostTagResponse } from '@y-celestial/pollux-service'

@Route('tag')
@Tags('標籤')
export class TagController extends Controller {
  /**
   * 新增標籤
   * @example _postTagRequest  {
   *   "name": "tag-name"
   * }
   */
  @Example({
    id: 'tag-id',
    name: 'tag-name',
    dateCreated: new Date('2022-08-10T11:04:37.212Z'),
  })
  @Post()
  postQuestion(@Body() _postTagRequest: PostTagRequest): PostTagResponse {
    return {} as any;
  }
}
