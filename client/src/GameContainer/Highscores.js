import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import Alert from "./Alert";

function Highscores({ }) {

  const [redirect, setRedirect] = useState(false);
  const [alert, setAlert] = useState("");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");


  const params = useParams()

  const userId = params.id

  useEffect(() => {

    fetch(`/users`)
      .then(resp => {
        if (resp.ok) {
          resp.json()
          .then(users => {
            console.log(users)
            users.sort((a, b) => (
              b.elo_rating - a.elo_rating
            ))
            users.map((user, i) => (user.rank = i + 1))
            // console.log(users)
            setUsers(users)
          })
        }
        else {
          console.log('fetch error')
        }
      })

    },[])


    function handleViewUser(id){
    // console.log(id)
    setRedirect(`/users/${id}`)
    }

    function handleChange(e) {
      setFilter(e.target.value);
      console.log(filter)
    };



  return (
    <div className="highscores-container">
      <div id="me-logo">
        {/* insert logo here */}
      </div>
      <div id="highscores-h1"><h1>highscores</h1></div>
        <div id="me-history-container">
          <div id="me-history-list">
          <div id="search-input-container">
            <form onSubmit={(e) => e.preventDefault()} id="search-form">
              <label className="input-label">
                search:
                <input
                  className="search-input"
                  autoFocus
                  type="text"
                  name="filter"
                  placeholder="search by username"
                  autoComplete="off"
                  // value={filter}
                  onChange={handleChange} />
              </label>
            </form>
          </div>
          {users.length > 0 ?
            users.filter(user => user.username.includes(filter)).map((user, i) => (
              <div className="me-history-item" key={i}>
                <div className="me-history-item-title">Rank: {user.rank}</div>
                <div className="me-history-item-opponent">
                  <div className="me-history-item-opponent-username" onClick={() => handleViewUser(user.id)}>{user.username}</div>
                  <div className="me-history-item-opponent-rating">{Math.round(user.elo_rating)}</div>
                </div>
              </div>
            ))
          : <div className="me-history-none">loading users...</div>}
          </div>
          <button className="me-button" onClick={() => setRedirect('/lobby')}>return to lobby</button>

        </div>
        {alert ? <Alert status={alert} /> : null}
      {redirect? <Redirect to={redirect}/> : null}
      {/*  ------------------------------------------   to this  */}
    </div>
    
  );
}

export default Highscores;