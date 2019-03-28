import $ from 'jquery';

export default {

  updateQInfo(question) {
    $('.category').text(question.category);
    $('.description').text(question.description);
    question.answer.split('').forEach(letter => {
      letter = letter.toUpperCase();
      if (letter === ' ') {
        $('.word-box').append(`<div class="space-box"></div>`);
      } else if (letter === '&' || letter === '-' || letter === "'") {
        $('.word-box').append(`<div class="special-char-box">${letter}</div>`)
      } else {
        $('.word-box').append(`<div class="letter-box"><div class="letter hidden">${letter}</div></div>`);
      }
    })
  },

  loadPossiblePrizes(prizes) {
    $('.possible-prizes').empty();
    $('.possible-prizes').append('<p>Prizes:</p>');
    prizes.forEach(prize => {
      $('.possible-prizes').append(`<span>${prize}</span>`);
    })
  },

  revealPrize(prize, round) {
    $('.prize').text('');
    $('.wheel-img').addClass('spin');
    $('.prize').parent().removeClass('prize-animation');
    setTimeout(() => {
      $('.prize').parent().addClass('prize-animation');
      $('.prize').text(prize);
    }, 1)
    this.hideInputs();
    setTimeout(() => {
      if (round < 5) {
        this.showInput(prize);
      };
      this.showVowels();
      this.showSolveInput();
      $('.wheel-img').removeClass('spin');
    }, 5000);
  },

  showInput(prize) {
    $('.check-btn, .ltr-input').show();
    $('.btn-solve, .buy, .btn-spin').attr('disabled', true)
    if (['BANKRUPT', 'LOSE A TURN'].includes(prize)) {
      $('.check-btn, .ltr-input').hide();
      $('.btn-spin').attr('disabled', false);
    };
  },

  hideInputs: () => {
    $('.input-solve, .final-solution-btn, .check-btn, .ltr-input').hide();
  },

  showSolveInput: () => {
    $('.btn-solve').on('click', function() {
      $('.input-solve, .final-solution-btn').show();
      $('.check-btn, .ltr-input').hide();
    });
  },

  showVowels: () => {
    $('.buy').on('click', function() {
      if ($('#a').is(":disabled")
      && $('#e').is(":disabled")
      && $('#i').is(":disabled")
      && $('#o').is(":disabled")
      && $('#u').is(":disabled")) {
        $('.buy').attr('disabled', true)
        $('.vowels-to-buy').hide();
      } else {
        $('.vowels-to-buy').removeClass('slide-in');
        $('.vowels-to-buy').show();
        $('.vowels-to-buy').addClass('slide-in');
        $('.buy, .btn-spin, .btn-solve').attr('disabled', true);
        $('.input-solve, .final-solution-btn').hide();
        $('.check-btn, .ltr-input').hide();
      }
    });
  },

  getNames() {
    let $p1Name = $('#p1Name').val();
    let $p2Name = $('#p2Name').val();
    let $p3Name = $('#p3Name').val();
    return [$p1Name, $p2Name, $p3Name];
  },

  appendNames() {
    let $p1Name = $('#p1Name-board');
    $p1Name.text($('#p1Name').val());
    let $p2Name = $('#p2Name-board');
    $p2Name.text($('#p2Name').val());
    let $p3Name = $('#p3Name-board');
    $p3Name.text($('#p3Name').val());
    $('.splash').hide();
    $('.game-page, .new-game-btn').show();
    $('.player-section').css('visibility', 'visible');
  },

  getAnswer() {
    return $('.input-solve').val();
  },

  getConsonant() {
    this.hideInputs();
    $('.feedback').show();
    $('.btn-solve, .buy, .btn-spin').attr('disabled', false);
    return $('.ltr-input').val().toUpperCase();
  },

  getBoard() {
    return $('.hidden')
  },

  clearClass(e) {
    $(e).removeClass('hidden')
  },

  updateScore(player, score) {
    switch (player) {
    case 0:
      $('.p1-score').text(score);
      break;
    case 1:
      $('.p2-score').text(score);
      break;
    default:
      $('.p3-score').text(score);
    }
  },

  updateBank(player, score) {
    switch (player) {
    case 0:
      $('.p1-bank').text(score);
      break;
    case 1:
      $('.p2-bank').text(score);
      break;
    default:
      $('.p3-bank').text(score);
    }
  },

  appendLetters(letters) {
    $('.letters-used').empty();
    letters.forEach(ltr => {
      $('.letters-used').append(ltr)
    })
  },

  correctAns() {
    $('.word-box').hide();
    $('.feedback').text('Finally!');
    $('.feedback').append(`<img class="gif" src="https://media.giphy.com/media/liBsVeLILcyaY/giphy.gif">`)
    setTimeout(() => this.hideGifs(), 2500)
  },

  wrongAns() {
    $('.word-box').hide();
    $('.feedback').text('Morty! No!');
    $('.feedback').append(`<img class="gif" src="https://media.giphy.com/media/3oEdv8roQZywBIT7mE/giphy.gif" >`)
    setTimeout(() => this.hideGifs(), 2500)
  },

  showAnser() {
    $('.hidden').removeClass('hidden');
  },

  hideGifs() {
    $('.word-box').show()
    $('.feedback').hide()
  },

  updateActivePlayer(i) {
    switch (i) {
    case 0:
      $('.p1-bank').parent().parent().addClass('active');
      $('.p2-bank, .p3-bank').parent().parent().removeClass('active');
      break;
    case 1:
      $('.p2-bank').parent().parent().addClass('active');
      $('.p1-bank, .p3-bank').parent().parent().removeClass('active');
      break;
    default:
      $('.p3-bank').parent().parent().addClass('active');
      $('.p1-bank, .p2-bank').parent().parent().removeClass('active');
    }
  },
  
  clearFields() {
    $('.word-box, .letters-used, .feedback').empty();
    $('.vowels-to-buy').children().attr('disabled', false);
  },

  setDefaultNames() {
    if ($('#p1Name').val() === '') {
      $('#p1Name').val('Morty');
    } 
    if ($('#p2Name').val() === '') {
      $('#p2Name').val('Mr. Poopy Butthole');
    } 
    if ($('#p3Name').val() === '') {
      $('#p3Name').val('Pickle Rick');
    } 
  },

  showBonusRound() {
    $('.bonus-round').removeClass('popup');
    $('.game-page').css('opacity', '.5');
  },

  closePopup() {
    $('.game-page').css('opacity', '1');
    $('.bonus-round').hide();
  },

  bonusRound() {
    $('.used-ltr-container, .btn-solve, .buy').hide();
    $('.prize').text('Spin for Bonus!');
    this.showBonusPrizes();
    $('.spin-pop-up').append(`<div class="bonus-box">
    <input class="bonus-cons-1" type="text" maxlength="1">
    <input class="bonus-cons-2" type="text" maxlength="1">
    <input class="bonus-cons-3" type="text" maxlength="1">
    <button class="bonus-vowel" id="bonus-a">A</button>
    <button class="bonus-vowel" id="bonus-e">E</button>
    <button class="bonus-vowel" id="bonus-i">I</button>
    <button class="bonus-vowel" id="bonus-o">O</button>
    <button class="bonus-vowel" id="bonus-u">U</button>
    <button class="bonus-submit" >submit choices</button>
    </div>`)
    $('.bonus-vowel').click( (e) => {
      $(e.target).addClass('bonus-vowel-select');
      $('.bonus-vowel').attr('disabled', true);
    })
  },

  getBonusLetters() {
    let letters = [];
    letters.push(
      $('.bonus-vowel-select').text(),
      $('.bonus-cons-1').val(),
      $('.bonus-cons-2').val(),
      $('.bonus-cons-3').val()
    );
    return letters;
  },

  showBonusPrizes: () => {
    $('.word-box').hide();
    $('.bonus-prizes').show();
    let prizes = ['trip to anatomy park', 'your own personal morty', 'a meeseeks box', 'a broken portal gun', 'butter-serving robot', 'one month interdimensional cable'];
    $('.bonus-prizes').append(`<h3>Bonus Prizes</h3>`)
    prizes.forEach(prize => $('.bonus-prizes').append(`<span>${prize}</span>`));
    $('.btn-spin').click( () => {
      $('.word-box').show();
      $('.bonus-prizes').empty();
    });
  }
  
}