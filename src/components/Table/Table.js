import React from 'react';
import TableRow from '../../components/TableRow/TableRow.js';
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

const InputTable = (props) => {
  const entries = props.entries;
  const [error_text, setErrorText] = useState('');

  var rows = [];
  for (var i = 0; i < entries.length; i++) {
    rows.push(<TableRow key={i} id={i} category={entries[i].category} allocation={entries[i].minimum} min={entries[i].minimum} />)
  }

  const checkValid = () => {
    var toSend = {};
    var sum = 0;
    var allocs = document.getElementsByClassName("allocation");
    for (var i = 0; i < allocs.length; i++) {
      var percent = parseFloat(allocs[i].value);
      var category = entries[i].category;
      if (percent < entries[i].min) {
        var text = "Your allocation for " + category + " is less than the minimum of " + entries[i].max + "%.";
        setErrorText(text);
        return;
      }
      sum += percent;
      toSend[category] = percent;
    }
    if (sum < 100) {
      setErrorText("Total percent is less than 100. Please edit allocations.");
    }
    else if (sum > 100) {
      setErrorText("Total percent is greater than 100. Please edit allocations.");
    }
    else {
      setErrorText("");
      props.pushAllocations(toSend);
    }
  }

  const resetAllocations = () => {
    var inputs = document.getElementsByClassName("allocation");
    for (var i = 0; i < rows.length; i++) {
      inputs[i].value = parseFloat(rows[i].props.min).toFixed(2);
    }
  }

  return (
    <>
      <Table><thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Allocation</th>
          <th>Amount</th>
        </tr>
      </thead>
        <tbody>
          {rows}
        </tbody></Table>
      <Table>
        <tbody>
          <tr>
            <th><Button onClick={() => checkValid()}>Update Forecast</Button></th>
            <th><p>{error_text}</p></th>
            <th><Button onClick={() => resetAllocations()}>Reset</Button></th>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default InputTable;
