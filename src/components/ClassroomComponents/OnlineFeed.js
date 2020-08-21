import React from "react";
import { profileIconStyle } from "../../style/profileIconStyle";
import { Col } from "react-bootstrap";

export default function OnlineFeed(props) {
  const { roomMembers, findDoneMember } = props;
  return (
    <Col className="col-2">
      {roomMembers.map((member, id) => (
        <p key={id}>
          <img
            src={member.imageUrl}
            style={{ ...profileIconStyle, marginRight: "1rem" }}
          ></img>
          {member.name}
          {findDoneMember && (findDoneMember(member) ? "٭" : "")}
        </p>
      ))}
    </Col>
  );
}
