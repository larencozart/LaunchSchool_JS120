// // Practice Problems - Constructors and Prototypes

// // 1. What does the following code log to the console?
// //    Try to answer without running the code. Can you explain
// //    why the code produces the output it does?

// let RECTANGLE = { // prototype..
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) { // constructor function
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   // this is the context of calling obj RECTANGLE
//   // obj does not have a width or height property...
//   // undefined * undefined = NaN
//   this.perimeter = RECTANGLE.perimeter();
//   // same here - NaN
// }

// let rect1 = new Rectangle(2, 3);

// console.log(rect1.area); // NaN
// console.log(rect1.perimeter); // NaN

// // 2. How would you fix the problem in the code from problem 1?

// function Rectangle2(width, height) { // constructor function
//   this.width = width;
//   this.height = height;
// }

// // not best way to do this, reassigning prototype's obj
// Rectangle2.prototype = { // prototype..
//   area: function() {
//     return this.width * this.height;
//   },
//   perimeter: function() {
//     return 2 * (this.width + this.height);
//   },
// };

// let rect2 = new Rectangle2(2, 3);

// console.log(rect2.area()); // 6
// console.log(rect2.perimeter()); // 10

// // 3. Write a constructor function called Circle that takes a
// //    radius as an argument. You should be able to call an area
// //    method on any objects created by the constructor to get
// //    the circle's area. Test your implementation with the following
// //    code:

// function Circle(radius) {
//   this.radius = radius;
// }

// Circle.prototype.area = function() {
//   return Math.PI * (Math.pow(this.radius, 2));
// };

// let a = new Circle(3);
// let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27
// console.log(a.hasOwnProperty('area')); // => false

// // 4. What will the following code log to the console and why?

// function Ninja() {
//   this.swung = true;
// }

// let ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());
// // should return `true` because the 'ninja' instance's prototype references
// // the constructor's prototype object. If its prototype reference was changed
// // the change should be visible to the instance objects created

// // 5. What will the following code output and why?

// function Ninja5() {
//   this.swung = true;
// }

// let ninja5 = new Ninja5();

// Ninja5.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja5.swingSword());
// look similar except we are reassigning the value held
// at the prototype property of the constructor `Ninja5` to
// a new object. the ninja5 instance still retains its prototype
// as the original obj referenced by Ninja's prototype obj,
// an now can no longer find the method needed

// 6. Implement the method described in the comments below:
// function Ninja6() {
//   this.swung = false;
// }

// // Add a swing method to the Ninja prototype which
// // modifies `swung` and returns the calling object
// Ninja6.prototype.swing = function() {
//   this.swung = true;
//   return this;
// };

// let ninjaA = new Ninja6();
// let ninjaB = new Ninja6();

// console.log(ninjaA.swing().swung);      // logs `true`
// console.log(ninjaB.swing().swung);      // logs `true`

// 7. In this problem, we'll ask you to create a new instance of
//    an object, without having direct access to the constructor function:

let ninja7;

{
  const Ninja7 = function() {
    this.swung = false;
  };

  ninja7 = new Ninja7();
}

// create a `ninjaB` object here; don't change anything else
let protoNinja = Object.getPrototypeOf(ninja7);
// one way, but doesn't put the property in the correct spot
let ninja72 = Object.create(protoNinja);
// correct way
let ninja73 = new ninja7.constructor();

console.log(ninja7.constructor === ninja72.constructor); // => true
console.log(ninja7.constructor === ninja73.constructor); // true
console.log(ninja7.hasOwnProperty('swung')); // true
console.log(ninja72.hasOwnProperty('swung')); // false, property is in prototype
console.log(ninja73.hasOwnProperty('swung')); // true

// 8. Since a constructor is just a function, you can call
//    it without the new operator. However, that can lead to unexpected
//    results and errors, especially for inexperienced programmers.
//    Write a constructor function that you can use with or without
//    the new operator. The function should return the same result
//    with either form. Use the code below to check your solution:

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name1 = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name1);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe