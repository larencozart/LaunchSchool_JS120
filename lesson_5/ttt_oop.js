const readline = require("readline-sync");

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

  static MIDDLE_BOARD_SQUARE = '5';

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
    this.score = 0;
  }

  getMarker() {
    return this.marker;
  }

  resetScore() {
    this.score = 0;
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
    this.roundWinner = null;
  }

  static THREE_IN_A_ROW = 3;
  static TWO_IN_A_ROW = 2;
  static winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

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

  findAtRiskSquare(player) {
    let atRiskSquare = null;
    const unusedSquares = this.board.unusedSquares();
    const atRiskRow = TTTGame.winningCombos.find(combo => {
      return this.board.countMarkers(player, combo) === TTTGame.TWO_IN_A_ROW;
    });

    if (atRiskRow) {
      atRiskSquare = atRiskRow.find(square => {
        return unusedSquares.includes(String(square));
      });
    }

    return atRiskSquare;
  }

  computerOffense() {
    return this.findAtRiskSquare(this.computer);
  }

  computerDefense() {
    return this.findAtRiskSquare(this.human);
  }

  computerMoves() {
    let choice;
    const offensiveMove = this.computerOffense();
    const defensiveMove = this.computerDefense();
    const validChoices = this.board.unusedSquares();

    if (offensiveMove) {
      choice = offensiveMove;
    } else if (defensiveMove) {
      choice = defensiveMove;
    } else if (validChoices.includes(Board.MIDDLE_BOARD_SQUARE)) {
      choice = Board.MIDDLE_BOARD_SQUARE;
    } else {
      const randomIndex = Math.floor((Math.random()) * validChoices.length);
      choice = validChoices[randomIndex];
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.isGameWon();
  }

  isWinner(player) {
    return TTTGame.winningCombos.some(combo => {
      return this.board.countMarkers(player, combo) === TTTGame.THREE_IN_A_ROW;
    });
  }

  displayRoundResults() {
    if (this.roundWinner === "human") {
      console.log('You won! Congratulations!');
    } else if (this.roundWinner === "computer") {
      console.log('Computer won. Better luck next time!');
    } else {
      console.log('This game was a tie.');
    }
  }

  isGameWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayScore() {
    console.log(
      `\nCURRENT SCORE:\n${'-'.repeat('CURRENT SCORE'.length)}\nYou: ${this.human.score}\nComputer: ${this.computer.score}\n`);
  }

  playRound(gameStyle = "match") {
    this.board.reset();

    while (true) {
      if (gameStyle === "match") {
        this.displayScore();
      }

      this.board.display();

      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      console.clear();
    }

    console.clear();
    this.board.display();
    this.findRoundWinner();
    if (gameStyle !== "match") {
      this.displayRoundResults();
    }
  }

  updateMatchScore() {
    if (this.roundWinner === 'human') {
      this.human.score += 1;
    } else if (this.roundWinner === 'computer') {
      this.computer.score += 1;
    }
  }

  findRoundWinner() {
    if (this.isWinner(this.human)) {
      this.roundWinner = "human";
    } else if (this.isWinner(this.computer)) {
      this.roundWinner = "computer";
    } else {
      this.roundWinner = "tie";
    }
  }

  displayMatchResults(winningScore) {
    if (this.human.score === winningScore) {
      console.log('\nCongratulations! You won the match!\n');
    } else if (this.computer.score === winningScore) {
      console.log('\nBetter luck next time. The computer won this match.\n');
    }
  }

  playMatch() {
    const WINNING_SCORE = 3;

    this.board.reset();
    this.human.resetScore();
    this.computer.resetScore();

    while (true) {
      console.clear();
      this.playRound();
      this.updateMatchScore();

      if (this.human.score === WINNING_SCORE ||
          this.computer.score === WINNING_SCORE) break;
    }

    console.clear();
    this.displayScore();
    this.board.display();
    this.displayMatchResults(WINNING_SCORE);
  }

  getGameStyle() {
    let gameStyle;
    while (true) {
      gameStyle = readline
        .question("\nDo you want to play a (s)ingle game or a (m)atch against the computer?: ")
        .toLowerCase();
      if (['m', 's', 'single', 'match'].includes(gameStyle)) break;
      console.log('Please enter "s" for a single tic-tac-toe game, or "m" for a match game.');
    }

    return gameStyle === 'm' ? "match" : "single";
  }

  playAgain() {
    let response;
    while (true) {
      response = readline.question('\nWould you like to play again? (y/n): ').toLowerCase();
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
    console.log('\nThanks for playing Tic-Tac-Toe! Goodbye!');
  }

  displayRules(gameStyle) {
    if (gameStyle === "match") {
      console.log('\nMatch Game Rules: First player to win 3 rounds of Tic Tac Toe wins the match!');
    } else {
      console.log('\nSingle Game Rules: First player to get 3 marks in a row wins the game!');
    }

    console.log('\nPlease hit enter to begin: ');
    readline.question();
  }

  runGameEngine() {
    this.displayWelcomeMessage();

    while (true) {
      let gameStyle = this.getGameStyle();
      if (gameStyle === "match") {
        this.displayRules(gameStyle);
        console.clear();
        this.playMatch();
      } else {
        this.displayRules(gameStyle);
        console.clear();
        this.playRound(gameStyle);
      }

      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }
}

let game = new TTTGame();
game.runGameEngine();