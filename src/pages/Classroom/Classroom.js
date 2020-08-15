import React from "react";
import { useParams } from "react-router-dom";

export default function Classroom() {
  const params = useParams() || "nothing";
  console.log(params);
  return <div>{params.id}</div>;
}
