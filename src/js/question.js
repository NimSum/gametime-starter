import domUpdates from './domUpdates';
import Player from './player'

class Question {
  constructor(answer, ansLength, splitAns, description, category) {
    this.answer = answer;
    this.ansLength = ansLength;
    this.ansSplit = splitAns;
    this.description = description;
    this.category = category;
  }

}

export default Question;