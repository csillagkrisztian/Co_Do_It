import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import styles from "./AboutPage.module.css";
import appStyles from "../../App.module.css";
import profileImage from "../../images/devProfile.png";

export default function AboutPage() {
  const { picture, text, description, footer, contact } = styles;
  const { containerBackground, title, linkColor } = appStyles;
  return (
    <Container className={containerBackground}>
      <Row>
        <Col xs={12} sm={5} lg={4}>
          <img className={picture} src={profileImage}></img>
          <p className={text}>
            {
              '"My two key attributes are basically my motto, which is: Ruthless Determination and Compassion"'
            }
          </p>
        </Col>
        <Col>
          <h1 className={title}>Csillag Krisztián</h1>
          <p className={text}>
            {"Creator of Co_Do_It and Co-Creator of Codefolio"}
          </p>
          <p className={description}>
            {
              "As a teacher I wanted to combine my old passion with the newly discovered one, which is web-development. The goal of Co_Do_It is to give teachers the power of interactivity. Traditional teaching tends to create an environment where teachers become a talking head, but now with the help of Co_Do_It they can make a best of both world situation, so that detailed explanation does not sacrifice active participation and engagement of the student."
            }
          </p>
        </Col>
      </Row>
      <Row className={footer}>
        <Col>
          <div className={contact}>Feel free to contact me at: </div>

          <div className={contact}>Phone: +31642163812</div>

          <div className={contact}>E-mail: krisztian.csillag9362@gmail.com</div>

          <div className={contact}>
            LinkedIn:{" "}
            <a
              className={linkColor}
              href={`https://www.linkedin.com/in/krisztian-csillag/`}
              target="_blank"
            >
              https://www.linkedin.com/in/krisztian-csillag/
            </a>
          </div>
          <div className={contact}>
            GitHub:{" "}
            <a
              className={linkColor}
              href={`https://github.com/csillagkrisztian/Co_Do_It`}
              target="_blank"
            >
              https://github.com/csillagkrisztian/Co_Do_It
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
