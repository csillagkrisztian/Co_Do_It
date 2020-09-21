import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";
import { NavbarBrand } from "react-bootstrap";
import styles from "./LoggedIn.module.css";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { profileIcon } = styles;
  return (
    <>
      {user.accountType === ("teacher" || "admin") && (
        <>
          <NavbarItem path="/create" linkText="Create Exercise" />
          <NavbarItem path={`/classroom/${user.name}`} linkText="Classroom" />
        </>
      )}
      <NavbarItem path={"/playground"} linkText="Practice"></NavbarItem>
      <NavbarItem path={"/battle"} linkText="Battle"></NavbarItem>
      <NavbarItem path={"/about"} linkText="About"></NavbarItem>
      <NavbarItem path={"/myprofile"} linkText="My Profile"></NavbarItem>

      <NavbarBrand style={{ margin: 0 }}>
        <img src={user.imageUrl} className={profileIcon} />
      </NavbarBrand>
      <Nav.Item style={{ color: "white", padding: ".5rem 1rem" }}>
        {user.name}
      </Nav.Item>

      <Button variant="info" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </>
  );
}
