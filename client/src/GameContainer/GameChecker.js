import { useState, useEffect } from "react"

function GameChecker({ game, setGame, reloadGame }) {

  

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
          // console.log(check)
          if (check != latestStatus) {
            setGame(check)
            // console.log("need refresh")
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
      waiting for other player...
    </div>
  );
}

export default GameChecker;