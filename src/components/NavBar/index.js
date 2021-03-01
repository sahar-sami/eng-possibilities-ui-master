import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

const NavBar = () => {
  return (
    <>
      <BrowserRouter>
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
            <Nav.Link href="/">Forecast an Investment</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/PastForecasts">Past Forecasts</Nav.Link>
          </Nav>
        </Navbar>
      </BrowserRouter>

    </>
  );
};

export default NavBar;
