import React, { useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

const NavBar = () => {
  const [popupActive, setPopupActive] = useState(false);
  // popup refers to help text
  const togglePopup = () => {
    setPopupActive(!popupActive);
  };

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
            <Nav.Link href="/PastForecasts">Past Forecasts</Nav.Link>
          </Nav>
          <Nav className="popup" onClick={togglePopup}>
            <Nav.Link>Help</Nav.Link>
            <span
              className={`popup-text ${popupActive ? "show" : null}`}
              id="my-popup"
            >
              <b>Note:</b> The graph will not be visible until you allocate a
              total of 100% across all categories and click on the "Update
              Forecast" button.
            </span>
          </Nav>
        </Navbar>
      </BrowserRouter>
    </>
  );
};

export default NavBar;
