import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import LabelButton from "./LabelButton";
import TurnIndicator from "./TurnIndicator";
import History from "./History";
import { Redirect } from "react-router-dom";


function GameContainer({ user, setUser, game, setGame }) {

  const [labelToggle, setLabelToggle] = useState(false)
  const [turn, setTurn] = useState('white')
  const [history, setHistory] = useState([])
  const [turnNum, setTurnNum] = useState(1)
  const [numberedHistory, setNumberedHistory] = useState([])
  const [redirect, setRedirect] = useState(false);
  // const [gameState, setGameState] = useState({});

  

  return (
    <div className="game-container">
      <TurnIndicator turn={turn}/>
      <ChessBoard
        game={game}                 // app.js
        setGame={setGame}           // app.js
        labelToggle={labelToggle}   // ------ here
        turn={turn}                 // app.js : game
        setTurn={setTurn}           // chessboard -> server 
        setHistory={setHistory}     // chessboard -> server
        history={history}           // app.js : game
        turnNum={turnNum}           // app.js : game
        setTurnNum={setTurnNum}     // chessboard -> server
        numberedHistory={numberedHistory} // app.js : game
        setNumberedHistory={setNumberedHistory} // chessboard -> server
      />
      <History numberedHistory={numberedHistory}/>  
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
      <button className="login-button" onClick={() => {setRedirect("/lobby")}}>lobby</button>

      {redirect? <Redirect to={redirect}/> : null}
    </div>
    
  );
}

export default GameContainer;