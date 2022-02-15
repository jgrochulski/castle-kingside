import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import Alert from "./Alert";

function User({ }) {

  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState("");
  const [gameHistory, setGameHistory] = useState(undefined)
  const [formattedGameHistory, setFormattedGameHistory] = useState([])
  const [viewUser, setViewUser] = useState({username: "loading..."})


  const params = useParams()

  const userId = params.id

  useEffect(() => {

    fetch(`/users/${userId}`)
      .then(resp => {
        if (resp.ok) {
          resp.json()
          .then(user => {
            console.log(user)
            setViewUser(user)
          })
        }
        else {
          console.log('fetch error')
        }
      })

    },[])
  
  // console.log(gameHistory)

  if (gameHistory === undefined && viewUser.id) {
    loadHistory()
  }

  if (gameHistory != undefined && gameHistory != ["no games played"] && formattedGameHistory.length == 0 && viewUser.id) {
    formatGameHistory()
    console.log('format it')
  }

  function loadHistory(){

    fetch(`/users/${viewUser.id}`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(user => {
          console.log(user)
          let games = user.games
          let validGames = [];
          for (let i = 0; i < games.length; i++) {
            // if (!games[i].status.includes('pending') && !games[i].status.includes('in progress')) {
            if (games[i].status != "voided" && games[i].status != "pending") {
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

        console.log(game.id)
      console.log(game.players[1].user.username)
      // console.log(viewUser.username)

      // console.log("running")
      // if (!game.players[1].user.username) {
      //   console.log(game.id)
      // }
      
      let opponent = game.players[0].user.username == viewUser.username ? game.players[1].user : game.players[0].user

      console.log(opponent)


      let outcome;

      if (game.status == 'draw') {
        outcome = 'draw'
      }
      else if (game.status == `${opponent} won` || game.status == `${viewUser.username} resigned`) {
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
      <div>
        <div id="me-h1-container">
          <h1 id="me-h1">{viewUser ? viewUser.username : "loading..."}'s profile</h1>
          { viewUser ? <div className="me-history-rating"> current rating: {Math.round(viewUser.elo_rating)}</div> : null}
        </div>
        <div id="me-history-container">
          <h2 id="me-history-h2">game history</h2>
          <div id="me-history-list">
          {viewUser && formattedGameHistory.length > 0 ?
            formattedGameHistory.map((game, i) => (
              <div className="me-history-item" key={i}>
                <div className="me-history-item-title">Game {game.id}</div>
                {game.outcome == "win" ? <div className="me-history-item-outcome-win">{game.outcome}</div> : null}
                {game.outcome == "draw" ? <div className="me-history-item-outcome-draw">{game.outcome}</div> : null}
                {game.outcome == "loss" ? <div className="me-history-item-outcome-loss">{game.outcome}</div> : null}
                <div className="me-history-item-opponent">
                  <div className="me-history-item-opponent-username">{game.opponent.username}</div>
                  <div className="me-history-item-opponent-rating">{Math.round(game.opponent.elo_rating)}</div>

                </div>
                <div className="me-history-item-time">{game.time} ago</div>
              </div>
            ))
          : <div className="me-history-none">no games played yet...</div>}
          </div>
          <button className="me-button" onClick={() => setRedirect(true)}>Return to Lobby</button>
        </div>
        {alert ? <Alert status={alert} /> : null}
      </div>
      {redirect? <Redirect to="/lobby"/> : null}
      {/*  ------------------------------------------   to this  */}
    </div>
    
  );
}

export default User;