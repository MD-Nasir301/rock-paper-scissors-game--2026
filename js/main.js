window.addEventListener("DOMContentLoaded", () => {
  // All DOM elements
  const keys = document.querySelectorAll(".key");
  const playerScoreDisplay = document.getElementById("player_result");
  const drawScoreDisplay = document.getElementById("draw_result");
  const computerScoreDisplay = document.getElementById("computer_result");
  const resultmessageDisplay = document.getElementById("result_message");
  const playerChoiceDisplay = document.getElementById("player_choice");
  const computerChoiceDisplay = document.getElementById("computer_choice");
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
  const btnBgMusic = document.getElementById("btn-bg-music");
  const musicOff_icon = document.getElementById("setting_icon");
  const clickCountDisplay = document.getElementById("clcik_count");
  const bgMusicAudio = document.getElementById("bg-music-audio");
  const btnClickedSound = document.getElementById("btn_click_audio");
  const optionSelected = document.getElementById("option_select");
  const gameLostAudio = document.getElementById("gameLost");
  const gameWinAudio = document.getElementById("winGame");

  // Variables
  let choices = ["Rock", "Paper", "Scissors"];
  let playerScore = 0;
  let computerScore = 0;
  let drawScore = 0;
  let playerChoice = null;
  let computerChoice = null;
  let playerFinalResult = 0;
  let computerFinalResult = 0;
  let winingScore = winingScoreInput.value;
  let isSettinsHide = true;
  let bgMusicOn = false;
  let totalClicks = 0;
  let playerName = "";
  // Game Start
  newGameBtn.disabled = true;
  resetBtn.disabled = true;

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

  // Update player name display
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

  // Update winning score display
  winingScoreInput.addEventListener("input", () => {
    winingScore = winingScoreInput.value;
    winingScoreDisplay.textContent = winingScore;
  });

  // Settings button to toggle sidebar
  settins.addEventListener("click", () => {
    if (isSettinsHide) {
      navBar.style.left = "0";
      settingListAnimate.restart();
      isSettinsHide = false;
      btnClickedSound.play();
    } else {
      navBar.style.left = "25%";
      isSettinsHide = true;
      btnClickedSound.play();
    }
  });

  // Main Game Logic --------------
  keys.forEach((key) => {
    key.addEventListener("click", () => {
      // Update some variables and display.
      playerChoice = key.dataset.value;
      playerChoiceDisplay.textContent = playerChoice;
      optionSelected.play();
      computerChoiceFunc();
      updateClickCount();
      newGameBtn.disabled = false;
      newGameBtn.textContent = "New Game";
      resetBtn.disabled = false;
      newBtnTL.restart();
      resetBtn.textContent = "Reset Game";
      // Game Logic
      if ((playerChoice === "Rock") & (computerChoice === "Paper")) {
        computerWinFunc();
      } else if ((playerChoice === "Paper") & (computerChoice === "Scissors")) {
        computerWinFunc();
      } else if ((playerChoice === "Scissors") & (computerChoice === "Rock")) {
        computerWinFunc();
      } else if (playerChoice === computerChoice) {
        drawFun();
      } else {
        playerWinFunc();
      }
      finalResustFunc();
      setTimeout(function () {
        resultmessageDisplay.textContent = "--------------";
        resultmessageDisplay.style.color = "yellow";
        resultmessageDisplay.style.textAlign = "center";
      }, 1000);
    });
  });

  // All Functions --------------
  function computerWinFunc() {
    computerScore++;
    computerScoreDisplay.textContent = computerScore;
    resultmessageDisplay.textContent = "Computer Wins!";
    resultmessageDisplay.style.color = "skyblue";
    resultmessageDisplay.style.textAlign = "right";
    winScoreUpdateDisable();
  }
  function playerWinFunc() {
    playerScore++;
    playerScoreDisplay.textContent = playerScore;
    resultmessageDisplay.textContent = "You Win!👍";
    resultmessageDisplay.style.color = "Yellow";
    resultmessageDisplay.style.textAlign = "left";
    winScoreUpdateDisable();
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
  function finalResustFunc() {
    if (playerScore == winingScore) {
      gameOverTL.restart();
      gameWinAudio.play();
      playerScore = 0;
      computerScore = 0;
      playerFinalResult++;
      finalResulMsgtDisplay.innerHTML =
        "Congratulations🎉" +
        playerName +
        "." +
        "</br>" +
        " You are a winner.😊";
      finalResulMsgtDisplay.style.top = "10%";
      finalResulMsgtDisplay.style.color = "yellow";
      playerFinalResultDiplay.textContent = playerFinalResult;
    } else if (computerScore == winingScore) {
      gameOverTL.restart();
      playerScore = 0;
      computerScore = 0;
      computerFinalResult++;
      gameLostAudio.play();
      finalResulMsgtDisplay.style.top = "10%";
      finalResulMsgtDisplay.style.color = "darkred";
      finalResulMsgtDisplay.textContent = "Oops! " + playerName + "! You lost.";
      computerFinalResultDisplay.textContent = computerFinalResult;
    }
  }

  function winScoreUpdateDisable() {
    if (playerScore >= 1 || computerScore >= 1) {
      winingScoreInput.style.visibility = "hidden";
      inputDisableMsg.innerHTML =
        "Game in progress... <br> Winning score  cannot <br> be changed now.";
      inputDisableMsg.style.textAlign = "center";
      inputDisableMsg.style.color = "red";
      inputDisableMsg.style.marginBottom = "10px";
      inputDisableMsg.style.fontSize = "15px";
    } else {
      winingScoreInput.style.visibility = "visible";
      inputDisableMsg.textContent = "";
    }
  }

  function updateClickCount() {
    totalClicks++;
    clickCountDisplay.textContent = totalClicks;
  }

  newGameBtn.addEventListener("click", () => {
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
    newGameBtnTL.restart();
    winScoreUpdateDisable();
    newGameBtn.disabled = true;
    resetBtn.disabled = true;
    newGameBtn.textContent = "New Game 🚫";
    newBtnTL.pause();
    resetBtn.textContent = "Reset Game 🚫";
    btnClickedSound.play();
  });

  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });

  // Last Line
});

// gsap animation ------------
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
});

nameOptionTL
  .to(".name-rock", { opacity: 1, duration: 0.7 })
  .to(".name-rock", { opacity: 0, duration: 0.1 })

  .to(".name-paper", { opacity: 1, duration: 0.7 })
  .to(".name-paper", { opacity: 0, duration: 0.1 })

  .to(".name-scissors", { opacity: 1, duration: 0.7 })
  .to(".name-scissors", { opacity: 0, duration: 0.1 });

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

const settingListAnimate = gsap.from(".side-nav ul li", {
  duration: 0.5,
  delay: 0.7,
  x: 300,
  opacity: 0.5,
  ease: "none",
  paused: true,
  stagger: 0.5,
});

gsap.from("#new-btn", {
  duration: 1,
  x: -900,
  opacity: 1,
  ease: "bounce",
  delay: 1,
});

const newBtnTL = gsap.to("#new-btn", {
  duration: 1,
  scaleX: 1.2,
  opacity: 1,
  ease: "bounce",
  yoyo: true,
  repeat: -1,
  delay: 2,
  paused: true,
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




