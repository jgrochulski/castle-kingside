import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import TurnIndicator from "./TurnIndicator";
import ChessBoard from "./ChessBoard";
import History from "./History";
import LabelButton from "./LabelButton";
import GameChecker from "./GameChecker";





function Chess({ user, game, setGame }){

  const [redirect, setRedirect] = useState(false);
  const [labelToggle, setLabelToggle] = useState(false);
  const [numberedHistory, setNumberedHistory] = useState([])

  const userTurn = game.turn === 'player1' ? game.players[0].user.username : game.players[1].user.username
  console.log(userTurn)

  let opponent = "waiting for opponent...";

  if (game.players.length > 1) {
    opponent = user.username === game.players[0].user.username ? game.players[1].user.username : game.players[0].user.username
  }
  

  function returnToLobby() {
    setRedirect("/lobby")
  }
  

  return (
    <div id="chess-container">
      <div>you: {user.username}</div>
      <div>opponent: {opponent}</div>
      <div>game#{game.id}</div>
      <div>turn: {game.turn}</div>
      <div>game status: {game.status}</div>
      <div>history: {game.history}</div>
      <TurnIndicator turn={game.turn} status={game.status}/>
      
      <ChessBoard
        user={user}
        game={game}
        setGame={setGame}
        labelToggle={labelToggle}
        userTurn={userTurn}
      />
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
      <button className="test-button" onClick={returnToLobby}>Return to Lobby</button>
      {user && userTurn != user.username && game.status != 'ended' ? <GameChecker game={game} setGame={setGame} /> : null}
      {user && game.status === 'pending' ? <GameChecker game={game} setGame={setGame} message={"waiting for other player to join..."}/> : null}
      
      {redirect? <Redirect to={redirect}/> : null}
    </div>
        );

};

export default Chess;
