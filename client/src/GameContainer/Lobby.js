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
    // fetchUserLobby()


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
      body: JSON.stringify({username: user.username, user_id: user.id, score: Math.round(rating)}),
    }).then((res) => res.json())
    .then((json) => {
      console.log(json)
      fetchUserLobby()
    })
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
                  let parsedState = JSON.parse(game.state)
                  console.log(parsedState)
                  let parsedGame = {...game, state: parsedState}
                  setGame(parsedGame) // ------ set game w/ player ------- here !!
                  setRedirect('/chess')
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

  let gamepack = JSON.stringify(gameObj)

  function createGame(){
    // console.log("create game, remember new id")

    let gameSeed = {
      state: gamepack,
      status: "pending",
      turn: "player1",
      history: null,
      counter: 0
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
                        let parsedState = JSON.parse(game.state)
                        console.log(parsedState)
                        let parsedGame = {...game, state: parsedState}
                        setGame(parsedGame) // ------ set game w/ player ------- here !!
                        setRedirect('/chess')
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

  function handleViewUser(id){
    setRedirect(`/users/${id}`)
  }

  function handleChess(){
    fetch("/games/226").then((response) => {
      if (response.ok) {
        response.json().then((game) => {
          let parsedState = JSON.parse(game.state)
          console.log(parsedState)
          let parsedGame = {...game, state: parsedState}
          setGame(parsedGame)
          setRedirect('/chess')
        });
      }
    });
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
                <div className="game-item-host-username" onClick={() => handleViewUser(game.players[0].user.id)}>{game.players[0].user.username}</div>
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
            <div className="lobby-game-item" key={user.id}>
              <div className="game-item-host-username" onClick={() => handleViewUser(user.user_id)}>{user.username}</div>
              <div className="game-item-text">rating: {user.score ? user.score : "n/a"}</div>
            </div>
          ))}
        </div>
        <button className="login-button" onClick={() => createGame()}>create new game</button>
        <button className="login-button" onClick={() => loadGames()}>refresh games</button>
        <button className="login-button" onClick={() => setRedirect('/me')}>view profile</button>
        <button className="login-button" onClick={() => setRedirect('/')}>home</button>
        <button className="login-button" onClick={handleChess}>chess</button>


        {/* <button className="login-button" onClick={() => deleteUserLobby()}>del user lobby</button> */}

        {redirect? <Redirect to={redirect}/> : null}
      </div>
  );
}

export default Lobby;