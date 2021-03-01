import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../components/LineChart";
import InputTable from "../../components/Table/Table.js";
import Table from "react-bootstrap/Table";

const ForecasterHome = () => {
  const dispatch = useDispatch();
  const allocations = useSelector((state) => state.allocations);
  const categoryData = useSelector((state) => state.categories);
  const [investmentGrowth, setInvestmentGrowth] = useState([]);
  const [errorText, setErrorText] = useState("");

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

  const checkValid = (allocations) => {
    var sum = 0;
    var i = 0
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
      setErrorText("Total percent is " + sum + "%. Please edit your allocations.");
    }
    else {
      setErrorText("");
      checkAllocations();
    }
  };

  const checkAllocations = () => {
    console.log(allocations)
    const request = { "request": allocations };

    async function updateAllocations() {
      const response = await fetch("http://localhost:8080/api/v1/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
        body: JSON.stringify(request)
      });

      const data = await response.json();

      setInvestmentGrowth(data["response"]);
    }

    updateAllocations();
  };

  const resetAllocations = () => {
    // for (var i = 0; i < categoryData.length; i++) {
    //   dispatch({
    //     type: "UPDATE_ALLOCATION",
    //     payload: { category: categoryData[i].category, allocation: categoryData[i].minimum },
    //   });
    // }
    window.location.reload();
  };

  return (
    <>
      <div>
        <h3>Investment Forecaster</h3>
        <p>
          This page allows you to customize your investments and view the
          potential growth of <b>$10,000</b> over a period of <b>10 years.</b>
        </p>

        <LineChart investmentGrowth={investmentGrowth} />

        <InputTable />
        <Table>
          <tbody>
            <tr>
              <th>
                <Button onClick={() => checkValid(allocations)}>
                  Update Forecast
                </Button>
              </th>
              <th>
                <p>{errorText}</p>
              </th>
              <th
                style={{
                  textAlign: "right",
                }}
              >
                <Button onClick={() => resetAllocations()}>Reset</Button>
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ForecasterHome;
