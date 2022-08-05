import { createSlice } from "@reduxjs/toolkit";

export const favouriteTweetsSlice = createSlice({
  name: "favouriteTweets",
  initialState: {
    value: [],
  },
  reducers: {
    addFavouriteTweets: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    removeFavouriteTweets: (state, action) => {
      //action.payload here is where the id would be passed into
      const filterFavouriteTweets = (id) => {
        state.value = state.value.filter((tweet) => id !== tweet.id);
      };
      filterFavouriteTweets(action.payload);
    },
  },
});

export const { addFavouriteTweets, removeFavouriteTweets } =
  favouriteTweetsSlice.actions;

export default favouriteTweetsSlice.reducer;
