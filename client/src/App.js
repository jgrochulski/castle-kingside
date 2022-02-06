import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import GameContainer from "./GameContainer/GameContainer";
import Login from "./GameContainer/Login";
import Signup from "./GameContainer/Signup";

import "./App.css"

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/me").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>Page Count: {count}</h1>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/">
            <GameContainer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;