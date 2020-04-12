import React from 'react';

const MonthList = (props) => {
  const months = props.data.map((data) => {
    return (
      <td
        key={data}
        className="calendar-month"
      >
        <span>{data}</span>
      </td>
    );
  });
  const rows = [];
  let cells = [];

  months.forEach((row, i) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
  });

  rows.push(cells);

  return (
    <table className="calendar-month">
      <thead>
        <tr>
          <th colSpan="4">Select a Month</th>
        </tr>
      </thead>
      <tbody>{rows.map((d) => <tr>{d}</tr>)}</tbody>
    </table>
  );
};
export default MonthList;
