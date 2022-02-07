import React, { useState, useEffect } from "react";



function ExistingLogin({ user, setUser, setRedirect }) {

  // const [redirect, setRedirect] = useState(false);
  // const [alert, setAlert] = useState("");

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  };

  

  return (
    <div id="login-h1-container">
      <h1 id="login-h1">hi, {user.username}</h1>
      <div className="existing-login">
        <div className="existing-login-text">You are already logged in.</div>
        <div className="existing-login-text">Please log out to switch users.</div>
      </div>
      <button id="login-submit" onClick={handleLogout}>log out</button>
      <button id="login-submit" onClick={() => setRedirect(true)}>return to game</button>
    </div>
  );
}

export default ExistingLogin;