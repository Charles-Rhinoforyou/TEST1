const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let dx = 0;
let dy = 0;
let food = {x: 15, y: 15};
let score = 0;

document.addEventListener('keydown', keyDown);

function keyDown(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (dy === 1) break;
      dx = 0; dy = -1;
      break;
    case 'ArrowDown':
      if (dy === -1) break;
      dx = 0; dy = 1;
      break;
    case 'ArrowLeft':
      if (dx === 1) break;
      dx = -1; dy = 0;
      break;
    case 'ArrowRight':
      if (dx === -1) break;
      dx = 1; dy = 0;
      break;
  }
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++gameLoop.count < 6) return;
  gameLoop.count = 0;

  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.some(p => p.x === head.x && p.y === head.y)) {
    resetGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

gameLoop.count = 0;

function drawGame() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#f00';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  ctx.fillStyle = '#0f0';
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });

  document.getElementById('score').textContent = score;
}

function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
  while (snake.some(s => s.x === food.x && s.y === food.y)) {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
  }
}

function resetGame() {
  snake = [{x: 10, y: 10}];
  dx = 0;
  dy = 0;
  score = 0;
  placeFood();
}

placeFood();
requestAnimationFrame(gameLoop);
