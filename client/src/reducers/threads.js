import { FETCH_THREADS, FETCH_THREAD } from "../actions/types";

const initialState = {
  threads: [],
};

const initialThreadState = {
  thread: {},
};

//reducer for threads
export const threads = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREADS:
      // debugger;
      return { ...state, threads: action.payload };
    default:
      return state;
  }
};

export const thread = (state = initialThreadState, action) => {
  switch (action.type) {
    case FETCH_THREAD:
      // debugger;
      return { ...state, thread: action.payload };
    default:
      return state;
  }
};
