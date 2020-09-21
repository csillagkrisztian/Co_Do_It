import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherNames } from "../../store/user/actions";
import { selectTeacherNames, selectUser } from "../../store/user/selectors";
import TitleCard from "./components/TitleCard";

// Styles
import { Container, Row, Col, Form, FormGroup, Button } from "react-bootstrap";
import styles from "./HomePage.module.css";

// Images
import titleImage from "../../images/title.gif";
import battleRoom from "../../images/battlePicture.png";
import practiceRoom from "../../images/practicePicture-export.png";
import classRoomImage from "../../images/classroomPicture.png";
import TitleCardWithInput from "./components/TitleCardWithInput";

export default function HomePage() {
  const user = useSelector(selectUser);

  const { titleCard, homepageTitle, container, image } = styles;

  return (
    <div>
      <Container className={container}>
        <Row className={homepageTitle}>
          <img className={image} src={titleImage}></img>
        </Row>
        <Row className="homepage-title-cards">
          <Col className={titleCard}>
            <TitleCard
              title={"Battle Friends"}
              image={battleRoom}
              buttonText={"Let's go battle"}
              link={"/battle"}
              user={user}
            />
          </Col>
          <Col className={titleCard}>
            <TitleCardWithInput
              title={"Join a Classroom"}
              user={user}
              image={classRoomImage}
              buttonText={"Join Class"}
            ></TitleCardWithInput>
          </Col>

          <Col className={titleCard}>
            <TitleCard
              title={"Practice Room"}
              image={practiceRoom}
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
