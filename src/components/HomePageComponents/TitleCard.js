import React from "react";
import { titleStyle } from "../../style/titleStyle";
import { imageCenter } from "../../style/imageCenter";
import { buttonCenter } from "../../style/buttonCenter";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function TitleCard(props) {
  let authorized = props.authorized;
  const { roomImage, buttonText, link, user } = props;
  return (
    <div>
      <h2 style={titleStyle}>Battle with Friends</h2>
      <img src={roomImage} style={imageCenter} />
      {authorized ? (
        <Link to={link}>
          <div style={buttonCenter}>
            <Button>{buttonText}</Button>
          </div>
        </Link>
      ) : user.accountType !== "guest" ? (
        <Link to={link}>
          <div style={buttonCenter}>
            <Button>{buttonText}</Button>
          </div>
        </Link>
      ) : (
        <p style={titleStyle}>Log in to use this feature</p>
      )}
    </div>
  );
}
