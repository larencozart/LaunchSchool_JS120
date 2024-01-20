/* eslint-disable max-lines-per-function */
// Practice Problems: Object Orientation

// 1. Suppose we want to use code to keep track of products
//    in our hardware store's inventory. A first stab might
//    look something like this:

// This code presents a number of problems, however. What if
// we want to add another kind of drill? Given what we've learned
// about object orientation in the previous assignment, how could
// we use objects to organize these two groups of data?

function makeProduct (id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

    adjustPrice(newPrice) {
      if (newPrice < 0) {
        console.log('Invalid entry for new price. Please enter a price that is at least $0.00 or greater.');
      } else {
        this.price = newPrice;
      }
    },

    describe() {
      console.log(`Name: ${this.name}`);
      console.log(`ID: ${this.id}`);
      console.log(`Price: ${this.price}`);
      console.log(`Stock: ${this.stock}`);
    }
  };
}

let scissors = makeProduct(0, 'Scissors', 8, 10);
let drill1 = makeProduct(1, 'Cordless Drill', 15, 45);
let drill2 = makeProduct(2, 'Power Drill', 10, 60);

// 2. Our new organization also makes it easier to write functions
//    dealing with the products, because we can now take advantage
//    of conventions in the objects' data. Create a function that
//    takes one of our product objects as an argument, and sets the
//    object's price to a non-negative number of our choosing, passed
//    in as a second argument. If the new price is negative, alert the
//    user that the new price is invalid.

function adjustPrice(obj, newPrice) {
  if (newPrice < 0) {
    console.log('Invalid entry for new price. Please enter a price that is at least $0.00 or greater.');
  } else {
    obj.price = newPrice;
  }
}

adjustPrice(scissors, -1);
// console.log(scissors.price);

// 3. It would also be useful to have the ability to output
//    descriptions of our product objects. Implement such a
//    function following the example below:

// eslint-disable-next-line no-unused-vars
function describeProduct(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let propToCapitalized = prop[0].toUpperCase() + prop.slice(1);
      console.log(`=> ${propToCapitalized}: ${obj[prop]}`);
    }
  }
}

// describeProduct(scissors);
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8

// 4. We want our code to take an object-oriented approach to
//    keeping track of the products, and although the functions
//    we just wrote work fine, since they are manipulating data
//    in the objects, we should place them in the objects themselves.
//    Rewrite the code such that the functions describeProduct and
//    setProductPrice become methods describe and setPrice on both
//    our scissors and drill objects.

scissors.adjustPrice(9.99);
drill1.adjustPrice(45.99);
drill2.adjustPrice(65.99);
console.log(scissors.price, drill1.price, drill2.price);

scissors.describe();
drill1.describe();
drill2.describe();