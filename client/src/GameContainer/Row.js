import Square from "./Square";

function Row({ toggle, y }) {

  let row = [];
  // let toggle = false;



  for (let i = 0; i < 8; i++) {
    row.push(<Square color={toggle ? "black-square" : "white-square"} key={i} code_x={i+97} y={y}/>)
    toggle = !toggle;
  }

  return (
    <div className="board-row">
      {row}
    </div>
  );
}

export default Row;