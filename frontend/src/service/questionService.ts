import {
  GetQuestionLabelResponse,
  GetQuestionResponse,
  Label,
  PostQuestionLabelRequest,
  PostQuestionLabelResponse,
  PostQuestionRequest,
  PostQuestionResponse,
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

export const getQuestions = async () => {
  const token = getToken();
  const res = await http.get<GetQuestionResponse>('question', {
    headers: { ['x-api-token']: token },
  });

  return res.data;
};

export const typeLocale = (type: Type): string => {
  if (type === Type.TrueFalse) return '是非題';
  if (type === Type.Single) return '單選題';
  if (type === Type.Multiple) return '多選題';
  if (type === Type.FillInBlank) return '填充題';

  return '問答題';
};
