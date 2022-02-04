import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import LabelButton from "./LabelButton";
import TurnIndicator from "./TurnIndicator";

function GameContainer() {

  const [labelToggle, setLabelToggle] = useState(false)
  const [turn, setTurn] = useState('white')



  return (
    <div className="game-container">
      <TurnIndicator turn={turn}/>
      <ChessBoard labelToggle={labelToggle} turn={turn} setTurn={setTurn} />
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
    </div>
    
  );
}

export default GameContainer;