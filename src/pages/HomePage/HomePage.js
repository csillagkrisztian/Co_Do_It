import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherNames } from "../../store/user/actions";
import { selectTeacherNames, selectUser } from "../../store/user/selectors";
import TitleCard from "./components/TitleCard";
// Styles
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import { containerBackground } from "../../style/containerBackground";
import { imageCenter } from "../../style/imageCenter";
import { titleStyle } from "../../style/titleStyle";

// Images
import title from "../../images/title.gif";
import battleRoom from "../../images/battlePicture.png";
import practiceRoom from "../../images/practicePicture-export.png";
import classRoom from "../../images/classroomPicture.png";
import styles from "./HomePage.module.css";

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

  const { titleCard, homepageTitle } = styles;

  return (
    <div>
      <Container
        style={{ ...containerBackground, height: "auto" }}
        className="homepage-container"
      >
        <Row className={homepageTitle}>
          <img
            style={{ ...imageCenter, width: "100%", maxWidth: "650px" }}
            src={title}
          ></img>
        </Row>
        <Row className="homepage-title-cards">
          <Col className={titleCard}>
            <TitleCard
              title={"Battle With Friends"}
              roomImage={battleRoom}
              buttonText={"Let's go battle"}
              link={"/battle"}
              user={user}
            />
          </Col>
          <Col className={titleCard}>
            <h2 style={titleStyle}>Join a Classroom</h2>
            <img src={classRoom} style={imageCenter} />
            <Form
              className="classroom-form"
              style={{ ...titleStyle, marginTop: "0" }}
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
                <Link to={"/login"}>
                  <p style={titleStyle}>Log in to use this feature</p>
                </Link>
              )}
              {allTeachers.includes(teacher) && (
                <Link to={`/classroom/${teacher}`}>
                  <Button variant="info">Submit</Button>
                </Link>
              )}
            </Form>
          </Col>

          <Col className={titleCard}>
            <TitleCard
              title={"Practice Playground"}
              roomImage={practiceRoom}
              buttonText={"Play Solo"}
              link={"/playground"}
              user={user}
              authorized={true}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
