import Player from "./src/scripts/Player.js";
import Ground from "./src/scripts/Ground.js";
import CactusController from "./src/scripts/CactusController.js";
import Score from "./src/scripts/Score.js";
import { GAME_CONFIG } from "./src/scripts/Settings.js"

// Define canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");



// Game Objects
let player = null;
let ground = null;
let cactiController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_CONFIG.GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

// Create sprites based on scale ratio
function createSprites() {
  const { PLAYER_WIDTH_RATIO, PLAYER_HEIGHT_RATIO, MIN_JUMP_HEIGHT_RATIO, MAX_JUMP_HEIGHT_RATIO,
    GROUND_WIDTH_RATIO, GROUND_HEIGHT_RATIO, GROUND_AND_CACTUS_SPEED, CACTI_CONFIG } = GAME_CONFIG;

  const playerWidthInGame = PLAYER_WIDTH_RATIO * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT_RATIO * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT_RATIO * GAME_CONFIG.GAME_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT_RATIO * GAME_CONFIG.GAME_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH_RATIO * GAME_CONFIG.GAME_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT_RATIO * GAME_CONFIG.GAME_HEIGHT * scaleRatio;

  player = new Player(ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
  ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_CACTUS_SPEED, scaleRatio);

  const cactiImages = CACTI_CONFIG.map((cactus) => {
    const image = new Image();
    image.src = cactus.image;
    return {
      image: image,
      width: cactus.widthRatio * scaleRatio,
      height: cactus.heightRatio * scaleRatio
    };
  });

  cactiController = new CactusController(ctx, cactiImages, scaleRatio, GROUND_AND_CACTUS_SPEED);
  score = new Score(ctx, scaleRatio);
}

// Set up the game screen
function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_CONFIG.GAME_WIDTH * scaleRatio;
  canvas.height = GAME_CONFIG.GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();

// Set up event listeners for screen resizing
window.addEventListener("resize", () => setTimeout(setScreen, 500));
if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

// Calculate scale ratio based on screen dimensions
function getScaleRatio() {
  const screenHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
  const screenWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);

  if (screenWidth / screenHeight < GAME_CONFIG.GAME_WIDTH / GAME_CONFIG.GAME_HEIGHT) {
    return screenWidth / GAME_CONFIG.GAME_WIDTH;
  } else {
    return screenHeight / GAME_CONFIG.GAME_HEIGHT;
  }
}

// Show "Game Over" text on the canvas
function showGameOver() {
  const fontSize = 70 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y - 20);

  // Adding message for restarting the game
  const restartMessageFontSize = 20 * scaleRatio;
  ctx.font = `${restartMessageFontSize}px Verdana`;
  ctx.fillStyle = "black";
  ctx.fillText("הקש על המסך או לחץ על הרווח כדי להתחיל שוב", x, y + 50);

}


// Set up game reset functionality
function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

// איפוס המשחק
function reset() {
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  cactiController.reset();
  score.reset();
  gameSpeed = GAME_CONFIG.GAME_SPEED_START;
}

// Show start game text on the canvas
function showStartGameText() {
  const fontSize = 40 * scaleRatio;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = "blue"; // שינוי הצבע לכחול
  ctx.textAlign = "center"; // יישור הטקסט למרכז אופקי
  ctx.textBaseline = "middle"; // יישור הטקסט למרכז אנכי
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  ctx.fillText("כדי להתחיל לחץ על כפתור רווח או השתמש בחצים", x, y);
}

// Update game speed
function updateGameSpeed(frameTimeDelta) {
  gameSpeed += frameTimeDelta * GAME_CONFIG.GAME_SPEED_INCREMENT;
}

// Clear the canvas
function clearScreen() {
  ctx.fillStyle = GAME_CONFIG.SCREEN_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Main game loop
function gameLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();

  if (!gameOver && !waitingToStart) {
    ground.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    updateGameSpeed(frameTimeDelta);
    startGameMusic()
  }

  if (!gameOver && cactiController.collideWith(player)) {
    gameOver = true;
    setupGameReset();
    score.setHighScore();
    gameOverHandler();
  }

  ground.draw();
  cactiController.draw();
  player.draw();
  score.draw();

  if (gameOver) {
    showGameOver();
  }

  if (waitingToStart) {
    showStartGameText();
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Event listeners for game reset
window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });

// Function to start game music
function startGameMusic() {
  const gameMusic = document.getElementById("game-music");
  gameMusic.play();
  // Remove the event listener to prevent starting the music multiple times
  document.removeEventListener("click", startGameMusic);
}

// Function to stop game music
function stopGameMusic() {
  const gameMusic = document.getElementById("game-music");
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

// Function to handle game over
function gameOverHandler() {
  gameOver = true;
  stopGameMusic(); // Stop the game music when game over
  score.setHighScore();
  const gameOverAudio = document.getElementById("game-over-audio")
  // Play the gameOver sound effect
  gameOverAudio.currentTime = 0;
  gameOverAudio.play();
}