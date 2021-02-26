import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NumericInput from "react-numeric-input";

const TableRow = (props) => {
  const dispatch = useDispatch();
  const [alloc, setAlloc] = useState(props.allocation);

  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>{props.category}</td>
        <td>
          <NumericInput
            step={0.1}
            precision={2}
            min={0}
            max={props.max}
            value={alloc}
            onChange={(value) => {
              setAlloc(value);
              dispatch({
                type: "UPDATE_ALLOCATION",
                payload: { category: props.category, allocation: value },
              });
            }}
          />
          %
        </td>
        <td>{((alloc / 100) * 10000).toFixed(2)}</td>
      </tr>
    </>
  );
};

export default TableRow;
