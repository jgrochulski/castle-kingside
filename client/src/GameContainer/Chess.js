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
      <div id="chess-game-title">game#{game.id}</div>
      <div id="chess-game-status">{game.status}</div>

      <div id="chess-header">
        <div id="chi" className="chess-header-item">
          <div className="chess-header-item-username">{user.username}</div>
          <div className="chess-header-item-rating">{Math.round(user.elo_rating)}</div>
        </div>
        <div id="chess-header-vs">vs</div>
        <div id="chess-header-opponent" className="chess-header-item">
          <div className="chess-header-item-username">{opponent.username ? opponent.username : "waiting..."}</div>
          <div className="chess-header-item-rating">{Math.round(opponent.elo_rating) ? Math.round(opponent.elo_rating) : null}</div>
        </div>
      </div>

      <TurnIndicator user={user.username} turn={game.turn} status={game.status} players={game.players}/>
      
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
