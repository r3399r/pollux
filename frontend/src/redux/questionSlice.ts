import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '@y-celestial/pollux-service';

export type QuestionState = {
  questionList: Question[] | null;
};

const initialState: QuestionState = {
  questionList: null,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionList: (state: QuestionState, action: PayloadAction<Question[]>) => {
      state.questionList = action.payload;
    },
    appendQuestionList: (state: QuestionState, action: PayloadAction<Question>) => {
      state.questionList = [...(state.questionList ?? []), action.payload];
    },
  },
});

export const { setQuestionList, appendQuestionList } = questionSlice.actions;

export default questionSlice.reducer;
