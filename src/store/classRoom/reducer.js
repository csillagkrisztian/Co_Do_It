import { ADD_EXERCISES } from "./actions";

const initialState = {
  exercises: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_EXERCISES:
      return { ...state, exercises: payload };

    default:
      return state;
  }
};
