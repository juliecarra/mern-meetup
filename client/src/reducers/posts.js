import { FETCH_POSTS } from "../actions/types";

const initialState = {
  posts: [],
};

//reducer for posts
export const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      // debugger;
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};
