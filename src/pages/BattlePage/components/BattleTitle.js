import React from "react";
import styles from "../Battle.module.css";

export default function BattleTitle(props) {
  const { title } = styles;
  return (
    <>
      <h1 className={title}>{props.title}</h1>
    </>
  );
}
