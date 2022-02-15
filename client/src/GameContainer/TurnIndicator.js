function TurnIndicator({ turn }) {

  

  return (
    <div className="turn-indicator">{turn === "player1" ? "white" : "black"} to play</div>
  );
}

export default TurnIndicator