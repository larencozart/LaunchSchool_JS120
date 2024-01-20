/* eslint-disable max-len */
// PROTOTYPE PRACTICE PROBLEMS
// 1. What will the following code log to the console?
//    Explain why it logs that value. Try to answer without running the code.

let qux = { foo: 1 };
let baz = Object.create(qux);
// console.log(baz.foo + qux.foo);

// The output should evaluate to 2. The `+` will add two operands
// when both are numbers. The object `baz` has inherited access to the property
// defined in the prototype object `qux`, and so the expression `baz.foo +
// qux.foo` will evaluate to `1 + 1`, and therefore 2 will be output.
// ** Importantly, since baz doesn't have its own property 'foo', JS will
// look up the prototype chain to find where foo is defined, and will use
// the value at the first property with that identifier that it finds

// 2. What will the following code log to the console? Explain why it logs
//    that value.

let qux2 = { foo: 1 };
let baz2 = Object.create(qux2);
baz2.foo = 2;

// console.log(baz2.foo + qux2.foo);

// The following will log 3, as 2 + 1 evaluates to 3. On line 3, when the property
// 'foo' is accessed by the 'bar' object and assigned the value 2, it is not a 
// reassingment of the property 'foo' on the prototype 'qux'. Rather, the JS engine
// assumes that we are trying to access and reassign a property on the baz obj, and
// therefore, it set the property 'foo' on the baz object with a val of 2.
// ** property assignment does not use the prototype chain

// 3. What will the following code log to the console? Explain why it logs that value. 

let qux3 = { foo: 1 };
let baz3 = Object.create(qux3);
qux3.foo = 2;

// console.log(baz3.foo + qux3.foo);

// The following will log 4 to the console. Because 'foo' is already a defined
// prop on the qux obj, line 37 shows a reassingment of the prop's value from 
// 1 to 2. Additionally, when baz accesses this property, since inheriting obj's
// delegate access to properties to their prototype, the property's value is 2 for
// baz as well as for qux
// * importantly, objects hold a reference to their prototype, therefore if a 
// property's value is altered in the prototype, that alteration will be seen 
// in the inheriting objects as well.

// 4. As we saw in problem 2, the following code creates a new property
//    in the baz object instead of assigning the property in the prototype object.
let qux4 = { foo: 1 };
let baz4 = Object.create(qux4);
baz4.foo = 2;
// Write a function that searches the prototype chain of an object for
// a given property and assigns it a new value. If the property does not
// exist in any of the prototype objects, the function should do nothing.
// The following code should work as shown:

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

function assignProperty(obj, prop, val) {
  while (true) {
    if (!Object.getPrototypeOf(obj)) return;

    if (obj.hasOwnProperty(prop)) {
      obj[prop] = val;
      return;
    } else {
      obj = Object.getPrototypeOf(obj);
    }
  }
}

assignProperty(fooC, "bar", 2);
// console.log(fooA.bar); // 2
// console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
// console.log(fooA.qux); // undefined
// console.log(fooC.qux); // undefined
// console.log(fooA.hasOwnProperty("qux")); // false
// console.log(fooC.hasOwnProperty("qux")); // false

// 5. Consider the following two loops:
// If foo is an arbitrary object, will these loops always log
// the same results to the console? Explain why they do or do not.
// If they don't always log the same information, show an example
// of when the results differ.

let protoFoo = {a: 1, b: 2 };
let foo = Object.create(protoFoo);
foo.c = 3;
foo.d = 4;

// for (let property in foo) {
//   console.log(`FOR/IN LOOP: ${property}: ${foo[property]}`);
// }

// Object.keys(foo).forEach(property => {
//   console.log(`OBJ.KEYS LOOP: ${property}: ${foo[property]}`);
// });

// for/in loops will output all the objects own properties and all of its
// inherited properties (as long as the properties are enumerable).
// Object.keys however, will only iterate over the object's own properties
// and will ignore inherited properties. In my example
// the first loop will log 4 lines of property value pairs, while the second
// loop will log two line of pairs. It also looks like the for in loop will
// first iterate over the calling obj's own keys, then move up the prototype
// chain to iterate over the keys of the immediate next prototype

// 6. How do you create an object that doesn't have a prototype? How can you determine
// whether an object has a prototype?

let obj = Object.create(null);
obj.prop = 'value';
console.log(obj);

console.log(Object.getPrototypeOf(obj) === null);