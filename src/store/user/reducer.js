import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  accountType: "guest",
  lookingAt: null,
  userNames: [],
  teacherNames: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERNAMES": {
      return { ...state, userNames: action.payload };
    }
    case "ADD_TEACHERNAMES": {
      return { ...state, teacherNames: action.payload };
    }

    case "ADD_LOOKING_AT": {
      return { ...state, lookingAt: action.payload };
    }
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
