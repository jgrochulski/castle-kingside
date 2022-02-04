// import React from "react"
import { useState } from "react"

function Square({ game, color, code_x, y, labelToggle, clickHolder, clickHandler }) {


  let x = String.fromCharCode(code_x)

  let id = `${x}${y}`

  let classes = `square ${color}`

  let style = id == clickHolder[0] ? { border: 'royalblue 4px solid' } : null


  return (
    <div className={classes} tabIndex="0" id={id} onClick={clickHandler} style={ style }>
      <div className="square-label" style={{ display: labelToggle ? 'block' : 'none' }}>{id}</div>
      {game[id] === "white-pawn" ? <img className="piece" src="./WhitePawn.png" alt="pawn" id={id}/> : null}
      {game[id] === "black-pawn" ? <img className="piece" src="./BlackPawn.png" alt="pawn" id={id}/> : null}

    </div>
  );
}

export default Square;