import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { titleStyle } from "../../style/titleStyle";

export default function Battle() {
  const [joinInput, setJoinInput] = useState("");
  const user = useSelector(selectUser);
  return !user ? (
    <h1>Please log in to battles</h1>
  ) : (
    <Container>
      <Row>
        <h1 style={{ ...titleStyle, marginBottom: "3rem" }}>
          Welcome to the battle page
        </h1>
      </Row>
      <Row>
        <Col>
          <h2 style={titleStyle}>Create a Battle Room</h2>
          <Link to={`/battle/${user.name}`}>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button>Create</Button>
            </div>
          </Link>
        </Col>
        <Col>
          <h2 style={titleStyle}>Join an Existing Battle Room</h2>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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

          <Link to={`/battle/${joinInput}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button>Join</Button>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
