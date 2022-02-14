import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import { BrowserRouter, Switch, Route } from "react-router-dom";


function Lobby({ user, setUser, setGameId, setGame, reloadRatingToggle, setReloadRatingToggle }) {

  const [redirect, setRedirect] = useState(false);
  const [gamesList, setGamesList] = useState([{id: 0, players: [], status: "pending"}])
  const [lobbyUsers, setLobbyUsers] = useState(null);


  const greeting = user ? 
    "welcome to the lobby," + " " + user.username
    : "welome to the lobby"

  useEffect(() => {
    loadGames()
    reloadRatingToggle ? reloadRating() : postUserLobby()
    fetchUserLobby()


    const lobbyInterval = setInterval(() => {
      console.log('tic2');
      loadGames();
      fetchUserLobby();
  }, 2000);

    // fetchUserLobby()
    return () => cleanup(lobbyInterval)
  }, []);

  function cleanup(lobbyInterval){
    deleteUserLobby()
    clearInterval(lobbyInterval)
  }

  function reloadRating(){
    fetch(`/users/${user.id}`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(reloadedUser => {
          setUser({...user, elo_rating: reloadedUser.elo_rating})
          console.log("user rating updated")
          console.log(reloadedUser.elo_rating)
          postUserLobby(reloadedUser.elo_rating)
          setReloadRatingToggle(false)
        })
      }
      else {
        console.log('fetch error')
      }
    })
  }

  function fetchUserLobby(){

    fetch('/lobbies')
      .then(resp => {
        if (resp.ok) {
          resp.json()
          .then(lobby => {
            console.log(lobby)
            // let lobbyUsernames = lobby.map(user => user.username)
            // setLobbyUsers(lobbyUsernames)
            setLobbyUsers(lobby)

          })
        }
        else {
          console.log('fetch error')
        }
      })
  }

  // console.log(lobbyUsers)

  function postUserLobby(rating = user.elo_rating){
    console.log(user.username + " has joined the lobby")
    fetch("/lobbies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: user.username, score: Math.round(rating)}),
    }).then((res) => res.json())
    .then((json) => console.log(json))
  }

  function deleteUserLobby(){
    fetch(`/lobbies/${user.username}`, { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        console.log(user.username + " has left the lobby")
        // console.log(res.json())
      }
      else {
        console.log(res.json())
      }
    });
  }

  function loadGames(){
    fetch('/games')
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(games => {
          let validGames = [];
          for (let i = 0; i < games.length; i++) {
            if (games[i].status == 'running' || games[i].status == 'pending') {
              validGames.push(games[i])
            }
          }
          if (validGames.length < 1) {
            setGamesList([{id: 0, players: [], status: "pending"}])
          }
          else {
            setGamesList(validGames)
          }
        })
      }
      else {
        console.log('fetch error')
      }
    })
  }

  function handleJoin(e){
  
    // setRedirect(true)
    console.log(e.target.name)

    let gameId = e.target.name;

    let player = {
      user_id: user.id,
      role: "player2",
      game_id: gameId,
    }
    
    fetch("/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then((res) => {
      if (res.ok) {
        res.json().then((player) => {
          console.log(player)
          // mid fetch ---- set player 2 ------------- start
          fetch(`/games/${gameId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({status: 'in progress'})
          }).then((res) => res.json())
          .then(game => {
            // inner fetch ---- set game w/ player 2 --------------- start
            fetch(`/games/${gameId}`)
            .then(resp => {
              if (resp.ok) {
                resp.json()
                .then(game => {
                  setGame(game)
                  setRedirect('/test')
                  console.log('game is set')
                })
              }
              else {
                console.log('fetch error')
              }
            })
            // inner fetch ---- set game w/ player 2 --------------- end
          })
          // mid fetch ---- set player 2 ------------- end
        });
      } else {
        res.json().then((errors) => {
          console.log(errors.error);  // log errors
        });
      }
    });
    
  }

  function createGame(){
    // console.log("create game, remember new id")

    let gameSeed = {
      state: "chess",
      status: "pending",
      turn: "player1",
      history: "",
      counter: 10
    }

    // outer fetch ---- set game w/o player ---------------- start
    fetch("/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameSeed),
    }).then((res) => {
      if (res.ok) {
        res.json().then((game) => {
          console.log(game)
          // mid fetch params
          let player = {
            user_id: user.id,
            role: 'player1',
            game_id: game.id
          }
          // mid fetch ---- set player ------------- start
          fetch("/players", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(player),
          }).then((res) => {
            if (res.ok) {
              res.json().then((player) => {
                // inner fetch ---- set game  w/ player ---------------- start
                  fetch(`/games/${game.id}`)
                  .then(resp => {
                    if (resp.ok) {
                      resp.json()
                      .then(game => {
                        setGame(game) // ------ set game w/ player ------- here !!
                        setRedirect('/test')
                        console.log('game is set')
                      })
                    }
                    else {
                      console.log('fetch error')
                    }
                  })
                  // inner fetch ---- set game w/ player ---------------- end
              });
            } else {
              res.json().then((errors) => {
                console.log(errors.error);
              });
            }
          });
          // mid fetch ---- set player ------- end
        });
      } else {
        res.json().then((errors) => {
          console.log(errors.error);
        });
      }
    });
    // outer fetch ---- set game w/o player ---------------- end


    console.log("redirect to game, with waiting screen")
  }

  return (
      <div id="lobby-container">
        <h1>{greeting}</h1>
        <div id="lobby-games-list">
        <h2 id="me-history-h2">current games</h2>
          {gamesList.map((game) => (
            <div className="lobby-game-item" key={game.id}>
              <div className="game-item-title">Game {game.id}</div>
              <div className="game-item-text">{game.players.length}/2</div>
              {game.players.length === 0 ?
              <div className="game-item-host">pending...</div> :
              <div className="game-item-host">
                <div className="game-item-host-username">{game.players[0].user.username}</div>
                <div className="game-item-host-rating">{Math.round(game.players[0].user.elo_rating)}</div>
              </div>
              }
              {game.players.length == 2 ?
              <button className="game-item-button-full">game full</button> : null}
              {game.players.length == 1 ?
              <button className="game-item-button" name={game.id} onClick={(e) => handleJoin(e)}>join game</button> : null}
              {game.players.length == 0 ?
              <button className="game-item-button-full">pending...</button> : null}
          </div>
          ))}
        </div>
        <div id="lobby-games-list">
        <h2 id="me-history-h2">current users</h2>

          {!lobbyUsers ? "error: no users in lobby" : 
          lobbyUsers.map(user => (
            <div className="lobby-game-item">
              <div className="game-item-host">{user.username}</div>
              <div className="game-item-text">rating: {user.score ? user.score : "n/a"}</div>
            </div>
          ))}
        </div>
        <button className="login-button" onClick={() => createGame()}>create new game</button>
        <button className="login-button" onClick={() => loadGames()}>refresh games</button>
        <button className="login-button" onClick={() => setRedirect('/me')}>view profile</button>
        {/* <button className="login-button" onClick={() => deleteUserLobby()}>del user lobby</button> */}

        {redirect? <Redirect to={redirect}/> : null}
      </div>
  );
}

export default Lobby;