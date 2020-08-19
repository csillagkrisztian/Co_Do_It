import React from "react";
import { Container, Col, Row } from "react-bootstrap";

export default function ProfileTemplate(props) {
  const {
    title,
    name,
    accountType,
    description,
    setAboutMe,
    aboutMe,
    setImageUrl,
    imageUrl,
    imageUrlState,
    setTitle,
    titleState,
  } = props;

  return (
    <Container>
      <Row>
        <h1>{title}</h1>
      </Row>
      <Row>
        <Col>
          <p>username:{name}</p>
          <p>account type:{accountType}</p>
          <p>about me: </p>
          {description}
        </Col>
        <Col>
          <img src={imageUrl}></img>
        </Col>
      </Row>
      <Row>
        <Col>
          {setAboutMe && (
            <>
              <label>about me:</label>
              <br></br>
              <textarea
                type="textbox"
                rows="8"
                cols="60"
                value={aboutMe}
                onChange={(e) => {
                  setAboutMe(e.target.value);
                }}
              />
            </>
          )}
        </Col>
        <Col>
          {setTitle && (
            <>
              <label>title:</label>
              <br></br>
              <input
                type="url"
                value={titleState}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </>
          )}
          {setImageUrl && (
            <>
              <label>image url:</label>
              <br></br>
              <input
                type="url"
                value={imageUrlState}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              ></input>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
