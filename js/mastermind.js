const colors = ["red", "yellow", "green", "blue"];
const colorSelector = document.querySelectorAll(".circle");
const selectedColor = document.querySelector("#selected-colors-container");
const hintSelector = document.querySelector(".hint");
const btnStart = document.getElementById("btn-start");
const hintArray = [];
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
  console.log(solution)
  launchGameLogic();
}

btnStart.onclick = startGame;

function launchGameLogic() {
  colorSelector.forEach((btn) => {
    const color = btn.classList[1];

    btn.addEventListener("click", () => {
      if (count === 0) {
        newLine = createNewRoundLine();
        // displayHints();
      }
      if (count < colors.length) {
        count++;
        createColorCircle(color, newLine);
      }

      if (count >= colors.length) {
        if (round < 8) {
            count = 0;
            displayHints();
            round++;
        } else {
          alert("GAME OVER");
        }
      }
    });
  });
}

function displayHints() {
  const guessedColor = document.querySelectorAll(`#round-${round} .selected-color`);
  console.log(guessedColor);
  let hints = [];
  let duplicateCheck = [];
    //console.log(guessedColor);
  guessedColor.forEach((color, index) => {
      color = color.classList[1];
    if (color === solution[index]) {
        hints.push("full");
        duplicateCheck.push(color);
        //console.log('=', color, solution[index]);
    }
  });

    guessedColor.forEach((color, index) => {
        color = color.classList[1];
     if(!duplicateCheck.includes(color) && solution.includes(color)) {
         hints.push("half");
         console.log(color);
     }
  });
   //console.log(solution);
   console.log(hints);

  for (const hint of hints) {
      const el = document.createElement("div");
      if (hint === "full") {
          el.classList.add("full");
      } else {
          el.classList.add("half");
      }
      selectedColor.appendChild(el);
  }
};


function createNewRoundLine() {
  const div = document.createElement("div");
  div.id = "round-" + round;
  div.classList.add("round-line");
  selectedColor.append(div);
  return div;
}

function createColorCircle(color, line) {
  //console.log(color)
  
  const div = document.createElement("div");
  div.classList.add("selected-color");
  div.classList.add(color);
  line.append(div);
}



