import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherNames } from "../../store/user/actions";
import { selectTeacherNames, selectUser } from "../../store/user/selectors";
import TitleCard from "../../components/HomePageComponents/TitleCard";
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
      <Container
        style={{ ...containerBackground, height: "auto" }}
        className="homepage-container"
      >
        <Row className="homepage-title">
          <img style={imageCenter} src={title}></img>
        </Row>
        <Row className="homepage-title-cards">
          <Col className="title-card">
            <TitleCard
              roomImage={battleRoom}
              buttonText={"Let's go battle"}
              link={"/battle"}
              user={user}
            />
          </Col>
          <Col className="title-card">
            <h2 style={titleStyle}>Join a Classroom</h2>
            <img src={classRoom} style={imageCenter} />
            <Form className="classroom-form" style={titleStyle}>
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
                <p style={titleStyle}>Log in to use this feature</p>
              )}
              {allTeachers.includes(teacher) && (
                <Link to={`/classroom/${teacher}`}>
                  <Button variant="info">Submit</Button>
                </Link>
              )}
            </Form>
          </Col>

          <Col className="title-card">
            <TitleCard
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
