const initialState = {
  exercise: {},
  status: {
    message: "",
    isDone: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOAD_EXERCISE": {
      return { ...state, exercise: payload };
    }
    default:
      return state;
  }
};
