import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import LabelButton from "./LabelButton";
import TurnIndicator from "./TurnIndicator";
import History from "./History";
import { Redirect } from "react-router-dom";


function GameContainer({ user, setUser }) {

  const [labelToggle, setLabelToggle] = useState(false)
  const [turn, setTurn] = useState('white')
  const [history, setHistory] = useState([])
  const [turnNum, setTurnNum] = useState(1)
  const [numberedHistory, setNumberedHistory] = useState([])
  const [redirect, setRedirect] = useState(false);

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  };

  return (
    <div className="game-container">
      {user ?
        <button className="logout-button" onClick={handleLogout}>logout {user.username}</button> :
        <button className="login-button" onClick={() => {setRedirect(true)}}>login</button>}
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
      {redirect? <Redirect to="/login"/> : null}
    </div>
    
  );
}

export default GameContainer;