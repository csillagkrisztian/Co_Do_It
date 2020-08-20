import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import blank from "../../images/blank.png";
import { titleStyle } from "../../style/titleStyle";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherNames } from "../../store/user/actions";
import { selectTeacherNames, selectUser } from "../../store/user/selectors";
import classRoom from "../../images/classroomPicture.png";
import title from "../../images/title.gif";
import battleRoom from "../../images/battlePicture.png";
import practiceRoom from "../../images/practicePicture.png";

export default function HomePage() {
  const [teacher, setTeacher] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeacherNames());
    return () => {
      setTeacher("");
    };
  }, []);

  const allTeachers = useSelector(selectTeacherNames);
  const user = useSelector(selectUser);

  return (
    <div>
      <Container style={{ justifyContent: "center" }}>
        <Row style={{ background: "#373f51" }}>
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            src={title}
          ></img>
        </Row>
        <Row>
          <Col className="title-card">
            <div>
              <h2 style={titleStyle}>Battle with Friends</h2>
              <img
                src={battleRoom}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              {user.accountType !== "guest" ? (
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
              ) : (
                <p style={titleStyle}>Log in to use this feature</p>
              )}
            </div>
          </Col>
          <Col className="title-card">
            <h2 style={titleStyle}>Join a Classroom</h2>
            <img
              src={classRoom}
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
              {user.accountType !== "guest" ? (
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
              ) : (
                <p style={{ marginTop: "2rem" }}>Log in to use this feature</p>
              )}
              {allTeachers.includes(teacher) && (
                <Link to={`/classroom/${teacher}`}>
                  <Button>Submit</Button>
                </Link>
              )}
            </Form>
          </Col>

          <Col className="title-card">
            <h2 style={titleStyle}>Practice Playground</h2>
            <img
              src={practiceRoom}
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
