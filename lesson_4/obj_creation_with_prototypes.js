// Practice Problems: Object Creation with Prototypes

// 1. Use a factory function to create pet objects. The factory
//    should let us create and use pets like this:

function createPet(animal, name) {
  return {
    animal,
    name,

    sleep() {
      console.log('I am sleeping');
    },

    wake() {
      console.log('I am awake');
    }
  };
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

// 2. Use the OLOO pattern to create an object prototype that we
//    can use to create pet objects. The prototype should let us
//    create and use pets like this:

let PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  }
};

let pudding2 = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding2.animal}. My name is ${pudding2.name}.`);
pudding2.sleep(); // I am sleeping
pudding2.wake();  // I am awake

let neptune2 = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune2.animal}. My name is ${neptune2.name}.`);
neptune2.sleep(); // I am sleeping
neptune2.wake();  // I am awake

// Practice Problems: Subtyping with Classes

// 2. Let's practice creating a class hierarchy.
// Create a class named Greeting that has a single method named greet.
// The method should take a string argument, and it should print that
// argument to the console.

// Now, create two more classes that inherit from Greeting:
//  one named Hello, and the other Goodbye. The Hello class
//  should have a hi method that takes no arguments and logs
// "Hello". The Goodbye class should have a bye method that logs
// "Goodbye". Use the greet method from the Greeting class when
// implementing Hello and Goodbye; don't call console.log from
// either Hello or Goodbye.

class Greeting {
  greet(str) {
    console.log(str);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let hiGreeter = new Hello();
let byeGreeter = new Goodbye();

hiGreeter.hi();
byeGreeter.bye();