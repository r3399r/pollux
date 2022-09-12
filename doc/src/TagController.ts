import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
} from 'tsoa';
import {
  GetTagResponse,
  PostTagRequest,
  PostTagResponse,
  PutTagRequest,
} from '@y-celestial/pollux-service';

@Route('tag')
@Tags('標籤')
export class TagController extends Controller {
  /**
   * 取得使用者的標籤
   */
  @Example<GetTagResponse>([
    {
      id: 'tag-id',
      name: 'tag-name',
      userId: 'user-id',
      dateCreated: new Date(),
      dateUpdated: new Date(),
    },
  ])
  @Get()
  getTag(): GetTagResponse {
    return {} as any;
  }
  /**
   * 新增標籤
   * @example _postTagRequest {
   *   "name": "tag-name"
   * }
   */
  @Example<PostTagResponse>({
    id: 'tag-id',
    name: 'tag-name',
    userId: 'user-id',
    dateCreated: new Date(),
    dateUpdated: new Date(),
  })
  @Post()
  postTag(@Body() _postTagRequest: PostTagRequest): PostTagResponse {
    return {} as any;
  }
  /**
   * 刪除標籤
   */
  @Delete('{id}')
  deleteTag(@Path('id') _id: string) {}
  /**
   * 修改標籤
   * @example _putTagRequest {
   *   "name": "tag-name"
   * }
   */
  @Put('{id}')
  putTag(@Path('id') _id: string, @Body() _putTagRequest: PutTagRequest) {}
}
