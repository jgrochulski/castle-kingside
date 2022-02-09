import { useState, useEffect } from "react";
import ChessBoard from "./ChessBoard";
import LabelButton from "./LabelButton";
import TurnIndicator from "./TurnIndicator";
import History from "./History";
import { Redirect } from "react-router-dom";
import Lobby from './Lobby.js';


function GameContainer({ user, setUser }) {

  const [labelToggle, setLabelToggle] = useState(false)
  const [turn, setTurn] = useState('white')
  const [history, setHistory] = useState([])
  const [turnNum, setTurnNum] = useState(1)
  const [numberedHistory, setNumberedHistory] = useState([])
  const [redirect, setRedirect] = useState(false);
  const [gameState, setGameState] = useState({});

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  };

  // testing game_state post

  let gameObj = {
    a1: "",
    b1: "",
    c1: "",
    d1: "",
    e1: "",
    f1: "",
    g1: "",
    h1: "",
    a2: "white-pawn",
    b2: "white-pawn",
    c2: "white-pawn",
    d2: "white-pawn",
    e2: "white-pawn",
    f2: "white-pawn",
    g2: "white-pawn",
    h2: "white-pawn",
    a3: "",
    b3: "",
    c3: "",
    d3: "",
    e3: "",
    f3: "",
    g3: "",
    h3: "",
    a4: "",
    b4: "",
    c4: "",
    d4: "",
    e4: "",
    f4: "",
    g4: "",
    h4: "",
    a5: "",
    b5: "",
    c5: "",
    d5: "",
    e5: "",
    f5: "",
    g5: "",
    h5: "",
    a6: "",
    b6: "",
    c6: "",
    d6: "",
    e6: "",
    f6: "",
    g6: "",
    h6: "",
    a7: "black-pawn",
    b7: "black-pawn",
    c7: "black-pawn",
    d7: "black-pawn",
    e7: "black-pawn",
    f7: "black-pawn",
    g7: "black-pawn",
    h7: "black-pawn",
    a8: "",
    b8: "",
    c8: "",
    d8: "",
    e8: "",
    f8: "",
    g8: "",
    h8: ""
  }

  let gamepack = {game_state: JSON.stringify(gameObj)}

  // console.log(gamepack)


  function postGame() {

    fetch("/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gamepack),
    }).then((res) => {
      if (res.ok) {
        res.json().then((game) => {
          // log game resp
          console.log(JSON.parse(game.game_state))
          setGameState(JSON.parse(game.game_state))
        });
      } else {
        res.json().then((errors) => {
          console.log(errors.error);  // log errors
        });
      }
    });
  }

  console.log(gameState.b7)


  return (
    <div className="game-container">
      {user ?
        <button className="login-button" onClick={handleLogout}>logout {user.username}</button> :
        <button className="login-button" onClick={() => {setRedirect(true)}}>login</button>}
      {/* <button onClick={postGame}>post game</button> */}
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
        setNumberedHistory={setNumberedHistory}
      />
      <History numberedHistory={numberedHistory}/>
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
      {redirect? <Redirect to="/login"/> : null}
      {/* <Lobby /> */}
    </div>
    
  );
}

export default GameContainer;