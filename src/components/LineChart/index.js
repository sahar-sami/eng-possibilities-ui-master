import React from "react";
import { Line } from "react-chartjs-2";
import "./style.css";

const data = {
  labels: [
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ],
  datasets: [
    {
      label: "Investment Growth",
      data: [
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
      ],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
      // to draw a straight line
      lineTension: 0,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  animation: { duration: 2000 },
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: false,
          labelString: "Amount",
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return "$" + value;
          },
        },
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Year",
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        let label = "Amount";
        if (label) {
          label += ": $";
        }
        // rounds value to 2 decimal places
        label += Math.round(tooltipItem.yLabel * 100) / 100;
        return label;
      },
    },
  },
};

const LineChart = () => {
  return (
    <div className="chart-div">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
