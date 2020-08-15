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
import { Jumbotron } from "react-bootstrap";
import Playground from "./pages/Playground/PlaygroundPage";
import CreateExercise from "./pages/CreateExercise/CreateExercise";

import io from "socket.io-client";
import { selectUser } from "./store/user/selectors";
import Classroom from "./pages/Classroom/Classroom";
let socket;
const SERVERLINK = "localhost:4000";

const Home = () => {
  const user = useSelector(selectUser);
  useEffect(() => {
    socket = io(SERVERLINK);
    socket.emit("joined", user);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [SERVERLINK, user]);
  return (
    <Jumbotron>
      <h1>Home</h1>
    </Jumbotron>
  );
};

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/classroom/:id" component={Classroom} />
        <Route path="/playground" component={Playground} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
