import { GetQuestionLabelResponse, Label } from '@y-celestial/pollux-service';
import { saveLabels } from 'src/redux/qustionSlice';
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
