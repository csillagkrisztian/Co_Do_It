import React from "react";
import { useDispatch } from "react-redux";
import styles from "./ClickSuccessButton.module.css";

export default function ClickSuccessButton(props) {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    if (props.resetState) {
      dispatch(props.resetState());
    }
    if (props.neededAction) {
      dispatch(props.neededAction());
    }
    if (props.neededFunction) {
      props.neededFunction();
    }
  };

  const { buttonCenter } = styles;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0px",
      }}
    >
      <button className={buttonCenter} onClick={onClickHandler}>
        {props.buttonText}
      </button>
    </div>
  );
}
