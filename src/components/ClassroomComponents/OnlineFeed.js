import React from "react";
import { Col } from "react-bootstrap";
import styles from "../../App.module.css";

export default function OnlineFeed(props) {
  const { roomMembers, findDoneMember } = props;
  const { profileIcon } = styles;

  return (
    <Col className="col-2 mt-3">
      {roomMembers.map((member, id) => (
        <p style={{ margin: "0" }} key={id}>
          <img src={member.imageUrl} className={profileIcon}></img>
          {member.name}
          {findDoneMember && (findDoneMember(member) ? "٭" : "")}
        </p>
      ))}
    </Col>
  );
}
