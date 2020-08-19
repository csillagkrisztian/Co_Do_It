import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import blank from "../../images/blank.png";
import { titleStyle } from "../../style/titleStyle";

export default function HomePage() {
  const [teacher, setTeacher] = useState("");

  return (
    <div>
      <Container style={{ justifyContent: "center" }}>
        <Row>
          <h1 style={{ ...titleStyle, marginBottom: "3rem" }}>
            Welcome to Co_Do_It!
          </h1>
        </Row>
        <Row>
          <Col className="title-card">
            <div>
              <h2 style={titleStyle}>Battle with Friends</h2>
              <img
                src={blank}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
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
            </div>
          </Col>
          <Col className="title-card">
            <h2 style={titleStyle}>Join a Classroom</h2>
            <img
              src={blank}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Form
              style={{
                ...titleStyle,
                marginTop: "1.1rem",
                width: "78%",
                marginBottom: "1.1rem",
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

          <Col className="title-card">
            <h2 style={titleStyle}>Practice Playground</h2>
            <img
              src={blank}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
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
