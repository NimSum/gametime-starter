import Wheel from './wheel';
import domUpdates from './domUpdates';

class BonusWheel extends Wheel {
  constructor() {
    super();
    this.prizes = ['trip to anatomy park', 'your own personal morty', 'a meeseeks box', 'a broken portal gun', 'butter-serving robot', 'one month interdimensional cable']
  }

  changePrizes() {
    this.currentValue = super.randomizeValues(this.prizes).pop()
    domUpdates.revealPrize(this.currentValue);
    return this.currentValue;
  }
}

export default BonusWheel;