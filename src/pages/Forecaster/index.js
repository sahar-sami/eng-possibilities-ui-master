import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../components/LineChart";
import InputTable from "../../components/Table/Table.js";
import Table from "react-bootstrap/Table";
import { withRouter } from "react-router-dom";
import "./style.css";

const ForecasterHome = () => {
  const dispatch = useDispatch();
  const allocations = useSelector((state) => state.allocations);
  const categoryData = useSelector((state) => state.categories);
  const [investmentGrowth, setInvestmentGrowth] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [optimalDisplay, setOptimalDisplay] = useState("");

  useEffect(() => {
    // fetch investment categories data after first render
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/v1/forecast", {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      });

      const data = await response.json();

      // update store
      dispatch({ type: "LOAD_CATEGORIES", payload: { categories: data } });
      dispatch({
        type: "LOAD_ALLOCATIONS",
        payload: { categories: data },
      });
      console.log(data.map((data, index) => { return data }));
    }

    fetchData();
  }, [dispatch]);


  const checkValid = (allocations) => {
    var sum = 0;
    var i = 0;
    for (const [category, allocation] of Object.entries(allocations)) {
      if (allocation < categoryData[i].minimum) {
        let text = `Your allocation for ${category} is less than the minimum of ${categoryData[i].minimum}%.`;
        setErrorText(text);
        return;
      }
      sum += allocation;
      i += 1;
    }
    if (sum !== 100) {
      setErrorText(
        "Total percent is " + sum + "%. Please edit your allocations."
      );
    } else {
      setErrorText("");
      checkAllocations();
    }
  };

  const checkAllocations = () => {
    const request = { request: allocations };

    async function updateAllocations() {
      const response = await fetch("http://localhost:8080/api/v1/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      setInvestmentGrowth(data["response"]);
      var new_forecast = { "allocations": allocations, "growth": data["response"] }
      if (localStorage.past_forecasts) {
        var current_history = JSON.parse(localStorage.getItem("past_forecasts"));
        current_history = current_history.concat([new_forecast]);
        localStorage.setItem("past_forecasts", JSON.stringify(current_history));
      }
      else {
        localStorage.setItem("past_forecasts", JSON.stringify([new_forecast]));
      }
      console.log(localStorage.getItem("past_forecasts"));
    }

    updateAllocations();
    setOptimalDisplay("");
  };

  const resetAllocations = () => {
    window.location.reload()
  }

  const getOptimalAllocations = () => {
    async function optimalAllocations() {
      const response = await fetch("http://localhost:8080/api/v1/optimal", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
      });

      const data = await response.json();

      const growth = data["growth"];
      const optimalAllocs = data["allocations"];
      const categories = Object.keys(allocations);
      var displayText = "Optimal Forecast Added! ";
      for (const category of categories) {
        displayText += category + ": " + optimalAllocs[category] + "% ";
      } setOptimalDisplay(displayText);
      var new_forecast = { "allocations": optimalAllocs, "growth": growth }
      if (localStorage.past_forecasts) {
        var current_history = JSON.parse(localStorage.getItem("past_forecasts"));
        current_history = current_history.concat([new_forecast]);
        localStorage.setItem("past_forecasts", JSON.stringify(current_history));
      }
      else {
        localStorage.setItem("past_forecasts", JSON.stringify([new_forecast]));
      }
      setInvestmentGrowth(growth);
    }
    optimalAllocations();
  }

  return (
    <>
      <div className="forecaster-div">
        <h3>Investment Forecaster</h3>
        <p>
          This page allows you to customize your investments and view the
          potential growth of <b>$10,000</b> over a period of <b>10 years.</b>
        </p>

        <LineChart investmentGrowth={investmentGrowth} />

        <InputTable entries={categoryData} resetAllocations={resetAllocations} />
        <div style={{ display: 'inline-block', width: '100%' }}>
          <Button onClick={() => checkValid(allocations)}>Update Forecast</Button>
          <p>{errorText}</p></div>
        <div style={{ display: 'inline-block', width: '100%' }}>
          <Button onClick={() => getOptimalAllocations()}>Optimize</Button>
          <p>{optimalDisplay}</p></div>
        <div style={{ display: 'inline-block', float: 'right', width: '100%' }}>
          <Button onClick={() => resetAllocations()}>Reset</Button>
        </div>
      </div>
    </>
  );
};

export default withRouter(ForecasterHome);
