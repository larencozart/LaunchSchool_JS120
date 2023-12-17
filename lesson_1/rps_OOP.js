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
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      // refactor: allow user to input single letter
      // (map single letter to full word choice)
      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = rls.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
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
  currentWinner: null,

  displayWelcome() {
    console.log("Welcome to Rock, Papers, Scissors!");
  },

  displayGoodbye() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  compare() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (WINNING_MOVES[humanMove].includes(computerMove)) {
      this.currentWinner = 'human';
    } else if (WINNING_MOVES[computerMove].includes(humanMove)) {
      this.currentWinner = 'computer';
    } else {
      this.currentWinner = 'tie';
    }
  },

  // refactor: based on new compare function
  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if (this.currentWinner === 'human') {
      console.log('You win!');
    } else if (this.currentWinner === 'computer') {
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
    // add keep score step
    this.displayWelcome(); // move to playMatch method
    // display rules
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.compare();
      this.displayWinner();
      if (!this.playAgain()) break; // move to playMatch method
    }

    this.displayGoodbye(); // move to playMatch method
  },


  // playMatch() {
  //   const WINNING_SCORE = 5;

  // }
};

RPSGame.playRound();
