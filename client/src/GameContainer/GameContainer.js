import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import LabelButton from "./LabelButton";

function GameContainer() {

  const [labelToggle, setLabelToggle] = useState(false)


  return (
    <div className="game-container">
      <ChessBoard labelToggle={labelToggle}/>
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
    </div>
    
  );
}

export default GameContainer;