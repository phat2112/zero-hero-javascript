"user strict";
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed = this.speed + 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed = this.speed - 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get carSpeed() {
    return this.speed;
  }

  set addSpeed(speed) {
    this.speed = this.speed + speed;
  }

  static hey() {
    console.log("hey thereeeee");
  }
}

// Car.hey();
const car1 = new Car("bmw", 120);
const car2 = new Car("mercedes", 95);

car1.accelerate();
car1.accelerate();
car1.brake();

car2.accelerate();
car2.accelerate();
car2.accelerate();
car2.brake();
car2.addSpeed = 20;

class NewCar {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUs() {
    return (this.speed /= 1.6);
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const newCar1 = new NewCar("bmw", 120);

newCar1.speedUs;

newCar1.speedUs = 140;

newCar1.speedUs;

console.log(`newCar1.speedUs`, newCar1.speedUs);

// function constructor

const fnCar = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

fnCar.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};

fnCar.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

const ev = function (charge, make, speed) {
  fnCar.call(this, make, speed);
  this.charge = charge;
};

ev.prototype.chargeTo = function (charge) {
  this.charge = charge;
};

ev.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} with a charge of ${this.charge}`
  );
};

const tesla = new ev("1%", "Tesla", 120);
tesla.chargeTo(23);
tesla.accelerate();
console.log(`tesla`, tesla);

class EvCarCl extends Car {
  #charge = 0;
  constructor(make, speed, charge) {
    super(make, speed);
    this.make = make;
    this.speed = speed;
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} with a charge of ${this.#charge}`
    );
  }

  chargeBattery = function (charge) {
    this.#charge = charge;
  };
}

const rivian = new EvCarCl("Rivian", 120, 23);
console.log(`rivian`, rivian);
rivian.accelerate();
rivian.chargeBattery(50);
rivian.accelerate();
