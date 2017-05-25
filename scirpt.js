// 2.User should be able to click on a box and mark the square with users mark
// -- put onclick directly on the square or add eventlistener
// ---- either way we need a mark square function
// 3. if it is x turn put 'x' in if os turn put 'o' in
// 4. now that we know whos turn it is put their symbol in and change whos turn it is
// 5. we need to check to see if anyone won

// initialize whos turn at player 1
var onePlayerGame = true
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var compSquares = [];
var takenSquares = [];
var winningCombos = [
	['A1','B1','C1'],
	['A2','B2','C2'],
	['A3','B3','C3'],
	['A1','A2','A3'],
	['B1','B2','B3'],
	['C1','C2','C3'],
	['A1','B2','C3'],
	['A3','B2','C1']
]

var gameOverBool = false;

var squares = document.getElementsByClassName("square");
for (let i = 0; i < squares.length; i++){
	squares[i].addEventListener('click', function(event){
		if (! gameOverBool){
		markSquare(this)
		}
	})
}

function markSquare(currentSquare){
	if((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		squareResult = "Sorry this square is taken."
	}else if (whosTurn == 1){
		currentSquare.innerHTML = "X";
		whosTurn = 2;
		player1Squares.push(currentSquare.id);
		takenSquares.push(currentSquare.id)
		var squareResult = ""
		checkWin(player1Squares,1);
		compFindWinningSquare(player1Squares, compSquares);
		if (onePlayerGame){
			computerMove();
			checkWin(compSquares, "computer")
		}
	}else{
		currentSquare.innerHTML = "O";
		whosTurn = 1;
		player2Squares.push(currentSquare.id);
		var squareResult = ""
		checkWin(player2Squares,2);
	}
	var messageElement = document.getElementById('message');
	messageElement.innerHTML = squareResult;
}

function computerMove(){
	// find a random square
	var randSquare = squares[Math.floor(Math.random() * 9)];
	var compsTurn = true
	while(compsTurn){
		if (takenSquares.length == squares.length){
			break;
		}else if ((randSquare.innerHTML != "X") && (randSquare.innerHTML != "O")){
			// if it is send it to square
			randSquare.innerHTML = "O";
			compSquares.push(randSquare.id);
			takenSquares.push(randSquare.id);
			whosTurn = 1;
			break;
		}else{
			randSquare = squares[Math.floor(Math.random() * 9)];
		}
	}
	// if its not keep looking
}

function compFindWinningSquare(humanPlayersSquares, computerSquares){
	var combo = []
}

function checkWin(currentPlayersSquares, whoJustWent){
	// outter loop = winning combos
	for (let i = 0; i < winningCombos.length; i++){
		// inner loop (square inside a winning combo)
		var squareCount = 0;
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if (currentPlayersSquares.indexOf(winningSquare) > -1){
				squareCount++;
			}
		}
		if (squareCount == 3){
			console.log("Player " + whoJustWent + " won the game");
			gameOver(whoJustWent, winningCombos[i]);
			break
		}	
	}
}

function gameOver(whoJustWent, winningCombo){
	var message = "Congratulations to player " + whoJustWent + ". You just won with " + winningCombo;
	var messageElement = document.getElementById('message');
	messageElement.innerHTML = message;
	for(let i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	gameOverBool = true;
}


















