import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GameContainer from "./GameContainer/GameContainer";
import Login from "./GameContainer/Login";
import Signup from "./GameContainer/Signup";
import TestGame from "./GameContainer/TestGame";
import Lobby from "./GameContainer/Lobby";

import "./App.css"

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

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
          <Route path="/test">
            <TestGame user={user} setUser={setUser} />
          </Route>
          <Route path="/lobby">
            <Lobby user={user} />
          </Route>
          <Route path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/signup">
            <Signup user={user} setUser={setUser} />
          </Route>
          <Route path="/">
            <GameContainer user={user} setUser={setUser} />
          </Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;