import React from "react";
import { useSelector } from "react-redux";
import TableRow from "../../components/TableRow/TableRow.js";
import Table from "react-bootstrap/Table";

const InputTable = () => {
  const entries = useSelector((state) => state.categories);

  let rows = [];
  for (let i = 0; i < entries.length; i++) {
    rows.push(
      <TableRow
        key={i}
        id={i + 1}
        category={entries[i].category}
        allocation={entries[i].minimum}
      />
    );
  }

  return (
    <>
      <Table striped style={{ marginTop: "10px", marginBottom: "0px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Allocation</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default InputTable;
