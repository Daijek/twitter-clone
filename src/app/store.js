import { configureStore } from "@reduxjs/toolkit";
import favouriteTweetReducer from "../feautures/favouriteTweets/favouriteTweetsSlice";

export default configureStore({
  reducer: {
    favouriteTweets: favouriteTweetReducer,
  },
});
