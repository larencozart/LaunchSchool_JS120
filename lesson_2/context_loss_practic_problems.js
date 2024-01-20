// Practice Problems: Dealing with Context Loss

// 1. The code below should output "Christopher Turk is a Surgeon".
// Without running the code, what will it output? If there is a
// difference between the actual and desired output, explain the difference.

// 2. Modify the program from the previous problem so that
//  logReturnVal accepts an additional context argument. If you
//  then run the program with turk as the context argument, it
//  should produce the desired output.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
  // getDescription: a method that returns a string
  // this within a method has a default reference as the object
  // that will call the method when invoked
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  // saves the return value of invoking func argument to variable
  console.log(returnVal);
  // logs the return value that is saved
}

logReturnVal(turk.getDescription, turk);
// method being called on turk object is passed an argument to logReturnVal
// the expression 'turk.getDescription' is called and its return val
// is stored in the local var 'returnVal'
// `this` has its context stripped when the method is passed as an arg

// 3. Suppose that we want to extract getDescription from turk,
// but we always want it to execute with turk as its execution context.
// How would you modify your code to do that?

let getTurkDescription = turk.getDescription.bind(turk);
logReturnVal(getTurkDescription);

// 4./5./6./7. Consider the following code:
// Will this code produce the following output? Why or why not?
// The Elder Scrolls: Arena
// The Elder Scrolls: Daggerfall
// The Elder Scrolls: Morrowind
// The Elder Scrolls: Oblivion
// The Elder Scrolls: Skyrim

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    // let self = this;
    this.titles.forEach(title => {
      // function nesting reassigns context for `this`
      // to the default context of a function (global object)
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
// should log undefined : title
// functions lose their surrounding context when used as arguments
// to another function

// 8. Consider the following code:
// What will the value of foo.a be after this code runs?
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
      // this has context of global scope
      // functions that are nested or passed as arguments
      // within a method lose/ do not use surrounding context
    }

    increment.call(this); // calls the inner function to execute
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a); // val will be0