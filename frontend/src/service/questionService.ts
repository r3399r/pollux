import tagEndpoint from 'src/api/tagEndpoint';
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
