import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import TurnIndicator from "./TurnIndicator";
import ChessBoard from "./ChessBoard";
import History from "./History";
import LabelButton from "./LabelButton";





function Chess({ user, game, setGame }){

  const [redirect, setRedirect] = useState(false);
  const [labelToggle, setLabelToggle] = useState(false);


  
  function returnToLobby() {
    setRedirect("/lobby")
  }





  return (
    <div id="chess-container">
      <TurnIndicator turn={game.turn}/>
      <div>{user.username}</div>
      <div>{game.id}</div>
      <div>{game.turn}</div>
      <div>{game.status}</div>
      <ChessBoard
        user={user}
        game={game}
        setGame={setGame}
        labelToggle={labelToggle}
      />
      <History numberedHistory={game.history}/>
      <LabelButton labelToggle={labelToggle} setLabelToggle={setLabelToggle} />


      <button className="test-button" onClick={returnToLobby}>Return to Lobby</button>
      <button className="test-button" onClick={() => console.log(game)}>log game</button>
      
      {redirect? <Redirect to={redirect}/> : null}
    </div>
        );

};

export default Chess;
