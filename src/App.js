import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import Swal from "sweetalert2";
import "./App.css";

const App = () => {
  //states

  const dino = document.getElementsByClassName("runner");
  const obs = document.getElementsByClassName("obs");

  let isJumped = false;
  let isGameOver = false;
  let position = 0;

  const control = (y) => {
    if (y.nativeEvent.code === "Space") {
      if (!isJumped) {
        isJumped = true;
        dinoJump();
      }
    }
  };

  const dinoJump = () => {
    let timerId = setInterval(() => {
      // back to ground
      if (position === 150) {
        clearInterval(timerId);
        let backToGroundTimerId = setInterval(() => {
          if (position === 10) {
            clearInterval(backToGroundTimerId);
            isJumped = false;
          }
          position -= 10;
          dino[0].style.bottom = position + "px";
        }, 20);
      }

      // jumped
      if (isJumped) {
        position += 30;
        dino[0].style.bottom = position + "px";
      }
    }, 20);
  };

  const obstacles = () => {
    let randomTime = Math.random() * 3000;
    let obstaclesPosition = 1000;
    const obstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
    }
    obs[0].appendChild(obstacle);
    obstacle.style.left = obstaclesPosition + "px";

    let obstacleTimerId = setInterval(() => {
      if (obstaclesPosition > 0 && obstaclesPosition < 60 && position < 60) {
        clearInterval(obstacleTimerId);
        clearTimeout(obstacleTimeoutId);
        isGameOver = true;
        while (obs.firstChild) {
          obs.removeChild(obs.lastChild);
        }
        Swal.fire({
          title: "Game Over.😔",
          text: "Try again",
          confirmButtonText: "Restart",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }
        });
      }
      obstaclesPosition -= 10;
      obstacle.style.left = obstaclesPosition + "px";
    }, 20);
    let obstacleTimeoutId = setTimeout(() => {
      obstacles();
    }, randomTime);
  };

  useEffect(() => {
    Swal.fire({
      title: "Please click the Start.",
      text: "Control: Pass the obstacles with Space on your keyboard.",
      confirmButtonText: "Start",
      confirmButtonColor: "Green",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        obstacles();
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="obs">
        <h1>
          Welcome Dino Game <span>beta</span>
        </h1>
        <input autoFocus className="runner" onKeyPress={control} />
      </div>
    </div>
  );
};

export default App;
