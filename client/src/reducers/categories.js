import { FETCH_CATEGORIES } from "../actions/types";

const initialCategoriesState = {
  categories: []
};

//reducer for categories
export const categories = (state = initialCategoriesState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      // debugger;
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
