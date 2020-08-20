import React from "react";
import { useDispatch } from "react-redux";
import { buttonCenter } from "../style/buttonCenter";

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

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0px",
      }}
    >
      <button
        className="btn btn-success btn-lg"
        style={buttonCenter}
        onClick={onClickHandler}
      >
        {props.buttonText}
      </button>
    </div>
  );
}
