
function Square({ color, code_x, y }) {

  let x = String.fromCharCode(code_x)

  let id = `${x}${y}`

  let gameObj = {
    "a2": "pawn",
    "b2": "pawn",
    "c2": "pawn",
    "d2": "pawn",
    "e2": "pawn",
    "f2": "pawn",
    "g2": "pawn",
    // "h2": "pawn"
  }

  console.log(gameObj[id])

  return (
    <div className={color} tabIndex="0" id={id}>{id}
      {gameObj[id] === "pawn" ? <img src="./pawn.png" alt="pawn" /> : null}
    </div>
  );
}

export default Square;