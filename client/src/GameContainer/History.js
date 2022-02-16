import { useState } from "react"

function History({ history }) {

console.log(history)
let formattedHistory = " "
if (history) {
  let split = history.split(", ")
  console.log(split)
  split.map((move, i) => {
    if (i % 2 == 0) {
      formattedHistory = formattedHistory + (i/2 + 1) + " [" + move + " "
    }
    else {
      formattedHistory = formattedHistory + move + "] "
    }
  })
}
console.log(formattedHistory)



  return (
    <div id="move-history-container">
      <div id="move-history-title">history: </div>
      <div id="move-history-list">{formattedHistory}</div>
    </div>
  );
}

export default History;