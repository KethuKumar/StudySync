

import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import groupReducer from '../features/group/groupSlice'
import resourceReducer from "../features/resource/resourceSlice";
import quizReducer from "../features/quiz/quizSlice";
import bookingReducer from "../features/booking/bookingSlice";

export const store = configureStore({
    reducer:{
         auth: authReducer,
         groups: groupReducer,
         resources: resourceReducer,
         quiz: quizReducer,
         booking: bookingReducer,
    }
})

export default store
