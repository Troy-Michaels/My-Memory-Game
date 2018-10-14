/* variables declared */
let card, cards, matchingCards, selectedCards, moves, movementCounter, starsList, modal, second, minute, timer, interval, trigger, closeButton;

/* variable for cards declared */
card = document.getElementsByClassName('card');

/* variable for cards array */
cards = [...card]

/* variable for matched cards */
matchingCards = document.getElementsByClassName('match');

/* variable for all cards selected */
selectedCards = [];

/* variable setting the number of moves to zero */
moves = 0;

/* variable for the movement */
movementCounter = document.querySelector('.moves');

/* variable for star score */
starsList = document.querySelectorAll('.stars li');

/* variable for a pop up modal */
modal = document.querySelector('.modal');

/* variables declared for time and timer function */
second = 0;
minute = 0;
timer = document.querySelector('.timer');
interval;

/* variable for closing modal */
closeButton = document.querySelector('.close-button');

/* variable declared for the deck of cards */
const deck = document.getElementById('card-deck');

/* variable declared for the three listed stars */
const stars = document.querySelectorAll('.fa-star');

/* variable declared function that toggles open, show, and disabled for cards flipped */
let cardReveal = function(){
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/* runs startGame function when window is loaded */
window.onload = startGame();

/* function to resets the board. Shuffles cards, resets the timer, and removes classes from previous cards */
function startGame(){
  cards = shuffle(cards);

  var timer = document.querySelector('.timer');
  timer.innerHTML = '0 minutes 0 seconds';
  clearInterval(interval);

  for(var i=0; i<cards.length; i++){
    [].forEach.call(cards, function(item){
      deck.appendChild(item);
    });
    cards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
}

/* function for flipped cards. Adds flipped cards to selectedCards array and verifies if paired cards are matching or not matching */
function flipCard(){
  selectedCards.push(this);

  var x = selectedCards.length;
  if(x === 2){
    if(selectedCards[0].type === selectedCards[1].type){
      cardsMatching();
    } else {
      cardsNotMatching();
    }
    moveCounter();
  }
};

/* function for matching flipped cards. Adds and removes properties from cards and rests array of selectedCards */
function cardsMatching(){
  selectedCards[0].classList.add('match');
  selectedCards[1].classList.add('match');
  selectedCards[0].classList.remove('show', 'open');
  selectedCards[1].classList.remove('show', 'open');
  selectedCards = [];
}

/* function for when flipped cards are not matching. Adds properties and runs disable() function to disable cards. Then runs SetTimeout function to remove properties from cards and reenable cards for selection. resets array of selected cards */
function cardsNotMatching(){
  selectedCards[0].classList.add('unmatched');
  selectedCards[1].classList.add('unmatched');
  disable();

  setTimeout(function(){
    selectedCards[0].classList.remove('show', 'open', 'unmatched');
    selectedCards[1].classList.remove('show', 'open', 'unmatched');
    enable();
    selectedCards = [];
  },700);
}

/* function to disable cards for selection */
function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

/* function to remove disable from cards for selection */
function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for(var i=0; i< matchingCards.length; i++){
      matchingCards[i].classList.add('disabled');
    }
  });
}

/* functon to count plater moves.Stars are removed from rating if the number of moves exceeds alloted movement. Timer is also reset to 0 m 0 s if movements are less than or equal to one. Runs countDownTimer() */
function moveCounter(){
  moves++;
  movementCounter.innerHTML = moves;
  if(moves > 16 && moves < 20){
    for(i = 0; i < 3; i++){
      if(i > 1){
        stars[i].style.visibility = 'hidden';
      }
    }
  } else if(moves > 21){
    for(i = 0; i < 3; i++){
      if(i > 0){
        stars[i].style.visibility = 'hidden';
      }
    }
  }
  if(moves <= 1){
    seconds =0;
    minute = 0;
    hour = 0;
    countdownTimer();
  }
}

/* function that runs timer. Resets timer and adds +1 for each second and minutes after accumilating +60 seconds and sets seconds back to 0 */
function countdownTimer(){
  interval = setInterval(function (){
    timer.innerHTML = minute + ' minutes ' + second + ' seconds';
    second++;
    if(second == 60){
      minute++;
      second = 0;
    }
  }, 700);
}

/* button to run gameRestart function when the restart button is clicked */
document.getElementById('restart-button').onclick = function() {gameRestart()};

/* function that resets the game board. Cards are shuffled, and removes properties from previous cards. Movement is reset to 0 and star rating is restored. Count down timer is also reset to 0 m 0 s */
function gameRestart(){
  var shuffledCards = shuffle(cards);
  for(var i =0; i < shuffledCards.length; i++){
    deck.innerHTML = '';
    [].forEach.call(shuffledCards, function(item){
      deck.appendChild(item);
    });
    shuffledCards[i].classList.remove('show', 'open', 'match', 'disabled');
  }
  moves = 0;
  movementCounter.innerHTML = moves;
  for(var i =0; i < stars.length; i++){
    stars[i].style.color = '#ffff00';
    stars[i].style.visibility = 'visible';
  }
  var timer = document.querySelector('.timer');
  timer.innerHTML = "0 minutes 0 seconds";
  clearInterval(interval);
  minute = 0;
  second = 0;
}

/* function to toggle the pop up modal */
function toggleModal(){
  modal.classList.toggle('show-modal');
}

/* function  to toggle  the pop up modal */
function windowOnClick(event){
  if(event.target === modal){
    toggleModal();
  }
}

/* function to run gameRestart if selected on pop up modal */
function playAgain(){
  modal.classList.toggle('show-modal');
  gameRestart();
}

/* added event listeners  */
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

/* function ran when game is completed. Counts the number of matched cards, records the time during completion, and toggles the pop up modal.fills modal with movement count, star rating, and the time spent to complete movement. Clears interval */
function gameCompleted(){
  if(matchingCards.length == 16){
    finalTime = timer.innerHTML;
    modal.classList.toggle("show-modal");
    var starRating = document.querySelector('.stars').innerHTML;
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('starRating').innerHTML = starRating;
    document.getElementById('totalTime').innerHTML = finalTime;
    clearInterval(interval);
  };
}

/* for loop that adds EventListeners for each card  */
for (var x=0; x<cards.length; x++){
  card = cards[x];
  card.addEventListener('click', cardReveal);
  card.addEventListener('click', flipCard);
  card.addEventListener('click', gameCompleted);
};
