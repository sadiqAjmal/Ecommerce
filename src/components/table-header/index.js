import React from "react";
function TableHeader(props) {
  const { titles} = props;

  return (
        <thead className="table-secondary" >
          <tr>
            {titles.map((title, index) => (
              <th className="text-center" key={index}>{title}</th>
            ))}
          </tr>
        </thead>
  );
}

export default TableHeader;
