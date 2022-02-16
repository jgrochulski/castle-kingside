import { useState } from "react"

function History({ numberedHistory }) {

console.log(numberedHistory)


  return (
    <div id="move-history-container">
      <div id="move-history-title">history: </div>
      <div id="move-history-list">{numberedHistory}</div>
    </div>
  );
}

export default History;