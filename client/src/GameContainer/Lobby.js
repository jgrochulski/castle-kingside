import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";




function Lobby({ user="" }) {

  const [redirect, setRedirect] = useState(false);
  const [gamesList, setGamesList] = useState([{id: 0, players: [{user: {username: "host"}}, {user: {username: "player2"}}], status: "running"}])


  const greeting = user ? 
    "welcome to the lobby," + " " + user.username
    : "welome to the lobby"

  function loadGames(){
    fetch('/games')
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(games => {
          let validGames = [];
          for (let i = 0; i < games.length; i++) {
            if (games[i].players.length > 0) {
              validGames.push(games[i])
            }
          }
          console.log(validGames)
          console.log(games[0])
          setGamesList(validGames)
        })
      }
      else {
        console.log('fetch error')
      }
    })
  }

  // console.log(user.id)



  function handleJoin(e){
  
    // setRedirect(true)
    console.log(e.target.name)

    let gameId = e.target.name;

    let player = {
      user_id: user.id,
      role: "player2",
      game_id: gameId
    }
    
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then((res) => {
      if (res.ok) {
        res.json().then((game) => {
          console.log(game)
          loadGames()
          
        });
      } else {
        res.json().then((errors) => {
          console.log(errors.error);  // log errors
        });
      }
    });
    
  }

  return (
    <div id="lobby-container">
      <h1>{greeting}</h1>
      <div id="lobby-games-list">
        {gamesList.map((game) => (
          <div className="lobby-game-item" key={game.id}>
            <div className="game-item-title">Game {game.id}</div>
            <div className="game-item-text">{game.players.length}/2</div>
            <div className="game-item-host">{game.players[0].user.username}</div>
            {game.status == 'running' ?
            <button className="game-item-button-full">game full</button>
            : <button className="game-item-button" name={game.id} onClick={(e) => handleJoin(e)}>join game</button>}
        </div>
        ))}
        {/* <div className="lobby-game-item">
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
        </div> */}
      </div>
      
      <button className="login-button" onClick={() => loadGames()}>refresh games</button>

      {redirect? <Redirect to="/test"/> : null}
      
    </div>
  );
}

export default Lobby;