import {
  ADD_TEST_CASE,
  ADD_EXERCISE_DETAILS,
  RESET_EXERCISE_DETAILS,
} from "./actions";

const initialState = {
  description: null,
  explanation: null,
  isPublic: false,
  testCases: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TEST_CASE: {
      return { ...state, testCases: [...state.testCases, payload] };
    }
    case ADD_EXERCISE_DETAILS: {
      return { ...state, ...payload };
    }
    case RESET_EXERCISE_DETAILS: {
      return initialState;
    }
    default:
      return state;
  }
};
