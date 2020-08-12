const initialState = {
  exercise: null,
  status: {
    messages: [],
    isDone: false,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "RESET_STATE": {
      return initialState;
    }

    case "SEND_STATUS": {
      return {
        ...state,
        status: {
          ...state.status,
          messages: [...state.status.messages, payload],
        },
      };
    }

    case "DELETE_STATUSES": {
      return {
        ...state,
        status: {
          ...state.status,
          messages: [],
        },
      };
    }

    case "COMPLETED_EXERCISE": {
      return {
        ...state,
        status: { ...state.status, isDone: true },
      };
    }

    case "LOAD_EXERCISE": {
      return {
        ...state,
        exercise: payload,
      };
    }
    default:
      return state;
  }
};
