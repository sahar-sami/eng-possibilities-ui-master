import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";


const PastForecasts = () => {
  const pastForecasts = JSON.parse(localStorage.getItem("past_forecasts"));
  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "400px" }}>
      <Button onClick={() => { localStorage.clear() }}>Clear Past Forecasts</Button>c
    </div>
  )
}

export default withRouter(PastForecasts);