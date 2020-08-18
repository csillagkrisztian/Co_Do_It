import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";

export default function Battle() {
  const [joinInput, setJoinInput] = useState("");
  const user = useSelector(selectUser);
  return !user ? (
    <h1>Please log in to battles</h1>
  ) : (
    <Container>
      <Row>
        <h1>Welcome to the battle page</h1>
      </Row>
      <Row>
        <Col>
          <h2>Create a Battle Room</h2>
          <Link to={`/battle/${user.name}`}>
            <Button>Create</Button>
          </Link>
        </Col>
        <Col>
          <h2>Join an Existing Battle Room</h2>
          <input
            onChange={(e) => {
              setJoinInput(e.target.value);
            }}
            value={joinInput}
          ></input>
          <br></br>
          <Link to={`/battle/${joinInput}`}>
            <Button>Join</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
