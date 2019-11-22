var canvas = document.getElementById('draw')

var ctx = canvas.getContext('2d')

var snake = {
  size: 3,
  cellWidth: 10,
  cellHeight: 10,
  direction: 'ArrowUp',
  color: 'rgb(0,255,0)',
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
  width: 10,
  height: 10,
  color: 'rgb(255,0,0)'
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
  }
}

function init() {
  // gerar as coordenas da maçã aleatóriamente
  apple.x = getRandomInt(0,60) * 10
  apple.y = getRandomInt(0,60) * 10

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
  if(snake.cells[0].x == -10){
    snake.cells[0].x = 590
  }
  if(snake.cells[0].x == 600){
    snake.cells[0].x = 0
  }
  if(snake.cells[0].y == -10){
    snake.cells[0].y = 590
  }
  if(snake.cells[0].y == 600){
    snake.cells[0].y = 0
  }
  // checar se comeu a maçã e caso tenha comido tomar as providências
  eatApple()

  // desenhar na tela
  draw()
  // se chamar em 100 ms
  setTimeout(update, 100)
}

function draw() {
  // definindo fundo preto
  ctx.fillStyle = "rgb(0,0,0)"
  ctx.fillRect(0,0,600,600)

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