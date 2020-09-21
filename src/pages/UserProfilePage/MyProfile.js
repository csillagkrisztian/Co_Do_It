import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import ProfileTemplate from "../../components/ProfileTemplate/ProfileTemplate";
import { Button, Container, Row } from "react-bootstrap";

import appStyles from "../../App.module.css";
import { updateUserProfile } from "../../store/user/actions";
import Head from "../../components/Head";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  useEffect(() => {
    setAboutMe(user.description);
    setImageUrl(user.imageUrl);
    setTitle(user.title);
  }, [user]);

  const { containerBackground, buttonCenter } = appStyles;

  return (
    <Container className={containerBackground}>
      <Head page={"My Profile"} />
      <Row>
        <ProfileTemplate
          title={user.title}
          name={user.name}
          accountType={user.accountType}
          description={user.description}
          setAboutMe={setAboutMe}
          aboutMe={aboutMe || ""}
          setImageUrl={setImageUrl}
          imageUrl={user.imageUrl}
          imageUrlState={imageUrl || ""}
          setTitle={setTitle}
          titleState={title || ""}
        />
      </Row>
      <Row className={buttonCenter}>
        <Button
          className="btn-toolbar"
          onClick={() => {
            dispatch(updateUserProfile(user.id, title, imageUrl, aboutMe));
          }}
        >
          Submit Changes
        </Button>
      </Row>
    </Container>
  );
}
