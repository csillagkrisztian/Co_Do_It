import React from "react";
import { useDispatch } from "react-redux";

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

  return <button onClick={onClickHandler}>{props.buttonText}</button>;
}
