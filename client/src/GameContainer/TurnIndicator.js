function TurnIndicator({ user, turn, status, players }) {

  let message = "";
  console.log(user)

  if (status == "pending") {
    message = "waiting..."
  }
  else if (status.slice(-3) === "won") {
    message = status.slice(0, -4) === user ?
    "congrats! you won" :
    "oops! " + status
  }
  else {
    // message = turn === "player1" ? players[0].user.username + " to play as white" : players[1].user.username + " to play as black"
    if (turn === "player1") {
      if (players[0].user.username === user) {
        message = "your turn as white"
      }
      else {
        message = players[0].user.username + " to play as white"
      }
    }
    else {
      if (players[1].user.username === user) {
        message = "your turn as black"
      }
      else {
        message = players[1].user.username + " to play as black"
      }
    }
  }

  return (
    <div className="turn-indicator">{message}</div>
  );
}

export default TurnIndicator