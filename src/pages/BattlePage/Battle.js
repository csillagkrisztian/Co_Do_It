import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserNames } from "../../store/user/selectors";
import { getUserNames } from "../../store/user/actions";

import { Container, Row, Col, Button } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "./Battle.module.css";

import BattleTitle from "./components/BattleTitle";
import BattleCreateRoom from "./components/BattleCreateRoom";

import { roomTitle } from "./components/constants";
import Head from "../../components/Head";

export default function Battle() {
  const [joinInput, setJoinInput] = useState("");
  const user = useSelector(selectUser);
  const userNames = useSelector(selectUserNames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserNames());
  }, [dispatch]);

  const { optionCard, inputCenter } = styles;
  const { title, containerBackground, buttonCenter } = appStyles;

  return !user ? (
    <h1 className={title}>Please log in to play battles</h1>
  ) : (
    <Container className={containerBackground}>
      <Head page={"Battle Room"} />
      <Row>
        <BattleTitle title={roomTitle}></BattleTitle>
      </Row>
      <Row>
        <BattleCreateRoom
          title={"Create a Battle Room"}
          name={user.name}
          buttonText={"Create"}
        ></BattleCreateRoom>
        <Col className={optionCard}>
          <h2 className={title}>Join an Existing Battle Room</h2>
          <div className={buttonCenter}>
            <input
              className={inputCenter}
              onChange={(e) => {
                setJoinInput(e.target.value);
              }}
              value={joinInput}
            ></input>
          </div>
          <br></br>
          {userNames.includes(joinInput) && (
            <Link to={`/battle/${joinInput}`}>
              <div className={buttonCenter}>
                <Button variant="info">Join</Button>
              </div>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}
