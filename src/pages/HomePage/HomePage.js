import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [teacher, setTeacher] = useState("");

  const titleStyle = {
    marginTop: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  };
  return (
    <div>
      <Container>
        <Row>
          <h1 style={titleStyle}>Welcome to Co_Do_It!</h1>
        </Row>
        <Row>
          <Col>
            <h2 style={titleStyle}>Battle with your friends</h2>
            <Link to="/battle">
              <div
                style={{
                  marginTop: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button>Let's go battle!</Button>
              </div>
            </Link>
          </Col>
          <Col>
            <h2 style={titleStyle}>Join a Classroom</h2>
            <Form
              style={{
                ...titleStyle,
                width: "33%",
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
              <Link to={`/classroom/${teacher}`}>
                <Button>Submit</Button>
              </Link>
            </Form>
          </Col>

          <Col>
            <h2 style={titleStyle}>Have fun in the Playground</h2>
            <Link to="/playground">
              <div
                style={{
                  marginTop: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button>Play Solo</Button>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
