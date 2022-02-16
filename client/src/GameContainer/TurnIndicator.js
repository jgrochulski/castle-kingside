function TurnIndicator({ turn, status, players }) {

  let message = "";

  if (status == "pending") {
    message = "waiting..."
  }
  else {
    message = turn === "player1" ? players[0].user.username + " to play as white" : players[1].user.username + " to play as black"
  }

  return (
    <div className="turn-indicator">{message}</div>
  );
}

export default TurnIndicator