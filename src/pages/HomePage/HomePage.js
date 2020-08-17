import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
const SERVERLINK = "localhost:4000";

let socket;

export default function HomePage() {
  const [teacher, setTeacher] = useState("");
  const [passCode, setPassCode] = useState("");

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1 style={{ marginTop: "2rem", textAlign: "center" }}>
              Welcome to Co_Do_It!
            </h1>
            <Form
              style={{
                width: "33%",
                marginTop: "2rem",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
              }}
            >
              <FormGroup>
                <Form.Label>Teacher's Name</Form.Label>
                <Form.Control
                  value={teacher}
                  onChange={(event) => setTeacher(event.target.value)}
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Classroom Passcode</Form.Label>
                <Form.Control
                  value={passCode}
                  onChange={(event) => setPassCode(event.target.value)}
                  type="text"
                  placeholder="Enter name"
                  required
                />
              </FormGroup>
              <Button
                onClick={() => {
                  console.log(teacher, passCode);
                }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
