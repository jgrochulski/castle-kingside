import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";


function Header({ user, setUser, toggleHeader }){

  const [redirect, setRedirect] = useState(false);

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
    .then((res) => {
      if (res.ok) {
        setUser(null);
        setRedirect('/login')
      }
    });
  };

  return (
    <div id="header-container" style={{display: toggleHeader}}>
      {user ?
        <button className="login-button" onClick={handleLogout}>logout {user.username}</button> :
        <button className="login-button" onClick={() => {setRedirect("/login")}}>login</button>
      }


     {redirect? <Redirect to={redirect}/> : null}
    </div>
  );

};

export default Header;
