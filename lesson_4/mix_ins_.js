/* eslint-disable no-unused-vars */
// 1. If we have a Car class and a Truck class, how can
//    you use the Speed object as a mix-in to make them goFast?
//    How can you check whether your Car or Truck can now go fast?

const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed);

let car1 = new Car();
car1.goFast();

let truck1 = new Truck();
truck1.goFast();

// 3. Modify the class definitions and move code into a mix-in,
//    as needed, to share code between the Catamaran and the wheeled
//    vehicle classes.
//    we still want to share the code for tracking fuel efficiency and range.

let Range = {
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
};

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}
Object.assign(WheeledVehicle.prototype, Range);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}
Object.assign(Catamaran.prototype, Range);

let car = new Auto();
console.log(car.range());

let motorcyle = new Motorcycle();
console.log(motorcyle.range());

let catamaran = new Catamaran(3, 3, 50, 25.0);
console.log(catamaran.range());
