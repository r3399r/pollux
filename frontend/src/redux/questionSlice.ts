import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionType } from '@y-celestial/pollux-service';

export type QuestionState = {
  questionList: QuestionType[] | null;
};

const initialState: QuestionState = {
  questionList: null,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionList: (state: QuestionState, action: PayloadAction<QuestionType[]>) => {
      state.questionList = action.payload;
    },
    appendQuestionList: (state: QuestionState, action: PayloadAction<QuestionType>) => {
      state.questionList = [...(state.questionList ?? []), action.payload];
    },
  },
});

export const { setQuestionList, appendQuestionList } = questionSlice.actions;

export default questionSlice.reducer;
