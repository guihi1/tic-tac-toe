const board = document.querySelector(".board");
const message = document.querySelector(".game-end");
const p = document.createElement("p");

message.appendChild(p);

const gameBoard = ((board) => {
    const squareArray = [];
    for(let i = 0; i < 9; i++){
    const square = document.createElement("div");
    squareArray.push(square);
    square.classList.add("square");
    if(i == 0 || i == 1 || i == 2){
        square.classList.add("top-row");
    }
    if(i == 0 || i == 3 || i == 6){
        square.classList.add("left-column");
    }
    if(i == 2 || i == 5 || i == 8){
        square.classList.add("right-column");
    }
    if(i == 6 || i == 7 || i == 8){
        square.classList.add("bottom-row");
    }
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
                gameBoard.squareArray[i].textContent = player1.choice;
                gameBoard.squareArray[i].style.pointerEvents = "none";
                turn = "player2";
                gameEnd.check();
            } else if(turn == "player2"){
                gameBoard.squareArray[i].textContent = player2.choice;
                gameBoard.squareArray[i].style.pointerEvents = "none";
                turn = "player1";
                gameEnd.check();
            }
        });
    }
})();

const gameEnd = (() => {
    function disableMove() {
        for(let i = 0; i < 9; i++){
            gameBoard.squareArray[i].style.pointerEvents = "none";
        }
    };
    function enableMove() {
        for(let i = 0; i < 9; i++){
            gameBoard.squareArray[i].style.pointerEvents = "auto";
            gameBoard.squareArray[i].textContent = "";
        }
    }
    function playAgain() {
        const restartButton = document.createElement("button");
        restartButton.classList.add("play-again");
        restartButton.textContent = "Play again";
        const buttonContainer = document.querySelector(".buttons");
        buttonContainer.appendChild(restartButton);
        restartButton.addEventListener("click", () => {
            enableMove()
            buttonContainer.removeChild(restartButton);
            p.textContent = "";
        });
    }
    const check = () => {
        let sum = "";
        for(i = 0; i < 9; i++){
            sum += gameBoard.squareArray[i].textContent;
        }
        if(sum.length == 9){
            p.textContent = "It's a tie!";
            disableMove();
            playAgain();
        }
        for(let i = 0; i < 7; i += 3){
            if(gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+1].textContent && gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+2].textContent && gameBoard.squareArray[i].textContent != ""){
                p.textContent = "Player 1 won!";
                disableMove();
                playAgain();
            }
        }
        for(let i = 0; i < 3; i++){
            if(gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+3].textContent && gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+6].textContent && gameBoard.squareArray[i].textContent != ""){
                p.textContent = "Player 1 won!";
                disableMove();
                playAgain();
            }
        }
        if(gameBoard.squareArray[0].textContent === gameBoard.squareArray[4].textContent && gameBoard.squareArray[0].textContent === gameBoard.squareArray[8].textContent && gameBoard.squareArray[0].textContent != ""){
            p.textContent = "Player 1 won!";
            disableMove();
            playAgain();
        }
        if(gameBoard.squareArray[2].textContent === gameBoard.squareArray[4].textContent && gameBoard.squareArray[2].textContent === gameBoard.squareArray[6].textContent && gameBoard.squareArray[2].textContent != ""){
            p.textContent = "Player 1 won!";
            disableMove();
            playAgain();
        }
    };
    return {check};
})();
