import { GetTagResponse } from '@y-celestial/pollux-service';
import http from 'src/util/http';

const getTagList = async () => await http.authGet<GetTagResponse>('tag');

export default {
  getTagList,
};
