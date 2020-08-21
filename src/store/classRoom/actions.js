import Axios from "axios";
import { apiUrl } from "../../config/constants";
import { logOut } from "../user/actions";
import { setMessage, appDoneLoading, appLoading } from "../appState/actions";
import { selectToken } from "../user/selectors";

export const ADD_EXERCISES = "ADD_EXERCISES";

export const addExercises = (data) => {
  return { type: ADD_EXERCISES, payload: data };
};

export const getAllExercises = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;

    dispatch(appLoading());

    try {
      const response = await Axios.get(`${apiUrl}/exercises`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      dispatch(addExercises(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
        dispatch(logOut());
        dispatch(appDoneLoading());
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
        dispatch(logOut());
        dispatch(appDoneLoading());
      }
    }
  };
};
