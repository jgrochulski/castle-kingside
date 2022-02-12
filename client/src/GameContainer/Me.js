import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Alert from "./Alert";


function Me({ user }) {

  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState("");
  const [gameHistory, setGameHistory] = useState(undefined)
  const [formattedGameHistory, setFormattedGameHistory] = useState([])

  if (gameHistory === undefined && user) {
    loadHistory()
  }

  if (gameHistory != undefined && gameHistory != ["no games played"] && formattedGameHistory.length == 0) {
    formatGameHistory()
    console.log('format it')
  }

  function loadHistory(){

    fetch(`/users/${user.id}`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(user => {
          console.log(user)
          let games = user.games
          let validGames = [];
          for (let i = 0; i < games.length; i++) {
            // if (!games[i].status.includes('pending') && !games[i].status.includes('in progress')) {
            if (games[i].status != "voided") {
              validGames.push(games[i])
            }
          }
          if (validGames.length < 1) {
            setGameHistory("no games played")
          }
          else {
            setGameHistory(validGames)
          }
        })
      }
      else {
        console.log('fetch error')
      }
    })
  }

  function formatGameHistory() {

    let sortHolder = [];
    
    gameHistory.map((game) => {
      
      let opponent = game.players[0].user.username == user.username ? game.players[1].user.username : game.players[0].user.username

      console.log(opponent)

      let outcome;

      if (game.status == 'draw') {
        outcome = 'draw'
      }
      else if (game.status == `${opponent} won` || game.status == `${user.username} resigned`) {
        outcome = 'loss'
      }
      else {
        outcome = 'win'
      }

      let currentDate = new Date();
      let timeSinceGame = Math.floor((new Date(game.updated_at) - currentDate) / -1000);
      console.log(timeSinceGame)

      let formattedTimeSinceGame;
      
      if (timeSinceGame >= 3600*24*30*1.5) {
        formattedTimeSinceGame = Math.round(timeSinceGame / (3600*24*30)) + "mo"
      }
      else if (timeSinceGame >= 3600*24*7) {
        formattedTimeSinceGame = Math.round(timeSinceGame / (3600*24*7)) + "wk"
      }
      else if (timeSinceGame >= 3600*24) {
        formattedTimeSinceGame = Math.round(timeSinceGame / (3600*24)) + "dy"
      }
      else if (timeSinceGame >= 3600) {
        formattedTimeSinceGame = Math.round(timeSinceGame / 3600) + "hr"
      }
      else if (timeSinceGame >= 60) {
        formattedTimeSinceGame = Math.round(timeSinceGame / 60) + "min"
      }
      else {
        formattedTimeSinceGame = timeSinceGame + "s"
      }

      console.log(formattedTimeSinceGame)

      let formattedGame = {
        id: game.id,
        outcome: outcome,
        opponent: opponent,
        time: formattedTimeSinceGame
      }

      sortHolder.push(formattedGame)

    })

    sortHolder.sort((a, b) => (
      b.id - a.id
    ))

    setFormattedGameHistory(sortHolder)

  }




  return (
    <div className="me-container">
      <div id="me-logo">
        {/* insert logo here */}
      </div>
      {user && formattedGameHistory ?
      <div>
        <div id="me-h1-container">
          <h1 id="me-h1">hi, {user.username}</h1>
        </div>
        <div id="me-history-container">
          <div id="me-history-list">
            <h2 id="me-history-h2">game history</h2>
            {formattedGameHistory.map((game, i) => (
              <div className="me-history-item" key={i}>
                <div className="me-history-item-title">Game {game.id}</div>
                {game.outcome == "win" ? <div className="me-history-item-outcome-win">{game.outcome}</div> : null}
                {game.outcome == "draw" ? <div className="me-history-item-outcome-draw">{game.outcome}</div> : null}
                {game.outcome == "loss" ? <div className="me-history-item-outcome-loss">{game.outcome}</div> : null}
                <div className="me-history-item-opponent">{game.opponent}</div>
                <div className="me-history-item-time">{game.time} ago</div>
              </div>
            ))}
          </div>
          <button className="me-button" onClick={() => setRedirect(true)}>Return to Lobby</button>
        </div>
        {alert ? <Alert status={alert} /> : null}
      </div>
      : <div>null</div>}
      {redirect? <Redirect to="/lobby"/> : null}
      {/*  ------------------------------------------   to this  */}
    </div>
    
  );
}

export default Me;