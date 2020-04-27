import { FETCH_MEETUPS, FETCH_MEETUP } from "../actions/types";

const initialMeetupsState = {
  meetups: []
};

const initialState = {
  meetup: {}
};
//reducer for meetups
export const meetups = (state = initialMeetupsState, action) => {
  switch (action.type) {
    case FETCH_MEETUPS:
      // debugger;
      return { ...state, meetups: action.payload };
    default:
      return state;
  }
};

export const meetup = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEETUP:
      // debugger;
      return { ...state, meetup: action.payload };
    default:
      return state;
  }
};
