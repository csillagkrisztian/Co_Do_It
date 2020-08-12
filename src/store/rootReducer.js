import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import exercise from "./exercise/reducer";

export default combineReducers({
  appState,
  user,
  exercise,
});
