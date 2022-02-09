import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";




function Lobby({ user="" }) {

  const [redirect, setRedirect] = useState(false);


  const greeting = user ? 
    "welcome to the lobby," + " " + user.username
    : "welome to the lobby"

  

  return (
    <div id="lobby-container">
      <h1>{greeting}</h1>
      <div id="lobby-games-list">
        <div className="lobby-game-item">
          <div className="game-item-title">Game 1337</div>
          <div className="game-item-text">1/2</div>
          <div className="game-item-host">jantje</div>
          <button className="game-item-button" onClick={() => setRedirect(true)}>join game</button>
        </div>
        <div className="lobby-game-item">
          <div className="game-item-title">Game 0002</div>
          <div className="game-item-text">2/2</div>
          <div className="game-item-host">timmy</div>
          <button className="game-item-button-full">game full</button>
        </div>
        <div className="lobby-game-item">
          <div className="game-item-title">Game 0003</div>
          <div className="game-item-text">2/2</div>
          <div className="game-item-host">frankie</div>
          <button className="game-item-button-full">game full</button>
        </div>
      </div>
      {redirect? <Redirect to="/test"/> : null}
    </div>
  );
}

export default Lobby;