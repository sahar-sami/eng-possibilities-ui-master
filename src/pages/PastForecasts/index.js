import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "./style.css";


const PastForecasts = () => {
  let tbl;
  if (localStorage.getItem("past_forecasts")) {
    const pastForecasts = JSON.parse(localStorage.getItem("past_forecasts"));
    console.log(pastForecasts);
    const categories = Object.keys(pastForecasts[0].allocations);
    const headers = ["#"].concat(categories);
    headers.push("10 Year Growth");
    const tableHeaders = <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>;
    var body = [];
    for (var i = 0; i < pastForecasts.length; i++) {
      var allocations = pastForecasts[i].allocations;
      var row = categories.map((category, index) => <td key={index}>{allocations[category]}%</td>);
      row = [<td key={-1}>{i + 1}</td>].concat(row);
      row.push(<td key={-2}>${pastForecasts[i].growth[9].toFixed(2)}</td>)
      body.push(<tr key={i}>{row}</tr>);
    }
    tbl = <Table><thead>{tableHeaders}</thead><tbody>{body}</tbody></Table>
  }
  else {
    tbl = <p>No forecasts made yet. Forecast an investment to see it here!</p>
  }

  return (
    <div className="past-div">
      <h3>Past Forecasts</h3>
      {tbl}
      <Button onClick={() => { localStorage.clear(); window.location.reload(); }}>Clear Past Forecasts</Button>
    </div>
  )
}

export default withRouter(PastForecasts);