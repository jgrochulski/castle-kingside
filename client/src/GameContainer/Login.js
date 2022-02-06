import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";



function Login({ setUser }) {

  const [redirect, setRedirect] = useState(false);


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted")
    console.log(formData)
    fetch("/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user);
          // redirect to home on successful signin
          setRedirect(true)
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };



  return (
    <div className="login-container">
      <div id="login-logo">
        {/* insert logo here */}
      </div>
      <div id="login-h1-container">
        <h1 id="login-h1">Sign in</h1>
      </div>
      <div id="login-input-container">
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            username:
            <input
              className="login-input"
              autoFocus
              type="text"
              name="username"
              placeholder="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange} />
          </label>
          <label className="input-label">
            password:
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange} />
          </label>
          <input id="login-submit" type="submit" value="sign in" />
        </form>
        <a className="login-link" href="/signup">dont have an account? create one instead</a>
      </div>
      {redirect? <Redirect to="/"/> : null}
    </div>
    
  );
}

export default Login;