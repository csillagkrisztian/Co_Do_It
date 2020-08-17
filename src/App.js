import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Playground from "./pages/Playground/PlaygroundPage";
import CreateExercise from "./pages/CreateExercise/CreateExercise";

import io from "socket.io-client";
import { selectUser } from "./store/user/selectors";
import Classroom from "./pages/Classroom/Classroom";
import HomePage from "./pages/HomePage/HomePage";
import { apiUrl } from "./config/constants";

let socket;

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);
  /* useEffect(() => {
    socket = io(apiUrl);
    socket.emit("joined", { user: user.name, room: user.id });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [user]);*/

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/classroom/:name" component={Classroom} />
        <Route path="/playground" component={Playground} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
