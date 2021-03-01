import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

const NavBar = () => {
  return (
    <>
      <Navbar
        // override default padding
        style={{ padding: "10px 40px" }}
        className="nav-bar"
        variant="dark"
      >
        <Navbar.Brand
          // override default font size
          style={{ fontSize: "22px" }}
          className="brand-name"
          href="#"
        >
          DePo
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavBar;
