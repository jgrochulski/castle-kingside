import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";



function Signup({ setUser }) {

  const [redirect, setRedirect] = useState(false);


  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm: ""
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
    if (formData.password === formData.confirm) {
      let confirmedData = {
        username: formData.username,
        password: formData.password
      }
      console.log("confirmed - created")
      console.log(confirmedData)

      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmedData),
      }).then((res) => {
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
    }
    else {
      console.log("error - passwords do not match")
      // create error popup
      setFormData({
        username: formData.username,
        password: "",
        confirm: ""
      })
    }
    

  };



  return (
    <div className="login-container">
      <div id="login-logo">
        {/* insert logo here */}
      </div>
      <div id="login-h1-container">
        <h1 id="login-h1">Create new account</h1>
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
          <label className="input-label">
            confirm password:
            <input
              className="login-input"
              type="password"
              name="confirm"
              placeholder="confirm password"
              autoComplete="off"
              value={formData.confirm}
              onChange={handleChange} />
          </label>
          <input id="login-submit" type="submit" value="create account" />
        </form>
        <a className="login-link" href="/login">already have an account? login instead</a>
      </div>
      {redirect? <Redirect to="/login"/> : null}
    </div>
    
  );
}

export default Signup;