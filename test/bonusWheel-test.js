import chai from 'chai'
import BonusWheel from '../src/js/bonusWheel';
const expect = chai.expect;


describe('BonusWheel', () => {

  let bonusWheel;
  beforeEach(() => {
    bonusWheel = new BonusWheel();
  });

  it('should have a default state', () => {
    expect(bonusWheel.currentValue).to.be.equal(0);
    expect(bonusWheel.values).to.be.deep.equal([]);
    expect(bonusWheel.prizes).to.be.an('array');
    expect(bonusWheel.prizes).to.have.lengthOf(6);
  });

  it('should update the prizes for the Bonus Round', () => {
    expect(bonusWheel.values).to.deep.equal([]);
    expect(bonusWheel.prizes).to.include('trip to anatomy park', 'your own personal morty', 'a broken portal gun', 'butter-serving robot', 'a meeseeks box', 'one month interdimensional cable');
    bonusWheel.changePrizes();
    expect(bonusWheel.prizes).to.have.lengthOf(5);
  });

})