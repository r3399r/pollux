import {
  GetQuestionParam,
  GetQuestionResponse,
  PostQuestionRequest,
  PostQuestionResponse,
} from '@y-celestial/pollux-service';
import http from 'src/util/http';

const getQuestionList = async (params?: GetQuestionParam) =>
  await http.authGet<GetQuestionResponse>('question', { params });

const postQuestion = async (data: PostQuestionRequest) =>
  await http.authPost<PostQuestionResponse, PostQuestionRequest>('question', { data });

export default { getQuestionList, postQuestion };
