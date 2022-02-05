import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import LabelButton from "./LabelButton";
import TurnIndicator from "./TurnIndicator";
import History from "./History";

function GameContainer() {

  const [labelToggle, setLabelToggle] = useState(false)
  const [turn, setTurn] = useState('white')
  const [history, setHistory] = useState([])
  const [turnNum, setTurnNum] = useState(1)
  const [numberedHistory, setNumberedHistory] = useState([])






  return (
    <div className="game-container">
      <TurnIndicator turn={turn}/>
      <ChessBoard 
        labelToggle={labelToggle} 
        turn={turn} 
        setTurn={setTurn} 
        setHistory={setHistory} 
        history={history}
        turnNum={turnNum}
        setTurnNum={setTurnNum}
        numberedHistory={numberedHistory}
        setNumberedHistory={setNumberedHistory}/>
      <History numberedHistory={numberedHistory}/>
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
    </div>
    
  );
}

export default GameContainer;