
function dark(){
    $("body").toggleClass("dark");
}

document.addEventListener("keydown", function(){
    document.getElementById("out").innerHTML='';
    alert("Enter the game!");
    // var x= event.keyCode || event.which;
    
    var y = document.getElementById("game");
    if (y.style.display === "block")
    {
    document.getElementById("game").style.display = "none";
    }
    else
    {
    document.getElementById("game").style.display = "block";
    
    }
    
    })  

const statusDisplay = document.querySelector('.result');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleboxPlayed(clickedbox, clickedboxIndex) {
    gameState[clickedboxIndex] = currentPlayer;
    clickedbox.innerHTML = currentPlayer;
    if(clickedbox.innerHTML === 'X'){
        clickedbox.style.color = 'blanchedalmond;';
    }else{
        clickedbox.style.color = 'aqua';
    }
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleboxClick(clickedboxEvent) {
    const clickedbox = clickedboxEvent.target;
    const clickedboxIndex = parseInt(clickedbox.getAttribute('data-box-index'));

    if (gameState[clickedboxIndex] !== "" || !gameActive) {
        return;
    }

    handleboxPlayed(clickedbox, clickedboxIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.box').forEach(box => box.innerHTML = "");
}

document.querySelectorAll('.box').forEach(box => box.addEventListener('click', handleboxClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);