function createGrid(squaresPerSide) {
  for (row = 0; row < squaresPerSide; row++) {
    createRow(row);
    for (col = 0; col < squaresPerSide; col++) {
      createSquare(row);
    }
  }

  setSquareDimensions(squaresPerSide);
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

function allowSketch(color) {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = color;
    });
  });
}

createGrid(50);

allowSketch("black");
