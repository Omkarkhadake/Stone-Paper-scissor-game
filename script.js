// Rules section  

const rulesBtn = document.querySelector(".rules-btn");
const rulesSection = document.querySelector(".rules_section");
const cancleBtn = document.querySelector(".cancle-btn");
const rulesUpperPart = document.querySelector(".rules-upper-part");

rulesBtn.addEventListener("click",()=>{
    rulesUpperPart.classList.add("rules-upper-part_active")
})

cancleBtn.addEventListener("click",()=>{
    rulesUpperPart.classList.remove("rules-upper-part_active")
})


// game logic 
const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissor",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissor",
    },
];
const choiceButtons = document.querySelectorAll(".choice_btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");



choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
});
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
});
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');

  
}

// logical

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".results_text");
const resultstextcommon = document.querySelector(".results_text_common ");

const nextbtn = document.querySelector(".next-btn");
const header = document.querySelector(".header");

function displayWinner(results){
    setTimeout(()=>{
        const UserWins = isWinner(results)
        const aiWins = isWinner(results.reverse())

        if(UserWins){
            resultText.innerHTML="You Wins";
            resultstextcommon.innerHTML = "AGAINST PC"
            resultDivs[0].classList.toggle('winner');
            keepUserScore(1)
            nextbtn.classList.toggle("hidden");
            nextbtn.style.right="30px"
            resultstextcommon.classList.remove('hidden');
            rulesBtn.style.right='150px';

        }
        else if(aiWins){
            resultText.innerHTML = "You Lose";
            resultstextcommon.innerHTML = "AGAINST PC"
            resultDivs[1].classList.toggle('winner');
            keepComputerScore(1)
            // resultstextcommon.classList.remove('hidden');
            
        }
        else{
            resultText.innerHTML = "TIE UP"
            resultstextcommon.classList.add('hidden');
        }
    },1000);
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
}

function isWinner(results){
    return results[0].beats === results[1].name;
}


// play button 

const playAgainBtn = document.querySelector(".play-again");

playAgainBtn.addEventListener("click",()=>{
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
    nextbtn.classList.add("hidden");
    rulesBtn.style.right='25px';
    resultstextcommon.classList.add('hidden');

    resultDivs.forEach(resultDiv =>{
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner')
    })

    resultText.innerHTML = "";
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
})


//  score bord

const scoreComputer = document.querySelector(".score_number_computer");
const scoreUser = document.querySelector(".score_number_user");
let userScore = 0;
let PcScore = 0;

function keepUserScore(point){
    score += point
    scoreNumber.innerText=score
    localStorage.setItem("scoreNumber",score.toString());
}

function keepComputerScore(point){
    score1 += point
    scoreNumber1.innerText=score1
    localStorage.setItem("scoreNumber1",score1.toString());
}

// using next button we can make the hurray page visible and other page invisible
const hurray = document.querySelector(".hurray");

nextbtn.addEventListener("click",()=>{
    header.classList.toggle("hidden")
    resultsDiv.classList.toggle("hidden")
    nextbtn.classList.toggle("hidden")
    hurray.classList.toggle("hidden");
    rulesBtn.style.right='25px';
})

// play again button
const playagainbtnnew = document.querySelector(".play-again-btn");

playagainbtnnew.addEventListener("click",()=>{
    gameDiv.classList.toggle('hidden');
    header.classList.toggle('hidden');
    hurray.classList.toggle('hidden');
    history.go(0);
})


const scoreNumber = document.querySelector('#s2');
const scoreNumber1 = document.querySelector('#s1');

let score = parseInt(localStorage.getItem("scoreNumber")) || 0;
let score1 = parseInt(localStorage.getItem("scoreNumber1")) || 0;

scoreNumber.innerText=score;
scoreNumber1.innerText=score1;