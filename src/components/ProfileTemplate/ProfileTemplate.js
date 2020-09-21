import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import appStyles from "../../App.module.css";

export default function ProfileTemplate({
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
}) {
  const { title: titleStyle } = appStyles;

  return (
    <Container>
      <Row>
        <h1 className={titleStyle}>{title}</h1>
      </Row>
      <Row>
        <Col>
          <h2>{name}</h2>
          <img
            style={{
              display: "block",
              width: "-webkit-fill-available",
              maxWidth: "420px",
              maxHeight: "420px",
            }}
            src={imageUrl}
          ></img>
          <p>account type:{accountType}</p>
          <p>about me: </p>
          {description}
        </Col>

        {setTitle && setImageUrl && setAboutMe && (
          <Col>
            <h2 className={titleStyle}>Your edit page</h2>
            <div style={{ marginTop: "1rem" }}>
              <label>title:</label>
              <br></br>
              <input
                type="url"
                value={titleState}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label>image url:</label>
              <br></br>
              <input
                type="url"
                value={imageUrlState}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label>about me:</label>

              <textarea
                type="textbox"
                rows="8"
                cols="60"
                style={{ width: "-webkit-fill-available" }}
                value={aboutMe}
                onChange={(e) => {
                  setAboutMe(e.target.value);
                }}
              />
            </div>
          </Col>
        )}
      </Row>
      <Row></Row>
    </Container>
  );
}
