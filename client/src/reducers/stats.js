import { FETCH_STATS } from "../actions/types";

const initialState = {
  stats: [
    {
      meetups: {
        data: [],
        count: null,
      },
      threads: {
        data: [],
        count: null,
      },
      posts: {
        data: [],
        count: null,
      },
    },
  ],
};

//reducer for stats
export const stats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS:
      // debugger;
      return { ...state, stats: action.payload };
    //   return Object.assign({}, state, {
    //     stats: action.payload,
    //   });
    default:
      return state;
  }
};
