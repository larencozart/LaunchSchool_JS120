/* eslint-disable indent */
// Practice Problems: Implicit and Explicit Function Execution Contexts

// 1. What will the following code output?
function func() {
  return this; // reference to 'global' object
}

let context = func(); // retrun value of func() invocation, a reference to 'global' object

console.log(context); // 'global' or undefined

// 2. What will the following code output? Explain the difference,
//    if any, between this output and that of problem 1.
let obj = {
  func: function() {
    return this;
  },
};

let context2 = obj.func(); // return val of invoking func method from obj,
                          // => reference to the obj 'obj'

console.log(context2); // obj {func: [function]}

// 3. What will the following code output?
// eslint-disable-next-line no-undef
message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage(); // context is global scope (function invocation)
                  // message is prop of global scope
                  // message value will log

let foo = {
  message: 'Hello from the function scope!',
};

foo.deliverMessage = deliverMessage;
// sets the method 'deliverMessage' to foo obj with value
// of reference to deliverMessage function
// this context will now be obj 'foo'

foo.deliverMessage(); // message prop will read from foo's message prop

// 5. Take a look at the following code snippet. Use call to
//    invoke the add method but with foo as execution context.
//    What will this return?

let foo5 = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add: function() {
     return this.a + this.b;
   },
};

let answer = bar.add.call(foo5); // returns 3
console.log(answer);

// Practice Problems: Hard Binding Functions with Contexts

// 2. What will the following code log to the console?
let obj2 = {
  message: 'JavaScript',
};

function foo2() {
  console.log(this.message);
}

foo2.bind(obj2); // returns a new function, does not get invoked at the same time.
                 // logs nothing to the console

// 3. What will the following code output?
let obj3 = {
  a: 2,
  b: 3,
};

function foo3() {
  return this.a + this.b;
}

let bar3 = foo3.bind(obj3); // returns new ref to foo func bound to obj context

console.log(foo3()); // logs NaN (undefined + undefined is NaN)
console.log(bar3()); // logs 5

// 4. What will the code below log to the console?

let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo4() {
  console.log(this.message);
}

let bar4 = foo4.bind(positivity);
// returns new ref to foo4 func with context
// as positivity obj

negativity.logMessage = bar4;
// sets new prop 'logMessage' on negativity obj
// logMessage receives ref to newly bound fun foo4 with context positivity
// message property will be from in positivity obj
negativity.logMessage();
// will log JavaScript makes sense!

// 5. What will the code below output?
let obj5 = {
  a: 'Amazebulous!',
};
let otherObj5 = {
  a: "That's not a real word!",
};

function foo55() {
  console.log(this.a);
}

let bar5 = foo55.bind(obj5); // set to new func ref of foo55 bound to obj5

bar5.call(otherObj5);
// will use the function ref'd by bar5, and will invoke it
// with permanently bound obj5 as context
// log will be the val of prop a in obj5