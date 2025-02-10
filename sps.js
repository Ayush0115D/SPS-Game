let userScore=0;
let compScore=0;
const choices =document.querySelectorAll(".choice");

const genCompChoice=()=>{
    const options=["rock","paper","scissors"];
    const randIdx=Math.floor(Math.random()*3); //for creating random no ranging from 0 to 2 (if * by 3)
    //floor is used to ignore decimal no. and give o/p in interger value
    return options[randIdx]; 
}
const drawGame=()
const playGame=(userChoice)=>{
    console.log("user choice=",userChoice);
//generate comp choice
const compChoice=genCompChoice();
   console.log("comp choice=",compChoice)
   id (userChoice==compChoice){ //draw game


   }
}
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
const userChoice =choice.getAttribute("id");
console.log("choice was clicked",userChoice);
playGame(userChoice);
    })
})