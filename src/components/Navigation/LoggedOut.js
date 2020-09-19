import React from "react";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem path={"/about"} linkText="About"></NavbarItem>
      <NavbarItem path="/login" linkText="Login" />
    </>
  );
}
