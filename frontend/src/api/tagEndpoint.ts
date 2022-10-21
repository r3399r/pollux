import {
  GetTagResponse,
  PostTagRequest,
  PostTagResponse,
  PutTagRequest,
} from '@y-celestial/pollux-service';
import http from 'src/util/http';

const getTagList = async () => await http.authGet<GetTagResponse>('tag');

const postTag = async (data: PostTagRequest) =>
  await http.authPost<PostTagResponse, PostTagRequest>('tag', { data });

const putTag = async (id: string, data: PutTagRequest) =>
  await http.authPut<void, PutTagRequest>(`tag/${id}`, { data });

const deleteTag = async (id: string) => await http.authDelete(`tag/${id}`);

export default {
  getTagList,
  postTag,
  putTag,
  deleteTag,
};
