import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import appStyles from "../../../App.module.css";
import { getTeacherNames } from "../../../store/user/actions";
import { selectTeacherNames } from "../../../store/user/selectors";
import homePageStyles from "../HomePage.module.css";

export default function TitleCardWithInput(props) {
  const [teacher, setTeacher] = useState("");

  useEffect(() => {
    dispatch(getTeacherNames());
    return () => {
      setTeacher("");
    };
  }, []);

  const dispatch = useDispatch();
  const allTeachers = useSelector(selectTeacherNames);

  const { user, image, title, buttonText } = props;
  const { title: titleStyle, imageCenter } = appStyles;
  const { classRoomForm } = homePageStyles;
  return (
    <>
      <h2 className={titleStyle}>{title}</h2>
      <img src={image} className={imageCenter} />
      <Form className={classRoomForm}>
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
            <p className={titleStyle}>Log in to use this feature</p>
          </Link>
        )}
        {allTeachers.includes(teacher) && (
          <Link to={`/classroom/${teacher}`}>
            <Button variant="info">{buttonText}</Button>
          </Link>
        )}
      </Form>
    </>
  );
}
