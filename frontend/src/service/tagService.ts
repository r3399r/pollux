import tagEndpoint from 'src/api/tagEndpoint';
import { dispatch, getState } from 'src/redux/store';
import { appendTagList, setTagList } from 'src/redux/tagSlice';
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

export const createTag = async (name: string) => {
  try {
    dispatch(startWaiting());

    const res = await tagEndpoint.postTag({ name });
    dispatch(appendTagList(res.data));
  } finally {
    dispatch(finishWaiting());
  }
};

export const editTag = async (id: string, name: string) => {
  try {
    dispatch(startWaiting());

    await tagEndpoint.putTag(id, { name });

    const { tagList } = getState().tag;
    const tmp = [...(tagList ?? [])];
    const res = tmp.map((v) => (v.id === id ? { ...v, name } : v));
    dispatch(setTagList(res));
  } finally {
    dispatch(finishWaiting());
  }
};

export const deleteTag = async (id: string) => {
  try {
    dispatch(startWaiting());

    await tagEndpoint.deleteTag(id);

    const { tagList } = getState().tag;
    const tmp = [...(tagList ?? [])];
    const res = tmp.filter((v) => v.id !== id);
    dispatch(setTagList(res));
  } finally {
    dispatch(finishWaiting());
  }
};
