window.addEventListener("DOMContentLoaded", () => {
  // All DOM elements
  const keys = document.querySelectorAll(".key");
  const playerScoreDisplay = document.getElementById("player_result");
  const drawScoreDisplay = document.getElementById("draw_result");
  const computerScoreDisplay = document.getElementById("computer_result");
  const resultmessageDisplay = document.getElementById("result_message");
  const playerChoiceDisplay = document.getElementById("player_choice");
  const computerChoiceDisplay = document.getElementById("computer_choice");
  const gameStarBtn = document.getElementById("game-start");
  const newGameBtn = document.getElementById("new-btn");
  const resetBtn = document.getElementById("reset-btn");
  const finalResulMsgtDisplay = document.getElementById("final_result_show");
  const playerFinalResultDiplay = document.getElementById("player_win");
  const computerFinalResultDisplay = document.getElementById("computer_win");
  const playerNameInput = document.getElementById("player-name-input");
  const winingScoreInput = document.getElementById("wining-score");
  const inputDisableMsg = document.getElementById("input_disable_msg");
  const playerNameDisplay = document.getElementById("player-name");
  const winingScoreDisplay = document.getElementById("wining-score-show");
  const settins = document.getElementById("settings");
  const navBar = document.getElementById("side-nav");
  const gamelevel = document.querySelectorAll(".game-level");
  const gameLevelDisplay = document.getElementById("display-level");
  const timerDisplay = document.getElementById("timer");
  const btnBgMusic = document.getElementById("btn-bg-music");
  const musicOff_icon = document.getElementById("setting_icon");
  const clickCountDisplay = document.getElementById("clcik_count");
  const bgMusicAudio = document.getElementById("bg-music-audio");
  const btnClickedSound = document.getElementById("btn_click_audio");
  const optionSelected = document.getElementById("option_select");
  const gameLostAudio = document.getElementById("gameLost");
  const gameWinAudio = document.getElementById("winGame");

  // Game initial variables
  let choices = ["Rock", "Paper", "Scissors"];
  let playerScore = 0;
  let computerScore = 0;
  let drawScore = 0;
  let playerChoice = null;
  let computerChoice = null;
  let playerFinalResult = 0;
  let computerFinalResult = 0;
  let winingScore = winingScoreInput.value;
  let isSettinsHide = false;
  let bgMusicOn = false;
  let totalClicks = 0;
  let playerName = "";
  let isGameStar = false;
  let isHardVersion = false;
  let setGameTimeOutID = null;
  let timeLeft = 100;
  let timeDisplayID = null;

  // GAME ONLOAD CONFIGURATION
  newGameBtn.disabled = true;
  navBar.style.setProperty("--settingsMsg", `"Settings"`);

  // Final Messages =======Player Name সমস্যা এর সমাধান করতে হবে  =========================
  // আগুমেন্ট হিসেবে playerName পাঠাতে হবে ফাংশনে।
  let winMsg =
    "Congratulations🎉" + playerName + "." + "</br>" + " You are a winner.😊";
  let loseMsg = "Oops! " + playerName + "! You lost.";
  let timeOutMsg = "Oops! Time's up " + playerName + "! You lost.";
 

  //===============================================================================
  // Game Settings hard Version
  gamelevel.forEach((level) => {
    level.addEventListener("click", () => {
      userSelectedLevel = level.dataset.level;
      gamelevel.forEach((l) => l.classList.remove("level-selected"));

      level.classList.add("level-selected");

      if (userSelectedLevel === "hard" && isGameStar === false) {
        isHardVersion = true;
        gameLevelDisplay.textContent = "Hard";
        timerDisplay.style.visibility = "visible";
      } else {
        isHardVersion = false;
        gameLevelDisplay.textContent = "Easy";
        timerDisplay.style.visibility = "hidden";
      }
    });
  });

  // Game Start
  gameStarBtn.addEventListener("click", () => {
    isGameStar = true;
    nameOptionTL.restart();
    gameStarBtn.style.visibility = "hidden";
    navBar.style.pointerEvents = "none";
    navBar.style.setProperty("--settingsMsg", `'Disable Settings'`);
    navBar.style.color = "gray";
    timerDisplay.style.height = "0%";
    btnEnable();

    // For Hard Version
    if (isHardVersion && isGameStar) {
      startTimer();
      setGameTimeOutID = setTimeout(() => {
        computerScore = winingScore;
        finalResustFunc(timeOutMsg, "darkred", gameLostAudio);
        btnEnable();
        isGameStar = true;
      }, 10500);
    }
  });

  // Main Game Logic --------------

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      if (isGameStar) {
        // Update some variables and display.
        playerChoice = key.dataset.value;
        playerChoiceDisplay.textContent = playerChoice;
        optionSelected.play();
        computerChoiceFunc();
        updateClickCount();

        // Game Logic
        if ((playerChoice === "Rock") & (computerChoice === "Paper")) {
          computerWinFunc();
        } else if (
          (playerChoice === "Paper") &
          (computerChoice === "Scissors")
        ) {
          computerWinFunc();
        } else if (
          (playerChoice === "Scissors") &
          (computerChoice === "Rock")
        ) {
          computerWinFunc();
        } else if (playerChoice === computerChoice) {
          drawFun();
        } else {
          playerWinFunc();
        }
        if (playerScore == winingScore) {
          finalResustFunc(winMsg, "yellow", gameWinAudio);
        }
        if (computerScore == winingScore) {
          finalResustFunc(loseMsg, "darkred", gameLostAudio);
        }

        setTimeout(function () {
          resultmessageDisplay.textContent = "--------------";
          resultmessageDisplay.style.color = "yellow";
          resultmessageDisplay.style.textAlign = "center";
        }, 1000);
      }
    });
  });
  // End of Game Logic --------------

  // Background Music Toggle
  btnBgMusic.addEventListener("click", () => {
    if (bgMusicOn) {
      bgMusicAudio.pause();
      bgMusicOn = false;
      musicOff_icon.classList.add("musicOff_icon");
    } else {
      bgMusicAudio.play();
      bgMusicOn = true;
      musicOff_icon.classList.remove("musicOff_icon");
    }
  });

  // Display and input player name
  playerNameInput.addEventListener("input", () => {
    playerName = playerNameInput.value.trim();
    if (playerName.length === 0) {
      playerNameDisplay.textContent = "Player";
    } else if (playerName.length > 12) {
      playerNameDisplay.textContent = playerName.slice(0, 12);
    } else {
      playerNameDisplay.textContent = playerName;
    }
  });

  // Input and Update wining score
  winingScoreInput.addEventListener("input", () => {
    winingScore = winingScoreInput.value;
    winingScoreDisplay.textContent = winingScore;
  });

  // Settings button to toggle sidebar
  settins.addEventListener("click", () => {
    if (isSettinsHide) {
      navBar.style.left = "0";
      isSettinsHide = false;
      btnClickedSound.play();
    } else {
      navBar.style.left = "25%";
      isSettinsHide = true;
      btnClickedSound.play();
    }
  });

  // All Functions -------------------------====()=>{}=======-----------------------

  timerDisplay.style.setProperty("--timeLeftValue", `"100"`);
  function startTimer() {
    timeLeft--;
    timerDisplay.style.transition = "height 10500ms linear";
    if (timeLeft < 0) {
      return;
    }

    timerDisplay.style.setProperty("--timeLeftValue", `"${timeLeft}"`);
    timeDisplayID = setTimeout(() => {
      startTimer();
    }, 100);
  }

  function computerWinFunc() {
    computerScore++;
    computerScoreDisplay.textContent = computerScore;
    resultmessageDisplay.textContent = "Computer Wins!";
    resultmessageDisplay.style.color = "skyblue";
    resultmessageDisplay.style.textAlign = "right";
  }
  function playerWinFunc() {
    playerScore++;
    playerScoreDisplay.textContent = playerScore;
    resultmessageDisplay.textContent = "You Win!👍";
    resultmessageDisplay.style.color = "Yellow";
    resultmessageDisplay.style.textAlign = "left";
  }
  function drawFun() {
    resultmessageDisplay.style.color = "yellow";
    resultmessageDisplay.style.textAlign = "center";
    resultmessageDisplay.textContent = "==========Match Draw==========";
    drawScore++;
    drawScoreDisplay.textContent = drawScore;
  }
  function computerChoiceFunc() {
    let comChoice = Math.floor(Math.random() * 3);
    computerChoice = choices[comChoice];
    computerChoiceDisplay.textContent = computerChoice;
  }
  function finalResustFunc(msg, color, audio) {
    gameOverTL.restart();
    audio.play();
    playerScore = 0;
    computerScore = 0;
    if (msg == winMsg) {
      playerFinalResult++;
      playerFinalResultDiplay.textContent = playerFinalResult;
    } else if (msg == loseMsg) {
      computerFinalResult++;
      computerFinalResultDisplay.textContent = computerFinalResult;
    }
    finalResulMsgtDisplay.innerHTML = msg;
    finalResulMsgtDisplay.style.top = "10%";
    finalResulMsgtDisplay.style.color = color;
    isGameStar = false;
    clearTimeout(setGameTimeOutID);
  }

  function btnEnable() {
    newGameBtn.disabled = false;
    newGameBtn.textContent = "New Game";
  }
  function btnDisable() {
    newGameBtn.disabled = true;

    newGameBtn.textContent = "New Game 🚫";
  }

  function updateClickCount() {
    totalClicks++;
    clickCountDisplay.textContent = totalClicks;
  }

  newGameBtn.addEventListener("click", () => {
    isGameStar = false;
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    totalClicks = 0;
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    drawScoreDisplay.textContent = drawScore;
    clickCountDisplay.textContent = totalClicks;
    resultmessageDisplay.textContent = "--------------";
    finalResulMsgtDisplay.textContent = "";
    playerChoiceDisplay.textContent = "--------";
    computerChoiceDisplay.textContent = "--------";
    finalResulMsgtDisplay.style.top = "50%";
    gameStarBtn.style.visibility = "visible";
    newGameBtnTL.restart();
    btnDisable();
    btnClickedSound.play();
    nameOptionTL.pause(0);
    navBar.style.pointerEvents = "auto";
    navBar.style.setProperty("--settingsMsg", `"Settings"`);
    clearTimeout(setGameTimeOutID);
    clearTimeout(timeDisplayID);
    timerDisplay.style.height = "90%";
    timeLeft = 100;
    timerDisplay.style.setProperty("--timeLeftValue", `"100"`);
    timerDisplay.style.transition = "height 600ms linear";
  });

  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
});

// gsap animation ==================================================================================================================================================================================================================
gsap.from("#main-content", {
  duration: 0.8,
  opacity: 0.6,
  ease: "none",
});

const introTL = gsap.timeline();

introTL
  .from(".rock", {
    duration: 1.5,
    opacity: 0,
    x: 200,
    ease: "bounce.out",
  })
  .from(
    ".paper",
    {
      duration: 1.5,
      opacity: 0,
      y: -250,
      ease: "bounce.out",
    },
    "-=1.5"
  )
  .from(
    ".Scissors",
    {
      duration: 1.5,
      opacity: 0,
      x: -200,
      ease: "bounce.out",
    },
    "-=1.5"
  )

  .set(".rock, .paper, .Scissors", { opacity: 1 });

const loopTL = gsap.timeline({
  repeat: -1,
  repeatDelay: 1,
  delay: 3.5,
});

loopTL
  .to(".rock, .paper, .Scissors", {
    rotation: 30,
    ease: "bounce.out",
    duration: 2,
  })
  .to(".rock, .paper, .Scissors", {
    rotation: -30,
    ease: "bounce.out",
    duration: 2,
  })
  .to(".rock, .paper, .Scissors", {
    rotation: 0,
    ease: "bounce.out",
    duration: 2,
  });

const newGameBtnTL = gsap.timeline({
  paused: true,
});

newGameBtnTL.fromTo(
  ".rock, .paper, .Scissors",
  {
    y: -300,
    rotation: 360,
    ease: "bounce",
    duration: 1.5,
    opacity: 0, 
  },
  {
    y: 0,
    rotation: 0,
    ease: "bounce",
    duration: 1.5,
    opacity: 1,
  }
);
const gameOverTL = gsap.timeline({
  paused: true,
});

gameOverTL.fromTo(
  ".rock, .paper, .Scissors",
  {
    y: 0,
    duration: 1,
    opacity: 1,
  },
  {
    y: -400,
    rotation: 360,
    duration: 1.5,
    opacity: 0,
  }
);

const nameOptionTL = gsap.timeline({
  repeat: -1,
  delay: 3,
  paused: true,
});

nameOptionTL
  .to(".name-rock", { opacity: 1, duration: 2 })
  .to(".name-rock", { opacity: 0, duration: 1 })

  .to(".name-paper", { opacity: 1, duration: 2 })
  .to(".name-paper", { opacity: 0, duration: 1 })

  .to(".name-scissors", { opacity: 1, duration: 2 })
  .to(".name-scissors", { opacity: 0, duration: 1 });

gsap.from(".game_result_area", {
  duration: 1,
  delay: 1,
  scaleX: 0.1,
  left: 0,
  transformOrigin: "left",
  opacity: 0,
  ease: "none",
});

gsap.from("span", {
  duration: 1,
  delay: 1.6,
  scaleX: 0.1,
  opacity: 0,
  ease: "none",
});
gsap.from(".wining-score", {
  duration: 1,
  delay: 1.6,
  y: -200,
  opacity: 1,
  ease: "none",
});
gsap.from(".computer_win", {
  duration: 1,
  delay: 1.6,
  scaleX: 0,
  opacity: 1,
  ease: "none",
});

// settings animation
gsap.from("#setting_icon", {
  duration: 1,
  delay: 0.5,
  x: -500,
  ease: "bounce",
});

gsap.from("#settings", {
  duration: 2,
  delay: 2.5,
  rotation: 360,
  repeat: -1,
  ease: "linear",
});

gsap.from(".side-nav ul li", {
  duration: 0.3,
  delay: 0.7,
  x: 300,
  opacity: 1,
  ease: "none",
  stagger: 0.5,
});

gsap.from("#new-btn", {
  duration: 1,
  x: -900,
  opacity: 1,
  ease: "bounce",
  delay: 1,
});

gsap.to("#btn-bg-music", {
  duration: 1,
  scaleX: 1.7,
  scaleY: 1.3,
  opacity: 1,
  ease: "bounce",
  yoyo: true,
  repeat: -1,
  delay: 2,
});

gsap.from("#reset-btn", {
  duration: 1,
  x: 600,
  opacity: 1,
  ease: "power1.inOut",
});

gsap.from(".total_click", {
  duration: 1,
  y: -900,
  opacity: 1,
  ease: "bounce",
  delay: 2,
});
