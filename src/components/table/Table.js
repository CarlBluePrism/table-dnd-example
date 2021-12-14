import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledTh = styled.th`
  background-color: ${(props) => calcBackgroundColor(props.dragOver, props.dragged)};
  opacity: ${(props) => props.dragged && 0.8};
`;

const StyledTd = styled.td`
  background-color: ${(props) => calcBackgroundColor(props.dragOver, props.dragged)};
  opacity: ${(props) => props.dragged && 0.8};
`;

function calcBackgroundColor(dragOver, dragged) {
  if (dragged) return 'red';

  if (dragOver && !dragged) return 'blue';
}

export default function Table({ columns, data }) {
  const [cols, setCols] = React.useState(columns);
  const [rows, setRows] = React.useState(data);
  const [dragged, setDragged] = React.useState("");
  const [dragOver, setDragOver] = React.useState("");

  const handleDragStart = (event) => {
    const { id } = event.target;
    setDragged(id);
    const idx = cols.map((col) => col.accessor).indexOf(id);
    event.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (event) => event.preventDefault();

  const handleDragEnter = (event) => {
    const { id } = event.target;
    console.log(id)
    setDragOver(id);
  };

  const handleOnDrop = (event) => {
    const { id } = event.target;
    const droppedColIdx = cols.map((col) => col.accessor).indexOf(id);
    const draggedColIdx = event.dataTransfer.getData("colIdx");
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];
    setCols(tempCols);
    setDragOver("");
    setDragged("");
    event.preventDefault();
  };

  function handleRowDragEnter() {
    setDragOver("");
  }

  return (
    <table>
      <thead>
        <tr>
          {cols.map((col) => (
            <StyledTh
              id={col.accessor}
              key={col.accessor}
              draggable
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleOnDrop}
              onDragEnter={handleDragEnter}
              dragOver={dragOver === col.accessor}
              dragged={dragged === col.accessor}
            >
              {col.label}
            </StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {cols.map((col) => {
              return (
                <StyledTd
                  dragOver={dragOver === col.accessor}
                  dragged={dragged === col.accessor}
                  onDragEnter={handleRowDragEnter}
                >
                  {row[col.accessor]}
                </StyledTd>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
