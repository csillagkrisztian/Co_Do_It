import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserNames } from "../../store/user/selectors";
import { titleStyle } from "../../style/titleStyle";
import { getUserNames } from "../../store/user/actions";
import { containerBackground } from "../../style/containerBackground";
import { buttonCenter } from "../../style/buttonCenter";
import { imageCenter } from "../../style/imageCenter";
import styles from "./Battle.module.css";

export default function Battle() {
  const [joinInput, setJoinInput] = useState("");
  const user = useSelector(selectUser);
  const userNames = useSelector(selectUserNames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserNames());
  }, [dispatch]);

  return !user ? (
    <h1>Please log in to battles</h1>
  ) : (
    <Container style={containerBackground}>
      <Row>
        <h1 style={{ ...titleStyle, marginBottom: "3rem" }}>
          Welcome to the battle page
        </h1>
      </Row>
      <Row>
        <Col className={styles.optionCard}>
          <h2 style={titleStyle}>Create a Battle Room</h2>
          <Link to={`/battle/${user.name}`}>
            <div
              style={{
                marginTop: "2rem",
                ...buttonCenter,
              }}
            >
              <Button variant="info">Create</Button>
            </div>
          </Link>
        </Col>
        <Col className={styles.optionCard}>
          <h2 style={titleStyle}>Join an Existing Battle Room</h2>
          <div
            style={{
              marginTop: "2rem",
              ...buttonCenter,
            }}
          >
            <input
              style={{ marginLeft: "auto", marginRight: "auto" }}
              onChange={(e) => {
                setJoinInput(e.target.value);
              }}
              value={joinInput}
            ></input>
          </div>
          <br></br>
          {userNames.includes(joinInput) && (
            <Link to={`/battle/${joinInput}`}>
              <div style={imageCenter}>
                <Button variant="info">Join</Button>
              </div>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}
