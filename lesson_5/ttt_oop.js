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
    this.reset();
  }

  // static MIDDLE_BOARD_SQUARE = this.squares['5'];

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

  reset() {
    this.squares = {};
    for (let square = 1; square <= 9; square += 1) {
      this.squares[square] = new Square();
    }
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

  runGameEngine() {
    this.displayWelcomeMessage();

    while (true) {
      this.play();

      if (!this.playAgain()) break;

      this.board.reset();
      console.clear();
    }

    this.displayGoodbyeMessage();
  }

  play() {
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
  }

  playAgain() {
    let response;
    while (true) {
      response = readline.question('Would you like to play again? (y/n): ').toLowerCase();
      if (['y', 'n'].includes(response)) break;
      console.log('Please enter "y" to play again, or "n" to exit.');
    }

    return response === 'y';
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic-Tac-Toe!');
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic-Tac-Toe! Goodbye!');
  }

  joinOr(array, separator = ', ', conjunction = 'or') {
    if (array.length <= 1) return array.toString();
    if (array.length === 2) return `${array[0]} ${conjunction} ${array[1]}`;

    let result = '';
    array.forEach((el, idx, arr) => {
      if (idx === arr.length - 1) {
        result = result.concat(el);
      } else if (idx === arr.length - 2) {
        result = result.concat(`${el}${separator}${conjunction} `);
      } else {
        result = result.concat(`${el}${separator}`);
      }
    });

    return result;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validMoves = this.board.unusedSquares();
      choice = readline.question(`Choose a square (${this.joinOr(validMoves)}): `);

      if (validMoves.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.\n");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    const validChoices = this.board.unusedSquares();
    let choice;

    const randomIndex = Math.floor((Math.random()) * validChoices.length);
    choice = validChoices[randomIndex];

    this.board.markSquareAt(choice, this.computer.getMarker());

    // from non-OOP tictactoe
    // let square;
    // const defensiveMove = playDefense(board);
    // const offensiveMove = playOffense(board);

    // if (offensiveMove) {
    //   square = offensiveMove;
    // } else if (defensiveMove) {
    //   square = defensiveMove;
    // } else if (emptySquares(board).includes(MIDDLE_BOARD_SQUARE)) {
    //   square = MIDDLE_BOARD_SQUARE;
    // } else {
    //   let randomIndex = Math.floor(Math.random() *
    //                     emptySquares(board).length);
    //   square = emptySquares(board)[randomIndex];
    // }

    // board[square] = COMPUTER_MARKER;
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
game.runGameEngine();