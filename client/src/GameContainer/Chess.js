import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import TurnIndicator from "./TurnIndicator";
import ChessBoard from "./ChessBoard";
import History from "./History";
import LabelButton from "./LabelButton";
import GameChecker from "./GameChecker";





function Chess({ user, game, setGame, setReloadRatingToggle }){

  const [redirect, setRedirect] = useState(false);
  const [labelToggle, setLabelToggle] = useState(false);
  const [numberedHistory, setNumberedHistory] = useState([])

  const userTurn = game.turn === 'player1' ? game.players[0].user.username : game.players[1].user.username
  console.log(userTurn)

  let opponent = "waiting for opponent...";

  if (game.players.length > 1) {
    opponent = user.username === game.players[0].user.username ? game.players[1].user : game.players[0].user
  }
  

  function returnToLobby() {
    setReloadRatingToggle(true)
    setRedirect("/lobby")
  }
  

  return (
    <div id="chess-container">
      <div>game#{game.id}</div>
      <div>moves: {game.counter}</div>
      <div>status: {game.status}</div>


      <div>playing against: {opponent.username}</div>
      <div>playing against: {Math.round(opponent.elo_rating)}</div>

      <TurnIndicator turn={game.turn} status={game.status} players={game.players}/>
      
      <ChessBoard
        user={user}
        game={game}
        setGame={setGame}
        labelToggle={labelToggle}
        userTurn={userTurn}
      />
      <History history={game.history}/>
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />
      <button className="test-button" onClick={returnToLobby}>Return to Lobby</button>
      {user && userTurn != user.username && game.status.slice(-3) != 'won' ? <GameChecker game={game} setGame={setGame} /> : null}
      {user && game.status === 'pending' ? <GameChecker game={game} setGame={setGame} message={"waiting for other player to join..."}/> : null}
      
      {redirect? <Redirect to={redirect}/> : null}
    </div>
        );

};

export default Chess;
