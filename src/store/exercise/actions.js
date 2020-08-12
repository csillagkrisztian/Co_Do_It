import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const getRandomExercise = () => async (dispatch, getState) => {
  try {
    dispatch(appLoading());
    const response = await axios.get(`${apiUrl}/exercises/random`);
    const data = response.data;

    dispatch(loadExercise(data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch(setMessage("danger", true, error.response.data.message));
    } else {
      dispatch(setMessage("danger", true, error.message));
    }
  }
  dispatch(appDoneLoading());
};

export const loadExercise = (data) => {
  return { type: "LOAD_EXERCISE", payload: data };
};
