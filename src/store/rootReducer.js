import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import exercise from "./exercise/reducer";
import exerciseToBe from "./exerciseToBe/reducer";

export default combineReducers({
  appState,
  user,
  exercise,
  exerciseToBe,
});
