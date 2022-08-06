let clickedColor = [];
let userClickedColor = [];
let started = false;
let level = 0;
const buttonColors = ["green", "red", "yellow", "blue"];

$("body").keypress(() => {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextRound();
    started = true;
  }
});

$("body").click((event) => {
  let color = event.target.id;
  userClickedColor.push(color);
  animatePress(color);
  makeSound(color);
  checkAnswer(userClickedColor.length - 1);
});

function checkAnswer(level) {
  if (clickedColor[level] === userClickedColor[level]) {
    if (userClickedColor.length === clickedColor.length) {
      setTimeout(() => {
        nextRound();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, press any key to restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
    startOver();
  }
}

function nextRound() {
  userClickedColor = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let color = buttonColors[randomNumber];
  clickedColor.push(color);

  $("#" + color)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  makeSound(color);
}

function makeSound(color) {
  let audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function animatePress(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
}

function startOver() {
  clickedColor = [];
  started = false;
  level = 0;
}
