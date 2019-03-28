import $ from 'jquery';

import './sass/index.scss';

import './images/portal.png';
import './images/Morty.png';
import './images/Mr_poopy_butthole.png';
import './images/Pickle_rick.png';

import Game from './js/game';
import domUpdates from './js/domUpdates';

$(document).ready( () => {
  const game = new Game();
  
  $('.start-btn').click( () => {
    domUpdates.setDefaultNames();
    game.startRound();
  });
  
  $('.final-solution-btn').click( () => {
    if ($('.input-solve').val() !== '') {
      game.validateAnswer();
      $('.input-solve, .final-solution-btn').hide();
      $('.feedback').show();
    }
  });
  
  $('.btn-spin').click( () => {
    game.generatePrize();
  });

  $('.check-btn').on('click', () => {
    let vowels = ['A', 'E', 'I', 'O', 'U']
    if (vowels.includes($('.ltr-input').val().toUpperCase())) {
      return;
    } else if ($('.ltr-input').val() !== '') {
      game.checkConsonant();
      $('.ltr-input').val('')
    }
  });

  $('.btn-solve').click( () => {
    $('.btn-solve, .buy, .btn-spin').attr('disabled', false);
    $('.guess-cons, .input-solve, .final-solution-btn').hide();
    $('.ltr-input, .input-solve').val('');
    $('.feedback').show();
  });

  $('.btn-solve, .buy, .btn-spin').click(() => {
    $('.feedback').hide()
  });

  $('.new-game-btn').click(() => {
    location.reload()
  });

  $('.vowels-to-buy').click((e) => {
    game.checkConsonant(e.target.textContent);
    $(e.target).attr('disabled', true);
    $('.vowels-to-buy').hide();
    $('.btn-solve, .buy, .btn-spin').attr('disabled', false);
  });

  $('.btn-popup').on('click', () => {
    domUpdates.closePopup();
    domUpdates.bonusRound();
  });

  $('.spin-pop-up').click( (e) => {
    let btn = e.target.textContent;
    if (btn === 'submit choices') {
      let letters = domUpdates.getBonusLetters();
      $('.bonus-box').hide();
      letters.forEach(letter => {
        game.checkConsonant(letter.toUpperCase());
        domUpdates.hideGifs();
      });
      $('.input-solve').val('');
      $('.input-solve, .final-solution-btn').show();
    } 
  });
})


