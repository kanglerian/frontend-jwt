import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../functions/auth';

export default configureStore({
  reducer: {
    counter: counterReducer
  }
});