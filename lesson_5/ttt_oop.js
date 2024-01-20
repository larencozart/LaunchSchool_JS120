const readline = require("readline-sync"); // first line in ttt.js

class Square {
  static INITIAL_MARKER = " ";
  static FIRST_PLAYER_MARKER = "X";
  // eslint-disable-next-line camelcase
  static SECOND_PlAYER_MARKER = "O";

  constructor(marker = Square.INITIAL_MARKER) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.INITIAL_MARKER;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let square = 1; square <= 9; square += 1) {
      this.squares[square] = new Square();
    }
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(square, marker) {
    this.squares[square].setMarker(marker);
  }

  unusedSquares() {
    return Object.keys(this.squares)
      .filter(square => this.squares[square].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkers(player, squareCombination) {
    let markers = squareCombination.filter(square => {
      return this.squares[square].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  mark() {
    //STUB
    // We need a way to mark the board with this player's marker.
    // How do we access the board?
  }
}

class Human extends Player {
  constructor() {
    super(Square.FIRST_PLAYER_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.SECOND_PlAYER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      console.clear();
    }

    console.clear();
    this.board.display();
    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic-Tac-Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic-Tac-Toe! Goodbye!');
  }

  humanMoves() {
    let choice;

    while (true) {
      let validMoves = this.board.unusedSquares();
      choice = readline.question(`Choose a square (${validMoves.join(', ')}): `);

      if (validMoves.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.\n");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());

    // let validMoves = this.board.unusedSquares();
    // console.log(validMoves);
    // let choice = Math.floor((Math.random() * validMoves.length));
    // this.board.markSquareAt(choice, this.computer.getMarker());
    // I did this different than ls to avoid magic number and for simplicity
    // if there is an issue with computer moves, check here**
  }

  gameOver() {
    return this.board.isFull() || this.isGameWon(); // LS names boardIsFull, someoneWon
  }

  isWinner(player) {
    return TTTGame.winningCombos.some(combo => {
      return this.board.countMarkers(player, combo) === 3;
    });
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      console.log('You won! Congratulations!');
    } else if (this.isWinner(this.computer)) {
      console.log('Computer won. Better luck next time!');
    } else {
      console.log('This game was a tie.');
    }
  }

  isGameWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
}

let game = new TTTGame();
game.play();