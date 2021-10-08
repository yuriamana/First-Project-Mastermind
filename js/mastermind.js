const colors = ["red", "yellow", "green", "blue"];
const colorSelector = document.querySelectorAll(".circle");
const selectedColor = document.querySelector("#selected-colors-container");
const hintSelector = document.querySelector(".hint");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-reset");
let imageWhenYouWin = document.getElementById("won");
let imageWhenYouLose = document.getElementById("loser");
//const hintArray = [];
let round = 1;
let count = 0;
var solution;
let newLine;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function startGame() {
  solution = shuffle(colors);
  console.log(solution);
  launchGameLogic();
}

btnStart.onclick = startGame;
btnReset.addEventListener("click", () => {
  console.log("btnReset");
});

function launchGameLogic() {
  colorSelector.forEach((btn) => {
    const color = btn.classList[1];

    btn.addEventListener("click", () => {
      if (count === 0) {
        //console.log("ici");
        newLine = createNewRoundLine();
        //console.log(newLine);
      }
      if (count < colors.length) {
        count++;
        createColorCircle(color, newLine);
      }

      if (count >= colors.length) {
        if (round < 8) {
          count = 0;
          displayHints();
          win();
          round++;
        } else {
          alert("GAME OVER");
          imageWhenYouLose.style.display = "block";
        }
      }
    });
  });
}

function displayHints() {
  const guessedColor = document.querySelectorAll(
    `#round-${round} .selected-color`
  );

  let hints = [];
  let duplicateCheck = [];

  guessedColor.forEach((color, index) => {
    color = color.classList[1];
    if (color === solution[index]) {
      hints.push("full");
      duplicateCheck.push(color);
    }
  });

  guessedColor.forEach((color, index) => {
    color = color.classList[1];
    if (!duplicateCheck.includes(color) && solution.includes(color)) {
      hints.push("half");
      //console.log(color);
    }
  });

  const hintWrapper = document.createElement("div");
  hintWrapper.classList.add("hint-wrapper");
  const target = document.getElementById("round-" + round);

  for (const hint of hints) {
    const el = document.createElement("div");
    if (hint === "full") {
      el.classList.add("full");
    } else {
      el.classList.add("half");
    }
    hintWrapper.appendChild(el);
  }

  target.appendChild(hintWrapper);
}

function createNewRoundLine() {
  const div = document.createElement("div");
  div.id = "round-" + round;
  div.classList.add("round-line");
  const selection = document.createElement("div");
  selection.classList.add("selection");
  div.appendChild(selection);
  return div;
}

function createColorCircle(color, line) {
  //console.log(line)
  const selection = line.querySelector(".selection");
  //console.log("selection ?", selection);
  const div = document.createElement("div");
  div.classList.add("selected-color");
  div.classList.add(color);
  selection.appendChild(div);
  selectedColor.appendChild(line);
}

function win() {
  const target = document.getElementById("round-" + round);
  const won = target.querySelectorAll(".full");
  let checkFull = won.length === 4 ? true : false;
  if (checkFull) {
    alert("YOU WON!");
    imageWhenYouWin.style.display = "block";
  }
} 
