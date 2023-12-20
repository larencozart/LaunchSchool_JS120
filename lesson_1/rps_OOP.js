const rls = require('readline-sync');
const MOVES =
{ r  : "rock" ,
  p  : "paper",
  sc : "scissors",
  l  : "lizard",
  sp : "spock"
};
const WINNING_MOVES =
{ rock     : ["scissors", "lizard"],
  paper    : ["spock"   , "rock"  ],
  scissors : ["paper"   , "lizard"],
  lizard   : ["spock"   , "paper" ],
  spock    : ["scissors", "rock"  ]
};

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    weightedChoices : [],

    chooseMove(history) {
      if (history.length === 0) {
        const randomIndex = Math.floor(Math.random() *
                            Object.values(MOVES).length);
        this.move = Object.values(MOVES)[randomIndex];
      } else {
        const lastRoundHistory = history[history.length - 1];
        const lastHumanMove = lastRoundHistory.humanMove;
        const beatsLastHumanMove = Object.keys(WINNING_MOVES).filter(move => {
          return WINNING_MOVES[move].includes(lastHumanMove);
        });

        this.weightedChoices = this.weightedChoices.concat(beatsLastHumanMove);

        const randomIndex = Math.floor(Math.random() *
                            this.weightedChoices.length);
        this.move = this.weightedChoices[randomIndex];
      }
    },
  };

  return Object.assign(playerObject, computerObject);
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    mapChoice(choice) {
      if (Object.keys(MOVES).includes(choice)) {
        return MOVES[choice];
      } else {
        return choice;
      }
    },

    chooseMove() {
      let choice;

      while (true) {
        console.log('Please choose (r)ock, (p)aper, (sc)issors, (l)izard, or (sp)ock:');
        choice = rls.question().toLowerCase();
        if (Object.keys(MOVES).includes(choice) ||
            Object.values(MOVES).includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = this.mapChoice(choice);
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPS = {
  human: createHuman('human'),
  computer: createComputer('computer'),
  roundWinner: null,
  history: [],

  displayWelcome() {
    console.log("Welcome to Rock, Papers, Scissors, Lizard, Spock!");
  },

  displayRules() {
    console.log('\nThese are the rules:\n1) SCISSORS cuts paper and decapitates lizard.\n2) PAPER covers rock and disproves Spock.\n3) ROCK smashes scissors and crushes lizard\n4) LIZARD eats paper and poisons Spock\n5) SPOCK vaporizes rock and destroys scissors\nThe first player to win 5 rounds of Rock, Paper, Scissors will win the match! ');
    console.log('\nPlease hit any key to begin: ');
    rls.question();
  },

  displayGoodbye() {
    console.log('\nThanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!\n');
  },

  determineWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (WINNING_MOVES[humanMove].includes(computerMove)) {
      this.roundWinner = 'human';
    } else if (WINNING_MOVES[computerMove].includes(humanMove)) {
      this.roundWinner = 'computer';
    } else {
      this.roundWinner = 'tie';
    }
  },

  displayRoundWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (this.roundWinner === 'human') {
      console.log('You win!');
    } else if (this.roundWinner === 'computer') {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer;
    while (true) {
      answer = rls.question().toLowerCase();
      if (['yes','no', 'y', 'n'].includes(answer)) break;
      console.log('Please enter (y)es to play again or (n)o to exit: ');
    }

    return answer.toLowerCase()[0] === 'y';
  },

  playRound() {
    this.human.chooseMove();
    this.computer.chooseMove(this.history);
    this.determineWinner();
    console.clear();
    this.displayRoundWinner();
  },

  updateMatchScore() {
    if (this.roundWinner === 'human') {
      this.human.score += 1;
    } else if (this.roundWinner === 'computer') {
      this.computer.score += 1;
    }
  },

  displayMatchWinner(winningScore) {
    if (this.human.score === winningScore) {
      console.log('\nCongratulations! You won the match!\n');
    } else if (this.computer.score === winningScore) {
      console.log('\nBetter luck next time. The computer won this match.\n');
    }
  },

  displayScore() {
    console.log(
      `\nCURRENT SCORE:\n${'-'.repeat('CURRENT SCORE'.length)}\nYou: ${this.human.score}\nComputer: ${this.computer.score}\n`);
  },

  updateHistory() {
    let roundHistory = { humanMove: this.human.move,
      computerMove: this.computer.move,
      winner: this.roundWinner};

    this.history.push(roundHistory);
  },

  clearPlayerScores() {
    this.human.score = 0;
    this.computer.score = 0;
  },

  playMatch() {
    const WINNING_SCORE = 5;

    while (true) {
      console.clear();
      this.clearPlayerScores();

      while (true) {
        this.displayScore();
        this.playRound();
        this.updateMatchScore();
        this.updateHistory();
        // console.log('HISTORY:' + JSON.stringify(this.history));

        if (this.human.score === WINNING_SCORE ||
            this.computer.score === WINNING_SCORE) break;
      }

      this.displayScore();
      this.displayMatchWinner(WINNING_SCORE);
      if (!this.playAgain()) break;
    }
  },

  runGameEngine() {
    console.clear();
    this.displayWelcome();
    this.displayRules();
    this.playMatch();
    this.displayGoodbye();
  }
};

RPS.runGameEngine();
