import { FETCH_IP } from "../actions/types";

const initialState = {
  meta: [
    {
      city: "",
      country: "",
    },
  ],
};

//reducer for posts
export const meta = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IP:
      // debugger;
      return { ...state, meta: action.payload };

    default:
      return state;
  }
};
