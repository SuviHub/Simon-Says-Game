let gameSeq = [];
let userSeq = [];

let btns = ["pink" , "green" , "blue" , "violet"];

let started = false;
let level = 0;
let score = 0;
let high = 0;

let h3 = document.createElement("h3");

h3.classList.add("score");

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function() {
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});



function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    score = level - 1;
    // high = score;
    if(score > high){
        high = score;
    }
    h3.innerText = `HIGH SCORE : ${high}`;


    let ranIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    h2.insertAdjacentElement("afterend", h3);


    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}


function checkBtn(idx) {
    // console.log(`curr level : ${level}`);

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
    }else {
    h2.innerHTML = `Game Over!!. Your score was <b>${score}.</b><br>Press any key to start again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    } , 200);
    reset();
    }
}


function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor); 
    
    checkBtn(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click" , btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}