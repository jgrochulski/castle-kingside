import { useState, useEffect } from "react"

function GameChecker({ game, setGame, message="waiting for other player..." }) {

  

  const [latestStatus, setLatestStatus] = useState(game)

  console.log(game.id)
  console.log(game.status)

  // console.log(latestStatus.id)

  if (!latestStatus && game.id) {
    fetch(`/games/${game.id}`)
      .then(resp => {
        if (resp.ok) {
          resp.json()
          .then(check => {
            setLatestStatus(check)
            console.log('first status set')
          })
        }
        else {
          console.log('fetch error')
          // reloadGame()
        }
      })
    }

  function checkGame(){
    fetch(`/games/${latestStatus.id}`)
    .then(resp => {
      if (resp.ok) {
        resp.json()
        .then(check => {
          // console.log("here")
          console.log(check.updated_at == latestStatus.updated_at)
          if (check.updated_at != latestStatus.updated_at) {
            const formatGame = {...check, state: JSON.parse(check.state)}
            setGame(formatGame)
            console.log("need refresh")

          }
          // else nothing
        })
      }
      else {
        console.log('fetch error')
        // reloadGame()
      }
    })
  }

  useEffect(() => {
    
    const gameInterval = setInterval(() => {
        console.log('tic2');
        checkGame();
    }, 2000);

    return () => clearInterval(gameInterval);
  }, []);
  

  return (
    <div id="checker-status">
      {message}
    </div>
  );
}

export default GameChecker;