import React from "react";
import InputTable from '../../components/Table/Table.js';

const ForecasterHome = () => {
  return (
    <>
      <div>
        <h3>Investment Forecaster</h3>
        <p>This page allows you to customize your investments and view the potential growth of <b>$10,000</b> over a period of <b>10 years.</b></p>
        <InputTable entries={[{ 'category': 'Energy', 'max': 5, 'allocation': 0 },
        { 'category': 'Technology', 'max': 6, 'allocation': 0 },
        { 'category': 'Financial Services', 'max': 4, 'allocation': 0 }]} />
      </div>
    </>
  );
};

export default ForecasterHome;
