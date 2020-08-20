import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./spinner.css";
import loadingAnimation from "../../images/Loading.gif";

export default function Loading() {
  return (
    <div className="loading_spinner">
      <img src={loadingAnimation}></img>
    </div>
  );
}
