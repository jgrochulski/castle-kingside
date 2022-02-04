import Row from "./Row.js";
// import BlackRow from "./BlackRow.js";


function ChessBoard() {

  let grid = [];
  let toggle = false;

  for (let i = 0; i < 8; i++) {
    grid.push(<Row toggle={toggle} key={i} y={8 - i} />)
    toggle = !toggle;
  }

  return (
    <div className="chess-board">
      {grid}
    </div>
  );
}

export default ChessBoard;