import { createSlice } from "@reduxjs/toolkit";

interface Question {
  id: number;
  question: string;
  answer: string;
}

interface State {
  list: Question[];
}

const initialState: State = {
  list: [
    { id: 1, question: "Столица Франции?", answer: "Париж" },
    { id: 2, question: "Күйүк планетасы?", answer: "Марс" },
  ],
};

const slice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion(state, action) {
      state.list.push(action.payload);
    },
    deleteQuestion(state, action) {
      state.list = state.list.filter((q) => q.id !== action.payload);
    },
    updateQuestion(state, action) {
      const updated = action.payload;
      state.list = state.list.map((q) => (q.id === updated.id ? updated : q));
    },
  },
});

export const { addQuestion, deleteQuestion, updateQuestion } = slice.actions;
export default slice.reducer;
