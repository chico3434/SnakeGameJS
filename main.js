var canvas = document.getElementById('draw')
var ctx = canvas.getContext('2d')

var score = document.getElementById('score') 

const boxSize = 10

const game = {
  score: 0,
  screen: {
    width: canvas.getAttribute('width'),
    height: canvas.getAttribute('height')
  },
  snake: {},
  apple: {
    x: 290,
    y: 290,
    width: boxSize,
    height: boxSize,
    color: 'red'
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function detectCollision() {
  return (game.snake.cells[0].x == game.apple.x && game.snake.cells[0].y == game.apple.y)
}

function eatApple() {
  if(detectCollision()) {
    var cell = new Object()
    cell.x = game.snake.lastX
    cell.y = game.snake.lastY
    game.snake.cells.push(cell)
    game.snake.size++;
    updateScore()
    generateApplePosition()
  }
}

function generateApplePosition() {
  game.apple.x = getRandomInt(0, game.screen.width/game.apple.width) * game.apple.width
  game.apple.y = getRandomInt(0, game.screen.height/game.apple.height) * game.apple.height
}

function initScore() {
  game.score = 0
  score.textContent = game.score
}

function updateScore() {
  game.score++
  score.textContent = game.score
}

function initSnake() {
  game.snake = {
    size: 3,
    cellWidth: boxSize,
    cellHeight: boxSize,
    direction: 'ArrowUp',
    color: 'green',
    ArrowUp: () => {
      game.snake.cells[0].y -= game.snake.cellHeight 
    },
    ArrowDown: () => {
      game.snake.cells[0].y += game.snake.cellHeight
    },
    ArrowLeft: () => {
      game.snake.cells[0].x -= game.snake.cellWidth
    },
    ArrowRight: () => {
      game.snake.cells[0].x += game.snake.cellWidth
    },
    lastX: 400,
    lastY: 380,
    cells: [
      cell = {
        x: 400,
        y: 400
      },
      cell = {
        x: 400,
        y: 390
      },
      cell = {
        x: 400,
        y: 380
      }
    ],
  }
}

function initSnakeCells() {
  var cell = new Object()
  cell.x = 400
  cell.y = 400
  game.snake.cells.push(cell)
  cell = new Object()
  cell.x = 400
  cell.y = 390
  game.snake.cells.push(cell)
  cell = new Object()
  cell.x = 400
  cell.y = 380
  game.snake.cells.push(cell)
}

function init() {
  // gerar as coordenas da maçã aleatóriamente
  generateApplePosition()

  // inicializar o objeto cobra
  initSnake()
  console.log(game.snake)

  // gerar as 3 primeiras celulas
  //initSnakeCells()
  //console.log(snake)

  // inicializar a pontuação
  initScore()
  console.log(game.score)

  // Chamar o update pela primeira vez
  update();
}

function getLastCoordinates() {
  lastX = game.snake.cells[game.snake.size-1].x
  lastY = game.snake.cells[game.snake.size-1].y
}

function checkBorderCollisions() {
  if(game.snake.cells[0].x == -game.snake.cellWidth){
    game.snake.cells[0].x = game.screen.width - game.snake.cellWidth
  }
  if(game.snake.cells[0].x == game.screen.width){
    game.snake.cells[0].x = 0
  }
  if(game.snake.cells[0].y == -game.snake.cellHeight){
    game.snake.cells[0].y = game.screen.height - game.snake.cellHeight
  }
  if(game.snake.cells[0].y == game.screen.height){
    game.snake.cells[0].y = 0
  }
}

function update() {
  // pegar as coordenadas da última célula 
  getLastCoordinates()

  // mover as celulas com exceção da cabeça 
  for(var i = game.snake.size-1; i > 0; i--){
    game.snake.cells[i].x = game.snake.cells[i-1].x
    game.snake.cells[i].y = game.snake.cells[i-1].y
  }

  // mover a cabeça
  var headMove = game.snake[game.snake.direction];
  headMove()

  // Checar limites do canvas
  checkBorderCollisions()

  // desenhar na tela
  draw()

  // checar se comeu a maçã e caso tenha comido tomar as providências
  eatApple()

  // se chamar em 100 ms
  setTimeout(update, 100)
}

function draw() {
  // definindo fundo preto
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,game.screen.width,game.screen.height)

  // draw apple
  ctx.fillStyle = game.apple.color
  ctx.fillRect(game.apple.x, game.apple.y, game.apple.width, game.apple.height)

  // draw snake
  ctx.fillStyle = game.snake.color
  for(var i = 0; i < game.snake.size; i++) {
    ctx.fillRect(game.snake.cells[i].x, game.snake.cells[i].y, game.snake.cellWidth, game.snake.cellHeight)
  }
}

// ouvir teclado
document.addEventListener('keydown', function(event){
  if(event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
    game.snake.direction = event.key
  }
})