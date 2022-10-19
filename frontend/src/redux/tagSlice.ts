import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag } from '@y-celestial/pollux-service/lib/src/model/entity/Tag';

export type TagState = {
  tagList: Tag[] | null;
};

const initialState: TagState = {
  tagList: null,
};

export const uiSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTagList: (state: TagState, action: PayloadAction<Tag[]>) => {
      state.tagList = action.payload;
    },
  },
});

export const { setTagList } = uiSlice.actions;

export default uiSlice.reducer;
