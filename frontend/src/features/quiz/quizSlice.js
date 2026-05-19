import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../../services/api";


// ✅ CREATE QUIZ
export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",

  async (quizData) => {

    const res = await api.post(
      "/quizzes",
      quizData
    );

    return res.data;
  }
);


// ✅ GET QUIZZES
export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",

  async (groupId) => {

    const res = await api.get(
      `/quizzes/group/${groupId}`
    );

    return res.data;
  }
);


// ✅ SUBMIT QUIZ
export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",

  async ({ quizId, answers }) => {

    const res = await api.post(
      `/quizzes/submit/${quizId}`,
      { answers }
    );

    return res.data;
  }
);


// ✅ LEADERBOARD
export const fetchLeaderboard =
  createAsyncThunk(

    "quiz/fetchLeaderboard",

    async (quizId) => {

      const res = await api.get(
        `/quizzes/leaderboard/${quizId}`
      );

      return res.data;
    }
  );

const quizSlice = createSlice({
  name: "quiz",

  initialState: {
    quizzes: [],
    leaderboard: [],
    result: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchQuizzes.fulfilled,

        (state, action) => {
          state.quizzes = action.payload;
        }
      )

      .addCase(
        createQuiz.fulfilled,

        (state, action) => {
          state.quizzes.push(action.payload);
        }
      )

      .addCase(
        submitQuiz.fulfilled,

        (state, action) => {
          state.result = action.payload;
        }
      )

      .addCase(
        fetchLeaderboard.fulfilled,

        (state, action) => {
          state.leaderboard = action.payload;
        }
      );
  }
});

export default quizSlice.reducer;