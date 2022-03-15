import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GameContainer from "./GameContainer/GameContainer";
import Login from "./GameContainer/Login";
import Signup from "./GameContainer/Signup";
import TestGame from "./GameContainer/TestGame";
import Lobby from "./GameContainer/Lobby";
import Me from "./GameContainer/Me";
import User from "./GameContainer/User";
import Chess from "./GameContainer/Chess";
import Header from "./Header";
import Highscores from "./GameContainer/Highscores";

import "./App.css"

function App() {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [reloadRatingToggle, setReloadRatingToggle] = useState(false);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/me">
            <Header user={user} setUser={setUser}/>
            <Me user={user} setUser={setUser}/>
          </Route>
          <Route path="/users/:id">
            <Header user={user} setUser={setUser}/>
            <User />
          </Route>
          <Route path="/chess">
            <Header user={user} setUser={setUser}/>
            <Chess user={user} game={game} setGame={setGame} setReloadRatingToggle={setReloadRatingToggle}/>
          </Route>
          <Route path="/test">
            <TestGame user={user} setUser={setUser} game={game} setGame={setGame} setReloadRatingToggle={setReloadRatingToggle}/>
          </Route>
          <Route path="/lobby">
            <Header user={user} setUser={setUser}/>
            <Lobby user={user} setUser={setUser} setGame={setGame} reloadRatingToggle={reloadRatingToggle} setReloadRatingToggle={setReloadRatingToggle} />
          </Route>
          <Route path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/signup">
            <Signup user={user} setUser={setUser} />
          </Route>
          <Route path="/highscores">
            <Header user={user} setUser={setUser}/>
            <Highscores />
          </Route>
          <Route path="/">
            <Login user={user} setUser={setUser} />
          </Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;