import React, { useEffect } from "react";
import styles from "./App.module.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Playground from "./pages/Playground/PlaygroundPage";
import CreateExercise from "./pages/CreateExercise/CreateExercise";

import Classroom from "./pages/ClassroomPage/Classroom";
import HomePage from "./pages/HomePage/HomePage";
import Battle from "./pages/BattlePage/Battle";
import BattleRoom from "./pages/BattlePage/BattleRoom";
import UserProfile from "./pages/UserProfilePage/UserProfile";
import MyProfile from "./pages/UserProfilePage/MyProfile";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  const { App } = styles;

  return (
    <div className={App}>
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/battle/:name" component={BattleRoom} />
        <Route path="/classroom/:name" component={Classroom} />
        <Route path="/profile/:id" component={UserProfile} />
        <Route path="/myprofile" component={MyProfile} />
        <Route path="/battle" component={Battle} />
        <Route path="/playground" component={Playground} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
