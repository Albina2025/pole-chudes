import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  currentQuestionId: number | null;
  guessedLetters: string[]; 
  fullAnswer: string; 
}

const initialState: GameState = {
  currentQuestionId: null,
  guessedLetters: [],
  fullAnswer: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setQuestion(state, action: {payload:number}) {
      state.currentQuestionId = action.payload;
      state.guessedLetters = [];
      state.fullAnswer = "";
    },
    guessLetter(state, action:  {payload:string}) {
      const letter = action.payload.toUpperCase();
      if (!state.guessedLetters.includes(letter)) {
        state.guessedLetters.push(letter);
      }
    },
    guessWord(state, action:  {payload:string}) {
      state.fullAnswer = action.payload.toUpperCase();
    },
    resetGame(state) {
      state.currentQuestionId = null;
      state.guessedLetters = [];
      state.fullAnswer = "";
    },
  },
});

export const { setQuestion, guessLetter, guessWord, resetGame } = gameSlice.actions;
export default gameSlice.reducer;

