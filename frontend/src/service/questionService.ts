import { PostQuestionRequest } from '@y-celestial/pollux-service';
import questionEndpoint from 'src/api/questionEndpoint';
import tagEndpoint from 'src/api/tagEndpoint';
import { appendQuestionList, setQuestionList } from 'src/redux/questionSlice';
import { dispatch, getState } from 'src/redux/store';
import { setTagList } from 'src/redux/tagSlice';
import { finishWaiting, startWaiting } from 'src/redux/uiSlice';

export const loadTagList = async () => {
  try {
    dispatch(startWaiting());
    const { tagList } = getState().tag;
    if (tagList !== null) return;

    const res = await tagEndpoint.getTagList();
    dispatch(setTagList(res.data));
  } finally {
    dispatch(finishWaiting());
  }
};

export const loadQuestionList = async () => {
  try {
    dispatch(startWaiting());
    const { questionList } = getState().question;
    if (questionList !== null) return;

    const res = await questionEndpoint.getQuestionList();
    dispatch(setQuestionList(res.data));
  } finally {
    dispatch(finishWaiting());
  }
};

export const createQuestion = async (data: PostQuestionRequest) => {
  try {
    dispatch(startWaiting());

    const res = await questionEndpoint.postQuestion(data);
    dispatch(appendQuestionList(res.data));
  } finally {
    dispatch(finishWaiting());
  }
};
