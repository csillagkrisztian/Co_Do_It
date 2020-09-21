import React from "react";
import { Helmet } from "react-helmet";

export default function Head({ page }) {
  return <Helmet title={`${page} | Co_Do_It`}></Helmet>;
}
