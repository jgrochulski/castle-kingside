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

  let gamepack2 = {
    state: "chess",
    status: "pending",
    player1: "franci",
    player2: "janek",
    turn: "player1",
    history: "",
    counter: 10
  }

  let gamepack3 = {
    state: "chess",
    status: "pending",
    player1: "ssd",
    player2: "ssd",
    turn: "player1",
    history: "",
    counter: 10
  }

  function postGame2() {

    fetch("/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gamepack3),
    }).then((res) => {
      if (res.ok) {
        res.json().then((game) => {
          // log game resp
          console.log(game)
          // setGameState(JSON.parse(game.game_state))
        });
      } else {
        res.json().then((errors) => {
          console.log(errors.error);  // log errors
        });
      }
    });
  }

  let player1 = {
    user_id: 5,
    role: "player1",
    game_id: 67
  }

  let player2 = {
    user_id: 2,
    role: "player2",
    game_id: 61
  }

  function postPlayer(player) {

    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then((res) => {
      if (res.ok) {
        res.json().then((game) => {
          // log game resp
          console.log(game)
          // setGameState(JSON.parse(game.game_state))
        });
      } else {
        res.json().then((errors) => {
          console.log(errors.error);  // log errors
        });
      }
    });
  }

  function deleteGame(id) {
    fetch(`/games/${id}`, { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        console.log("DELETED game " + id)
      }
    });
  };



  function patchGame(info){
    fetch("/games/61", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    }).then((res) => res.json())
    .then(j => console.log(j))
  }

  console.log(gameState.b7)


  return (
    <div className="game-container">
      {user ?
        <button className="login-button" onClick={handleLogout}>logout {user.username}</button> :
        <button className="login-button" onClick={() => {setRedirect(true)}}>login</button>}
      <button onClick={postGame2}>post game</button>
      <button onClick={() => postPlayer(player1)}>post player</button>
      <button onClick={() => deleteGame(54)}>delete game</button>
      <button onClick={() => patchGame({status: "running"})}>patch game</button>



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