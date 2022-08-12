import { Body, Controller, Example, Get, Post, Route, Tags } from 'tsoa';
import { GetTagResponse, PostTagRequest, PostTagResponse } from '@y-celestial/pollux-service'

@Route('tag')
@Tags('標籤')
export class TagController extends Controller {
  /**
   * 新增標籤
   * @example _postTagRequest  {
   *   "name": "tag-name"
   * }
   */
  @Example<PostTagResponse>({
    id: 'tag-id',
    name: 'tag-name',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  })
  @Post()
  postQuestion(@Body() _postTagRequest: PostTagRequest): PostTagResponse {
    return {} as any;
  }
  /**
   * 取得使用者的標籤
   */
  @Example<GetTagResponse>([{
    id: 'tag-id',
    name: 'tag-name',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  }])
  @Get()
  getVariable(): GetTagResponse {
    return {} as any;
  }
}
