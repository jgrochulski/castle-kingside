function TurnIndicator({ turn, status }) {

  let message = "";

  if (status == "pending") {
    message = "waiting..."
  }
  else {
    message = turn === "player1" ? "white to play" : "black to play"
  }

  return (
    <div className="turn-indicator">{message}</div>
  );
}

export default TurnIndicator