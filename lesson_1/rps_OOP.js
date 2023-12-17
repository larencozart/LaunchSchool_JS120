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

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let randomIndex = Math.floor(Math.random() * Object.values(MOVES).length);
      this.move = Object.values(MOVES)[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function mapChoice(choice) {
  if (Object.keys(MOVES).includes(choice)) {
    return MOVES[choice];
  } else {
    return choice;
  }
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      // refactor: allow user to input single letter
      // (map single letter to full word choice)
      while (true) {
        console.log('Please choose (r)ock, (p)aper, (sc)issors, (l)izard, or (sp)ock:');
        choice = rls.question().toLowerCase();
        if (Object.keys(MOVES).includes(choice) ||
            Object.values(MOVES).includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = mapChoice(choice);
    },
  };

  return Object.assign(playerObject, humanObject);
}

// function createMove() {
//   return {
//     // possible state: type of move
//   };
// }

// function createRule() {
//   return {
//     //
//   };
// }

const RPSGame = {
  human: createHuman('human'),
  computer: createComputer('computer'),
  roundWinner: null,

  displayWelcome() {
    console.log("Welcome to Rock, Papers, Scissors, Lizard, Spock!");
  },

  displayRules() {
    console.log('\nThese are the rules:\n1) SCISSORS cuts paper and decapitates lizard.\n2) PAPER covers rock and disproves Spock.\n3) ROCK smashes scissors and crushes lizard\n4) LIZARD eats paper and poisons Spock\n5) SPOCK vaporizes rock and destroys scissors\nThe first player to win 5 rounds of Rock, Paper, Scissors will win the match! ');
  },

  displayGoodbye() {
    console.log('Thanks for playing Rock, Paper, Scissors, Lizard, Spock. Goodbye!');
  },

  compare() {
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
    let answer = rls.question();
    return answer.toLowerCase()[0] === 'y';
  },

  playRound() {
    this.human.choose();
    this.computer.choose();
    this.compare();
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

  playMatch() {
    const WINNING_SCORE = 5;

    while (true) {
      console.clear();
      this.displayWelcome();
      this.displayRules();

      while (true) {
        this.displayScore();
        this.playRound();
        this.updateMatchScore();

        if (this.human.score === WINNING_SCORE ||
            this.computer.score === WINNING_SCORE) break;
      }

      this.displayScore();
      this.displayMatchWinner(WINNING_SCORE);
      if (!this.playAgain()) break;
    }

    this.displayGoodbye();
  }
};

RPSGame.playMatch();
