import {
  appLoading,
  showMessageWithTimeout,
  setMessage,
  appDoneLoading,
} from "../appState/actions";
import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { logOut } from "../user/actions";

export const addTestCase = (given, result) => {
  return {
    type: "ADD_TEST_CASE",
    payload: { given, result },
  };
};

export const addExerciseDetails = (description, explanation, isPublic) => {
  return {
    type: "ADD_EXERCISE_DETAILS",
    payload: { description, explanation, isPublic },
  };
};

export const resetExerciseToBe = {
  type: "RESET_EXERCISE_DETAILS",
};

export const createExercise = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = selectToken(getState());

    if (token === null) return;

    const exerciseToBe = state.exerciseToBe;
    console.log(exerciseToBe);

    dispatch(appLoading());

    try {
      await axios.post(`${apiUrl}/exercises/create`, exerciseToBe, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(showMessageWithTimeout("success", true, "exercise created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
        dispatch(logOut());
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
        dispatch(logOut());
      }
      dispatch(appDoneLoading());
    }
  };
};
