var canvas = document.getElementById('draw')

var ctx = canvas.getContext('2d')

const boxSize = 10

const screen = {
  width: canvas.getAttribute('width'),
  height: canvas.getAttribute('height')
}

var snake = {
  size: 3,
  cellWidth: boxSize,
  cellHeight: boxSize,
  direction: 'ArrowUp',
  color: 'green',
  ArrowUp: () => {
     snake.cells[0].y -= snake.cellHeight 
    },
  ArrowDown: () => {
     snake.cells[0].y += snake.cellHeight
    },
  ArrowLeft: () => {
     snake.cells[0].x -= snake.cellWidth
    },
  ArrowRight: () => {
     snake.cells[0].x += snake.cellWidth
    },
  lastX: 400,
  lastY: 380,
  cells: [],
}

var apple = {
  x: 290,
  y: 290,
  width: boxSize,
  height: boxSize,
  color: 'red'
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function detectColision() {
  return (snake.cells[0].x == apple.x && snake.cells[0].y == apple.y)
}

function eatApple() {
  if(detectColision()) {
    var cell = new Object()
    cell.x = snake.lastX
    cell.y = snake.lastY
    snake.cells.push(cell)
    snake.size++;
    generateApplePosition()
  }
}

function generateApplePosition() {
  apple.x = getRandomInt(0, screen.width/apple.width) * apple.width
  apple.y = getRandomInt(0, screen.height/apple.height) * apple.height
}

function init() {
  // gerar as coordenas da maçã aleatóriamente
  generateApplePosition()

  // gerar as 3 primeiras celulas
  var cell = new Object()
  cell.x = 400
  cell.y = 400
  snake.cells.push(cell)
  cell = new Object()
  cell.x = 400
  cell.y = 390
  snake.cells.push(cell)
  cell = new Object()
  cell.x = 400
  cell.y = 380
  snake.cells.push(cell)


  // Chamar o update pela primeira vez
  update();
}

function update() {
  // pegar as coordenadas da última célula 
  lastX = snake.cells[snake.size-1].x
  lastY = snake.cells[snake.size-1].y

  // mover as celulas com exceção da cabeça 
  for(var i = snake.size-1; i > 0; i--){
    snake.cells[i].x = snake.cells[i-1].x
    snake.cells[i].y = snake.cells[i-1].y
  }
  // mover a cabeça
  var headMove = snake[snake.direction];
  headMove()
  // Checar limites do canvas
  if(snake.cells[0].x == -snake.cellWidth){
    snake.cells[0].x = screen.width - snake.cellWidth
  }
  if(snake.cells[0].x == screen.width){
    snake.cells[0].x = 0
  }
  if(snake.cells[0].y == -snake.cellHeight){
    snake.cells[0].y = screen.height - snake.cellHeight
  }
  if(snake.cells[0].y == screen.height){
    snake.cells[0].y = 0
  }

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
  ctx.fillRect(0,0,screen.width,screen.height)

  // draw apple
  ctx.fillStyle = apple.color
  ctx.fillRect(apple.x, apple.y, apple.width, apple.height)

  // draw snake
  ctx.fillStyle = snake.color
  for(var i = 0; i < snake.size; i++) {
    ctx.fillRect(snake.cells[i].x, snake.cells[i].y, snake.cellWidth, snake.cellHeight)
  }
}

// ouvir teclado
document.addEventListener('keydown', function(event){
  if(event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight'){
    snake.direction = event.key
  }
});

// inciar
init()