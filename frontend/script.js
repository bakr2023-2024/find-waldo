const targetBox = document.getElementById("targetBox");
const wallpaper = document.getElementById("wallpaper");
const stopwatchDisplay = document.getElementById("stopwatch");
const scoreDisplay = document.getElementById("score");
const selectedWallpaper = localStorage.getItem("wallpaper").split(".")[0];
let data = [],
  startTime,
  stopwatchLabel,
  score = 0,
  newCoords;
const renderLayout = () => {
  wallpaper.setAttribute("src", "maps/" + selectedWallpaper + ".jpg");
};
const gameOver = async () => {
  if (score === 3) {
    wallpaper.removeEventListener("click", gameHandler);
    clearInterval(stopwatchLabel);
    const usertime = stopwatchDisplay.textContent;
    let username = "";
    while (!username) {
      username = prompt(
        "Congrats you beat the game!!\nyour score: " +
          usertime +
          "\nEnter your name"
      );
    }
    const res = await fetch("http://localhost:8080/leaderboard", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ map: selectedWallpaper, username, usertime }),
    });
    window.location.href = "leaderboard.html";
  }
};
const checkRegion = async (_id, region) => {
  const info = {
    _id,
    region,
  };
  const res = await fetch(`http://localhost:8080/ingame`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  const json = await res.json();
  return json.result;
};
const fetchData = async () => {
  const res = await fetch(`http://localhost:8080/${selectedWallpaper}/data`);
  const json = await res.json();
  return json;
};
const renderTargetCharacters = () => {
  targetBox.innerHTML = "";
  data.forEach((datum) => {
    targetBox.innerHTML += `
          <div class='targetCharacter' id='${datum._id}'>
          <img src='data:image/jpeg;base64,${datum.image}'/>
          <p class='name'>${datum.name}</p>
          </div>
          `;
  });
};
const initializeEventListeners = () => {
  const targetCharacters = Array.from(
    document.getElementsByClassName("targetCharacter")
  );

  targetCharacters.forEach((target) => {
    target.addEventListener("click", async () => {
      const result = await checkRegion(target.getAttribute("id"), newCoords);
      console.log("result", result);
      if (result) {
        score += 1;
        scoreDisplay.textContent = `Score : ${score}`;
        target.remove();
      } else {
        startTime -= 2500;
      }
      gameOver();
      targetBox.style.visibility = "hidden";
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  startTime = new Date();
  stopwatchLabel = setInterval(() => {
    const now = new Date();
    const elapsedTime = now - startTime;
    stopwatchDisplay.textContent = formatElapsedTime(elapsedTime);
  }, 100);
  scoreDisplay.textContent = `Score : ${score}`;
  fetchDataAndInitialize();
});
const fetchDataAndInitialize = async () => {
  data = await fetchData();
  renderTargetCharacters();
  initializeEventListeners();
};
const formatElapsedTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsPart = milliseconds % 1000;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMilliseconds =
    millisecondsPart < 10
      ? `00${millisecondsPart}`
      : millisecondsPart < 100
      ? `0${millisecondsPart}`
      : millisecondsPart;
  return `${minutes}:${formattedSeconds}:${formattedMilliseconds}`;
};
const convertCoordinates = (x, y) => {
  const scale = {
    x: wallpaper.width / wallpaper.naturalWidth,
    y: wallpaper.height / wallpaper.naturalHeight,
  };
  return { x: Math.floor(x / scale.x), y: Math.floor(y / scale.y) };
};
const gameHandler = ({ clientX, clientY }) => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (targetBox.style.visibility === "visible") {
    targetBox.style.visibility = "hidden";
    return;
  } else {
    targetBox.style.visibility = "visible";
    targetBox.style.top = clientY + scrollTop + 10 + "px";
    targetBox.style.left = clientX + 10 + "px";
  }

  newCoords = convertCoordinates(clientX, clientY + scrollTop);
};
wallpaper.addEventListener("click", gameHandler);
