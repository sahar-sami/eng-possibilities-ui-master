import React, { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import InputTable from "../../components/Table/Table.js";

const ForecasterHome = () => {
  const [categoryData, setCategoryData] = useState([]);
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
      console.log(data);
      setCategoryData(data);
    }

    fetchData();
  }, []);

  const pushAllocations = async (toSend) => {
    console.log(JSON.stringify(toSend));
    const response = await fetch("http://localhost:8080/api/v1/forecast", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "body": JSON.stringify(toSend)
      },
    });

    const data = await response.json();

    setInvestmentGrowth(data);
    console.log(investmentGrowth);
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
          investmentGrowth={investmentGrowth}
        />

        <InputTable
          entries={categoryData}
          pushAllocations={pushAllocations}
        />
      </div>
    </>
  );
};

export default ForecasterHome;
