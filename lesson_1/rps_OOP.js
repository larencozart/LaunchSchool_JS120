

function createPlayer(playerType) {
  return {
    playerType,
    // possible state: player current move

    choose() {
      if (this.isHuman()) {
        //
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
      }
    },
  };
}

function createMove() {
  return {
    // possible state: type of move
  };
}

function createRule() {
  return {
    //
  };
}

let compare = (move1, move2) => {
  //
};

const RPSGame = {
  human: createPlayer('human'),
  computer: createPlayer('computer'),

  displayWelcome() {
    console.log("Welcome to Rock, Papers, Scissors!");
  },

  displayGoodbye() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  play() {
    this.displayWelcome();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    this.displayGoodbye();
  },
};

RPSGame.play();