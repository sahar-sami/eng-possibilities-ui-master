import React from 'react';
import TableRow from '../../components/TableRow/TableRow.js';
import Table from 'react-bootstrap/Table';

const InputTable = props => {
  const entries = props.entries;

  var rows = [];
  console.log(entries)
  for (var i = 0; i < entries.length; i++) {
    rows.push(<TableRow key={i} category={entries[i].category} allocation={entries[i].allocation} max={entries[i].max} />)
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
    </>
  );
};

export default InputTable;