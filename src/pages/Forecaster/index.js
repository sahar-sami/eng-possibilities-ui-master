import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../components/LineChart";
import InputTable from "../../components/Table/Table.js";

const ForecasterHome = () => {
  const dispatch = useDispatch();
  const allocations = useSelector((state) => state.allocations);
  const [investmentGrowth, setInvestmentGrowth] = useState([]);

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
    }

    fetchData();
  }, [dispatch]);

  const checkAllocations = () => {
    console.log(allocations);

    // check whether all add up to 100%
    // true, get calculated investment growth to update graph
    async function updateAllocations() {
      const response = await fetch("http://localhost:8080/api/v1/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          // body: JSON.stringify(allocations),
          body: allocations,
        },
      });

      const data = await response.json();
      console.log("dt", data);

      setInvestmentGrowth(data);
    }

    updateAllocations();
    // false, display error
  };

  return (
    <>
      <div>
        <h3>Investment Forecaster</h3>
        <p>
          This page allows you to customize your investments and view the
          potential growth of <b>$10,000</b> over a period of <b>10 years.</b>
        </p>

        <LineChart
          investmentGrowth={[
            10000.0,
            10050.3,
            12125.35,
            12089.99,
            13009.2,
            13000.0,
            14850.6,
            17098.245,
            17980.4353,
            19871.0,
          ]}
        />

        <InputTable
          entries={[
            { category: "Energy", max: 5, allocation: 0 },
            { category: "Technology", max: 6, allocation: 0 },
            { category: "Financial Services", max: 4, allocation: 0 },
          ]}
        />

        <Button
          variant="outline-dark"
          style={{ float: "right" }}
          onClick={checkAllocations}
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default ForecasterHome;
