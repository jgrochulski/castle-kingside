import { useState, useEffect } from "react"

function GameChecker({ game, setGame, reloadGame }) {

  const [latestStatus, setLatestStatus] = useState(null)

  if (!latestStatus) {
    fetch('/games/53')
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
        }
      })
    }



  function checkGame(){
    fetch('/games/53')
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