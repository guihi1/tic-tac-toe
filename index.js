const board = document.querySelector(".board");
const message = document.querySelector(".game-end");
const p = document.createElement("p");
const firstPlayer = document.querySelector(".first-player");
const secondPlayer = document.querySelector(".second-player");
let name1;
let name2;
let turn = "player1";
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

const startPlaying = (() => {
    const start = document.querySelector(".start");
    const game = document.querySelector(".game");
    const beforeGame = document.querySelector(".before-game");
    start.addEventListener("click", () => {
        game.classList.remove("hide");
        beforeGame.classList.add("hide");
        name1 = document.getElementById("player1").value;
        name2 = document.getElementById("player2").value;
        const player1 = players(`${name1}`,"X");
        const player2 = players(`${name2}`, "O");
        firstPlayer.textContent = `${player1.name}'s turn`;
        displayController(player1, player2);
    });
})();

const displayController = (player1, player2) => {
    firstPlayer.textContent = `${player1.name}'s turn`;
    for(let i = 0; i < 9; i++){
        gameBoard.squareArray[i].addEventListener("click", () => {
            if(turn == "player1"){
                gameBoard.squareArray[i].textContent = "X";
                gameBoard.squareArray[i].style.pointerEvents = "none";
                turn = "player2";
                secondPlayer.textContent = `${player2.name}'s turn`;
                firstPlayer.textContent = "";
                gameEnd.check();
            } else if(turn == "player2"){
                gameBoard.squareArray[i].textContent = "O";
                gameBoard.squareArray[i].style.pointerEvents = "none";
                turn = "player1";
                firstPlayer.textContent = `${player1.name}'s turn`;
                secondPlayer.textContent = "";
                gameEnd.check();
            }
        });
    }
    return turn;
};

const gameEnd = (() => {
    const buttonContainer = document.querySelector(".buttons");
    function disableMove() {
        for(let i = 0; i < 9; i++){
            gameBoard.squareArray[i].style.pointerEvents = "none";
        }
        firstPlayer.textContent = "";
        secondPlayer.textContent = "";
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
        buttonContainer.appendChild(restartButton);
        restartButton.addEventListener("click", () => {
            enableMove()
            buttonContainer.removeChild(restartButton);
            p.textContent = "";
            turn = "player1";
            firstPlayer.textContent = `${name1}'s turn`;
        });
    }
    const check = () => {
        for(let i = 0; i < 7; i += 3){
            if(gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+1].textContent && gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+2].textContent && gameBoard.squareArray[i].textContent != ""){
                if(gameBoard.squareArray[i].textContent == "X"){
                    p.textContent = `${name1} won!`;
                } else {
                    p.textContent = `${name2} won`;
                }
                disableMove();
                playAgain();
            }
        }
        for(let i = 0; i < 3; i++){
            if(gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+3].textContent && gameBoard.squareArray[i].textContent === gameBoard.squareArray[i+6].textContent && gameBoard.squareArray[i].textContent != ""){
                if(gameBoard.squareArray[i].textContent == "X"){
                    p.textContent = `${name1} won!`;
                } else {
                    p.textContent = `${name2} won`;
                }
                disableMove();
                playAgain();
            }
        }
        if(gameBoard.squareArray[0].textContent === gameBoard.squareArray[4].textContent && gameBoard.squareArray[0].textContent === gameBoard.squareArray[8].textContent && gameBoard.squareArray[0].textContent != ""){
            if(gameBoard.squareArray[0].textContent == "X"){
                p.textContent = `${name1} won!`;
            } else {
                p.textContent = `${name2} won`;
            }
            disableMove();
            playAgain();
        }
        if(gameBoard.squareArray[2].textContent === gameBoard.squareArray[4].textContent && gameBoard.squareArray[2].textContent === gameBoard.squareArray[6].textContent && gameBoard.squareArray[2].textContent != ""){
            if(gameBoard.squareArray[2].textContent == "X"){
                p.textContent = `${name1} won!`;
            } else {
                p.textContent = `${name2} won`;
            }
            disableMove();
            playAgain();
        }
        let sum = "";
        for(i = 0; i < 9; i++){
            sum += gameBoard.squareArray[i].textContent;
        }
        if(sum.length == 9 && buttonContainer.childNodes.length == 0){
            p.textContent = "It's a tie!";
            disableMove();
            playAgain();
        }
    };
    return {check};
})();

