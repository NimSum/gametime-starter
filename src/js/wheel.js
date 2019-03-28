import data from './data';
import domUpdates from './domUpdates';

class Wheel {
  constructor() {
    this.currentValue = 0;
    this.values = [];
  }
  
  spin(round) { 
    this.values.push(...this.randomizeValues(data.wheel).slice(0, 6));
    this.currentValue = this.randomizeValues(this.values).pop();
    domUpdates.revealPrize(this.currentValue, round);
    return this.currentValue;
  }

  randomizeValues(array) {
    return array.sort(() => 0.5 - Math.random());
  }
}

export default Wheel;