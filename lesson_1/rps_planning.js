/*
general OOP ideas
- noun = state/ object
- verb = method


Description:
RPS is a two-player game where each player chooses one of three
possible moves: rock, paper, or scissors. The winner is chosen
by comparing their moves with the following rules:

1. Rock crushes scissors, i.e., rock wins against scissors.
2. Scissors cuts paper, i.e., scissors beats paper.
3. Paper wraps rock, i.e., paper beats rock.
4. If the players chose the same move, the game is a tie.

Additionally, the game keeps score so that the player who wins
5 rounds (individual games) wins the match

nouns:
- player
- move
- rule
- round
- history

verbs:
- choose
- compare


classes:
- player class
    - subclasses: computer, human

- object types
    - player type
    - humanPlayer type
    - computerPlayer type


KEEP SCORE FEATURE
-------------------
* add score as a property to each player's object
  - if score reaches winning_score, match is won
  - display match winner

function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

KEEP HISTORY FEATURE
---------------------
- can be stored in RPSGame object as a state
- creating a history that is neutral, but holds info that
  computer can use to adjust moves

data str: array holding objects
[ {humanMove: 'rock', computerMove: 'scissors', winner: 'human' },
  {humanMove: 'rock', computerMove: 'paper', winner: 'computer' },
  { }, etc. ]


- at end of each round, create object with properties: humanMove,
  computerMove, and winner. append that object to history array


ADJUST COMPUTER MOVE BASED ON HISTORY
-------------------------------------
1. select history objects from history array that have a winner property
   value of 'human'
2. perform analysis:


*/