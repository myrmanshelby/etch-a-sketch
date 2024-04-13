// Creating game
initializeGrid();
allowChangePenSize();
allowSolidSketch();

// Enabling buttons
toggleEraseButton();
enableClearButton();
toggleRainbowButton();

function createGrid(squaresPerSide) {
  const board = document.createElement("div");
  const game = document.querySelector(".game");
  board.classList.add("board");
  game.appendChild(board);

  for (row = 0; row < squaresPerSide; row++) {
    createRow(row);
    for (col = 0; col < squaresPerSide; col++) {
      createSquare(row);
    }
  }

  setSquareDimensions(squaresPerSide);
}

function removeGrid() {
  const game = document.querySelector(".game");
  const board = document.querySelector(".board");
  game.removeChild(board);
}

function setSquareDimensions(squaresPerSide) {
  const board = document.querySelector(".board");
  const boardStyle = window.getComputedStyle(board);
  const squares = document.querySelectorAll(".square");

  let boardWidth = boardStyle.getPropertyValue("width");
  boardWidth = boardWidth.substring(0, boardWidth.indexOf("p"));
  let boardHeight = boardStyle.getPropertyValue("height");
  boardHeight = boardHeight.substring(0, boardHeight.indexOf("p"));

  let squareWidth = boardWidth / squaresPerSide;
  let squareHeight = boardHeight / squaresPerSide;

  squares.forEach((square) => {
    square.setAttribute(
      "style",
      "width: " + squareWidth + "px; height: " + squareHeight + "px;"
    );
  });
}

function createRow(rowID) {
  const board = document.querySelector(".board");
  const row = document.createElement("div");

  row.classList.add("row");
  let newID = "row-" + rowID;
  row.setAttribute("id", newID);

  board.appendChild(row);
}

function createSquare(rowID) {
  let getID = "#row-" + rowID;

  const row = document.querySelector(getID);
  const square = document.createElement("div");
  square.classList.add("square");
  row.appendChild(square);
}

function allowSolidSketch() {
  const squares = document.querySelectorAll(".square");
  let colorPicker = document.getElementById("color-picker");

  squares.forEach((square) => {
    square.addEventListener("mouseover", function addColor() {
      square.style.backgroundColor = colorPicker.value;
    });
  });
}

function allowRainbowSketch() {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("mouseover", function addColor() {
      square.style.backgroundColor = generateRandomRGBA();
    });
  });
}

function allowErase() {
  const squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.addEventListener("mouseover", function addColor() {
      square.style.backgroundColor = "white";
    });
  });
}

function allowChangePenSize() {
  let slider = document.getElementById("number-of-squares");
  slider.oninput = function () {
    resetRainbowErase();

    removeGrid();
    createGrid(this.value);
    allowSolidSketch();
  };
}

function initializeGrid() {
  let slider = document.getElementById("number-of-squares");
  createGrid(slider.value);
}

function toggleRainbowButton() {
  const rainbowBtn = document.querySelector("#rainbow-btn");
  const eraseBtn = document.querySelector("#erase-btn");
  let toggleOn = false;

  rainbowBtn.addEventListener("click", () => {
    if (toggleOn === false) {
      allowRainbowSketch();
      rainbowBtn.style.backgroundColor = "blue";
      toggleOn = true;

      eraseBtn.style.backgroundColor = "white";
      toggleEraseButton();
    } else {
      allowSolidSketch();
      rainbowBtn.style.backgroundColor = "white";
      toggleOn = false;
    }
  });
}

function toggleEraseButton() {
  const eraseBtn = document.querySelector("#erase-btn");
  const rainbowBtn = document.querySelector("#rainbow-btn");
  let toggleOn = false;

  eraseBtn.addEventListener("click", () => {
    if (toggleOn === false) {
      allowErase();
      eraseBtn.style.backgroundColor = "blue";
      toggleOn = true;

      rainbowBtn.style.backgroundColor = "white";
      toggleRainbowButton();
    } else {
      allowSolidSketch();
      eraseBtn.style.backgroundColor = "white";
      toggleOn = false;
    }
  });
}

function enableClearButton() {
  const clearBtn = document.querySelector("#clear-btn");

  clearBtn.addEventListener("click", () => {
    resetRainbowErase();

    removeGrid();
    initializeGrid();
    allowSolidSketch();
  });
}

function resetRainbowErase() {
  const eraseBtn = document.querySelector("#erase-btn");
  const rainbowBtn = document.querySelector("#rainbow-btn");

  eraseBtn.style.backgroundColor = "white";
  toggleEraseButton();
  rainbowBtn.style.backgroundColor = "white";
  toggleRainbowButton();
}

function generateRandomRGBA() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let a = Math.random();

  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}
