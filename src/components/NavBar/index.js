import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar bg="light">
          <Navbar.Brand href="#">DePo</Navbar.Brand>
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
