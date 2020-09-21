import React from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import appStyles from "../../../App.module.css";
import styles from "../Battle.module.css";

const { optionCard } = styles;
const { title, buttonCenter } = appStyles;

export default function BattleCreateRoom(props) {
  return (
    <Col className={optionCard}>
      <h2 className={title}>{props.title}</h2>
      <Link to={`/battle/${props.name}`}>
        <div className={buttonCenter}>
          <Button variant="info">{props.buttonText}</Button>
        </div>
      </Link>
    </Col>
  );
}
