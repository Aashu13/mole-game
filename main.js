var holes = document.querySelectorAll('.hole');
var scroeBoard = document.querySelector('.score');
var moles = document.querySelectorAll('.mole');
var lastHole;
var timeUp = false;
var score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomNumber(holes) {
    var idx = Math.floor(Math.random() * holes.length);
    var hole = holes[idx];
    if (hole === lastHole) {
        return randomNumber(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    var time = randomTime(200, 1000);
    var hole = randomNumber(holes);
    hole.classList.add('up');
    setInterval(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scroeBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scroeBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", bonk));