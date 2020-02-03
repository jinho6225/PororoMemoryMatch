var gameCards = document.querySelector("#gameCards")
var game = document.querySelector(".game")
var gameSelect = document.querySelector("#gameSelect")

var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;

function handleClick(e) {
  if (!e.target.className.includes("card-back")) {
    return;
  }
  if (!firstCardClicked) {
    e.target.classList.add("hidden")
    firstCardClicked = e.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className
  } else {
    e.target.classList.add("hidden")
    secondCardClicked = e.target
    secondCardClasses = secondCardClicked.previousElementSibling.className
    gameCards.removeEventListener('click', handleClick)
    if (firstCardClasses === secondCardClasses) {
        firstCardClicked = null
        secondCardClicked = null
        gameCards.addEventListener('click', handleClick)
        matches++;
        attempts++
        displayStats()
        if (maxMatches === matches) {
          document.getElementById('modal').className = "";
        }
    } else {
      setTimeout(function() {
        firstCardClicked.classList.remove('hidden')
        secondCardClicked.classList.remove('hidden')
        firstCardClicked = null
        secondCardClicked = null
        gameCards.addEventListener('click', handleClick)
      }, 1500)
        attempts++
        displayStats()
    }
  }
}

function displayStats() {
  document.getElementById('gamePlayed').textContent = gamesPlayed
  document.getElementById('attempts').textContent = attempts
  document.getElementById('accuracy').textContent = calculateAccuracy(attempts, matches) + "%"
}

function calculateAccuracy(attempts, matches) {
  var result = matches / attempts
  if (result > 1) {
    return Math.trunc(result) * 100
  } else {
    return Math.trunc(result * 100)
  }
}

var threeByTwoArr = ['circle-pororo', 'circle-petty', 'circle-crong',
'circle-pororo', 'circle-petty', 'circle-crong']
var fourByTwoArr = ['circle-pororo', 'circle-petty', 'circle-loppy', 'circle-crong',
'circle-pororo', 'circle-petty', 'circle-loppy', 'circle-crong']
var threeByFourArr = ['circle-tong', 'circle-pororo', 'circle-poby', 'circle-petty',
'circle-loppy', 'circle-crong', 'circle-tong', 'circle-pororo', 'circle-poby',
'circle-petty', 'circle-loppy', 'circle-crong']
var threeBySixArr = ['circle-tong', 'circle-rody', 'circle-pororo', 'circle-poby',
'circle-pipi', 'circle-petty', 'circle-loppy', 'circle-harry', 'circle-crong',
'circle-tong', 'circle-rody', 'circle-pororo', 'circle-poby', 'circle-pipi',
'circle-petty', 'circle-loppy', 'circle-harry', 'circle-crong']

function mixCard(arr, maxMatch, col) {
  maxMatches = maxMatch
  for (let i = 0; i < arr.length; i++) {
    var randomNum = Math.floor(Math.random() * arr.length)
    var temp = arr[i];
    arr[i] = arr[randomNum];
    arr[randomNum] = temp;
  }
  for (let i = 0; i < arr.length; i++) {
      var parentDiv = document.createElement('div')
      parentDiv.classList.add(col)
      gameCards.appendChild(parentDiv).classList.add('cd')
      var childDiv1 = document.createElement('div')
      var childDiv2 = document.createElement('div')
      parentDiv.appendChild(childDiv1).classList.add('card-front')
      parentDiv.appendChild(childDiv2).classList.add('card-back')
      childDiv1.classList.add(arr[i])
  }
}

function threeByTwo() {
  var col = "col-4"
  game.classList.remove('hidden')
  gameSelect.classList.add("hidden")
  mixCard(threeByTwoArr, 3, col)
}
function fourByTwo() {
  var col = "col-3"
  game.classList.remove('hidden')
  gameSelect.classList.add("hidden")
  mixCard(fourByTwoArr, 4, col)
}
function threeByFour() {
  var col = "col-25"
  game.classList.remove('hidden')
  gameSelect.classList.add("hidden")
  mixCard(threeByFourArr, 6, col)
}
function threeBySix() {
  var col = "col-2"
  game.classList.remove('hidden')
  gameSelect.classList.add("hidden")
  mixCard(threeBySixArr, 9, col)
}

var gamePlayedCount = 0
function refresh() {
  maxMatches = gameCards.childElementCount/2
  document.getElementById('modal').classList.add("hidden")
  document.getElementById('attempts').textContent = 0
  document.getElementById('accuracy').textContent = 0
  matches = 0;
  attempts = 0;
  gamePlayedCount++
  document.getElementById('gamePlayed').textContent = gamePlayedCount
  gameCards.innerHTML = ""
  // document.getElementById('modal').className.add("hidden");
  var arr;
  var col
  if (maxMatches === 3) {
    arr = threeByTwoArr
    col = "col-4"
    mixCard(arr, 3, col)
  }
  if (maxMatches === 4) {
    arr = fourByTwoArr
    col = "col-3"
    mixCard(arr, 4, col)
  }
  if (maxMatches === 6) {
    arr = threeByFourArr
    col = "col-25"
    mixCard(arr, 6, col)
  }
  if (maxMatches === 9) {
    arr = threeBySixArr
    col = "col-2"
    mixCard(arr, 9, col)
  }
}

function selectGame() {
  document.getElementById('modal').classList.add("hidden")
  gameCards.innerHTML = ""
  matches = 0;
  attempts = 0;
  gameSelect.classList.remove("hidden")
}

function init() {
  gameCards.addEventListener("click", handleClick)
}

init()
