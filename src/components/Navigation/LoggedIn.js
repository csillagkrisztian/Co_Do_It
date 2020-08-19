import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";
import { NavbarBrand } from "react-bootstrap";
import { profileIconStyle } from "../../style/profileIconStyle";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      {user.accountType === ("teacher" || "admin") && (
        <>
          <NavbarItem path="/create" linkText="Create Exercise" />
          <NavbarItem path={`/classroom/${user.name}`} linkText="Classroom" />
        </>
      )}
      <NavbarItem path={"/battle/"} linkText="Battle"></NavbarItem>
      <NavbarItem path={"/myprofile"} linkText="My Profile"></NavbarItem>
      <NavbarBrand>
        <img
          src={user.imageUrl}
          style={{
            ...profileIconStyle,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </NavbarBrand>
      <Nav.Item style={{ color: "white", padding: ".5rem 1rem" }}>
        {user.name}
      </Nav.Item>

      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
