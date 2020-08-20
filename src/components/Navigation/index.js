import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import NavbarItem from "./NavbarItem";
import brandLogo from "../../images/brand.png";

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar className="color-nav" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img
          style={{ width: "36px", height: "36px", marginRight: "10px" }}
          src={brandLogo}
        ></img>
        Co_Do_It
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav fill>{loginLogoutControls}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
