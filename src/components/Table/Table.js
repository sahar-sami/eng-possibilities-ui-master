import React from 'react';
import TableRow from '../../components/TableRow/TableRow.js';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

const InputTable = props => {
  const entries = props.entries;
  const [error_text, setErrorText] = useState('');

  var rows = [];
  for (var i = 0; i < entries.length; i++) {
    rows.push(<TableRow key={i} id={i} category={entries[i].category} allocation={entries[i].allocation} max={entries[i].max} />)
  }

  const checkValid = () => {
    var sum = 0;
    var allocs = document.getElementsByClassName("allocation");
    console.log(allocs.length);
    for (var i = 0; i < allocs.length; i++) {
      var percent = parseFloat(allocs[i].value);
      console.log(percent);
      if (percent > entries[i].max) {
        var category = entries[i].category;
        var text = "Your allocation for " + category + " exceeds the limit of " + entries[i].max;
        setErrorText(text);
        return;
      }
      sum += percent
    }
    if (sum !== 100) {
      setErrorText("Total percent is not 100. Please edit allocations.");
    }
    else {
      setErrorText("");
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
      <div><button onClick={() => checkValid()}>Check Valid</button><p>{error_text}</p></div>
    </>
  );
};

export default InputTable;