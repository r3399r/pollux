import {
  GetQuestionLabelResponse,
  GetQuestionParams,
  GetQuestionResponse,
  Label,
  PostQuestionLabelRequest,
  PostQuestionLabelResponse,
  PostQuestionRequest,
  PostQuestionResponse,
  PutQuestionIdRequest,
  PutQuestionIdResponse,
  Question,
  Type,
} from '@y-celestial/pollux-service';
import { addLabel, saveLabels } from 'src/redux/qustionSlice';
import { dispatch, getState } from 'src/redux/store';
import http from 'src/util/http';
import { getToken } from './userService';

export const getLabels = async (): Promise<Label[]> => {
  const { question } = getState();
  if (question.labels !== undefined) return question.labels;

  const token = getToken();
  const res = await http.get<GetQuestionLabelResponse>('question/label', {
    headers: { ['x-api-token']: token },
  });
  dispatch(saveLabels(res.data));

  return res.data;
};

export const createLabel = async (label: string) => {
  const token = getToken();
  const res = await http.post<PostQuestionLabelResponse, PostQuestionLabelRequest>(
    'question/label',
    {
      headers: { ['x-api-token']: token },
      data: { label },
    },
  );
  dispatch(addLabel(res.data));
};

export const createQuestion = async (data: PostQuestionRequest) => {
  const token = getToken();
  await http.post<PostQuestionResponse, PostQuestionRequest>('question', {
    headers: { ['x-api-token']: token },
    data,
  });
};

export const reviseQuestion = async (id: string, data: PutQuestionIdRequest) => {
  const token = getToken();
  await http.put<PutQuestionIdResponse, PutQuestionIdRequest>(`question/${id}`, {
    headers: { ['x-api-token']: token },
    data,
  });
};

export const getQuestions = async (labelId: string) => {
  const token = getToken();
  const res = await http.get<GetQuestionResponse, GetQuestionParams>('question', {
    headers: { ['x-api-token']: token },
    params: { labelId },
  });

  return res.data;
};

export const deleteQuestion = async (id: string) => {
  const token = getToken();
  await http.delete(`question/${id}`, { headers: { ['x-api-token']: token } });
};

export const typeLocale = (type: Type): string => {
  if (type === Type.TrueFalse) return '?????????';
  if (type === Type.Single) return '?????????';
  if (type === Type.Multiple) return '?????????';
  if (type === Type.FillInBlank) return '?????????';

  return '?????????';
};

export const parseAnswer = (question: Question): string | undefined => {
  if (question.type === Type.Single) return `(${question.answer?.split('/')[0]})`;
  if (question.type === Type.Multiple)
    return question.answer
      ?.split(',')
      .map((v, i) => (v === 'true' ? `(${i + 1})` : ''))
      .join('');
  if (question.type === Type.Essay) return '-';

  return question.answer;
};
