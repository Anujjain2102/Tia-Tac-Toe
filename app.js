let boxes = document.querySelectorAll(".box");
let reset_button = document.querySelector("#reset-btn");
let msg_container = document.querySelector(".msg-container");
let new_button = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turnO = true; //false: Player_X, true: Player_O
let count = 0; //To Track Draw condition

let winning_patterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO=true;
    enableBoxes();
    msg_container.classList.add("hide");
    count=0;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked!");
        if(turnO)
        {
            //Player O
            box.innerText = "O";
            turnO=false;
        }
        else {
            //Player X
            box.innerText = "X";
            turnO=true;
        }
        box.disabled = true;

        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
})

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg_container.classList.remove("hide");
    disableBoxes();
  };

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg_container.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(pattern of winning_patterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

new_button.addEventListener("click",resetGame);
reset_button.addEventListener("click",resetGame);