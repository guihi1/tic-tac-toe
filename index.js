const board = document.querySelector(".board");

const gameBoard = ((board) => {
    const squareArray = [];
    for(let i = 0; i < 9; i++){
    const square = document.createElement("div");
    squareArray.push(square);
    square.classList.add("square");
    board.appendChild(square);
    }
    return {squareArray};
})(board);

const players = (name, choice) => {
    return {name, choice};
};

const player1 = players("player1", "X");
const player2 = players("player2", "O")

const displayController = (() => {
    let turn = player1.name;
    for(let i = 0; i < 9; i++){
        gameBoard.squareArray[i].addEventListener("click", () => {
            if(turn == "player1"){
                gameBoard.squareArray[i].textContent = "X";
                turn = "player2";
            } else if(turn == "player2"){
                gameBoard.squareArray[i].textContent = "O";
                turn = "player1";
            }
        });
    }
})();