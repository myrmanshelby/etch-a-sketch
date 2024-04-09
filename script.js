function createGrid(squaresPerSide) {
  for (row = 0; row < squaresPerSide; row++) {
    createRow(row);
    for (col = 0; col < squaresPerSide; col++) {
      createSquare(row);
    }
  }

  const board = document.querySelector(".board");
  let width = squaresPerSide * 10;
  let height = squaresPerSide * 10;
  board.setAttribute(
    "style",
    "width: " + width + "px; height: " + height + "px;"
  );
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

createGrid(10);
