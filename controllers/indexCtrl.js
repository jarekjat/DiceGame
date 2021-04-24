//const setDices = require("../models/indexModel.js")
import Model from '../models/indexModel.js'

let chipsBalance = 1000

const buttonRoll = document.getElementsByName("buttonRoll")[0]
const buttonNewGame = document.getElementsByName("buttonNewGame")[0]
const betAmountInput = document.getElementById("bet-amount")
const onWhichPlayerBettingSubmit = document.getElementById("select-player")
const chipsOutput = document.getElementsByClassName("chips")[1]
let onWhichPlayerBetting = "Player 1"
let betAmount = 0
let numberOfRollsInAGame = 0
let chosenNumberOfRolls = 1
let whoWins = ""
let sumFirstPlayer = 0;
let sumSecondPlayer = 0;
const img1 = document.getElementById("dice1img")
const img2 = document.getElementById("dice2img")
const player1 = "Player 1"
const player2 = "Player 2"
const newGameHtmlText = "New game"
const rollHtmlText = "Roll!"
const casesForH2 = Object.freeze({
    "startGame": 0,
    "inGame": 1,
    "endGame": 2
})
const players = Object.freeze({
    "Player 1": 1,
    "Player 2": 2
})
const subtitle = document.getElementsByTagName("h2")[0]
const fun = setInterval(buttonGlow,2000) 


window.addEventListener("load",()=> fun)
function buttonGlow(){
    buttonRoll.classList.remove("button-glow")
    buttonRoll.classList.add("button-glow")
}
buttonRoll.addEventListener("click",()=>{
    if(buttonRoll.textContent === newGameHtmlText){
        startNewGame()
        return
    } 
         rolling()
    numberOfRollsInAGame++
    setTextForH2(casesForH2.inGame)
    console.log("numberOfRollsIna game: " + numberOfRollsInAGame)
    console.log("Chosen number of rolls: " + chosenNumberOfRolls)
    console.log("sums: " + sumFirstPlayer + ", " + sumSecondPlayer);
    if(numberOfRollsInAGame === chosenNumberOfRolls) endTheGame()
    
})
betAmountInput.addEventListener("change",function(){

    if(this.value % 1 != 0) this.value = Math.floor(this.value)
    if(this.value < 0){
        this.value = 0
        return
    } 
    if(this.value > Number(chipsOutput.textContent)){
        this.value = Number(chipsOutput.textContent)
        return
    } 
    if(this.value === "") this.value = 0
})
function startNewGame(){
    removeSelectorsFromClass("chips","span-shrink")
    removeSelectorsFromClass("chips","span-grow")
    buttonRoll.textContent = rollHtmlText
    numberOfRollsInAGame = 0
    handleBetStart()
    sumFirstPlayer = 0
    sumSecondPlayer = 0
    chosenNumberOfRolls = parseInt(getChosenNumberOfRolls())
    console.log(typeof chosenNumberOfRolls)
    setTextForH2(casesForH2.startGame)
    document.getElementsByTagName("h1")[0].innerText = "Dicee"
}
function handleBetStart(){
    if(Number(chipsOutput.textContent) <= 0) disableBetting()
    betAmount = Number(betAmountInput.value)
    betAmountInput.disabled = true
    onWhichPlayerBetting = onWhichPlayerBettingSubmit.value
    onWhichPlayerBettingSubmit.disabled = true
}
function disableBetting(){
    betAmountInput.value = 0
    betAmountInput.disabled = true
    betAmount = 0
}
function handleBetEnd(){
    console.log("bet on: " + onWhichPlayerBetting)
    console.log("whoWins: " + whoWins)
    betAmountInput.disabled = false
    onWhichPlayerBettingSubmit.disabled = false
    
    if(onWhichPlayerBetting == whoWins){
        chipsBalance += betAmount
        if(betAmount > 0){
            addSelectorToClass("chips","span-grow")
        }
    }
    else{
        chipsBalance -= betAmount
        if(betAmount > 0){
            addSelectorToClass("chips","span-shrink")
        }
        
    } 
    chipsOutput.textContent = chipsBalance.toString()
    console.log("chips balance: " + chipsBalance)
}
function addSelectorToClass(nameOfSelector, nameOfClass){
    for(let i = 0;i < document.getElementsByClassName(nameOfSelector).length;++i){
        document.getElementsByClassName(nameOfSelector)[i].classList.add(nameOfClass)
    }
}
function removeSelectorsFromClass(nameOfSelector, nameOfClass){
    for(let i = 0;i < document.getElementsByClassName(nameOfSelector).length;++i){
        document.getElementsByClassName(nameOfSelector)[i].classList.remove(nameOfClass)
    }
}
function setTextForH2(whichCase){
    switch(whichCase){
        case casesForH2.startGame: subtitle.textContent = "Shall we?"
        break
        case casesForH2.inGame: subtitle.textContent = "Round " + numberOfRollsInAGame + " out of " + chosenNumberOfRolls + ".     It's " + sumFirstPlayer + " to " + sumSecondPlayer + "!"
        break
        default: subtitle.textContent = "Try your luck!"
    }
}
function getChosenNumberOfRolls(){
    return document.querySelector(   
        "input[type='radio'][name='numberOfRolls']:checked").value
}
function endTheGame(){
    
    let text = ""
    if(sumFirstPlayer > sumSecondPlayer){
        text = "Player 1 wins"
        whoWins = player1
    } 
    else if(sumFirstPlayer === sumSecondPlayer){
        text = "It's a tie!"
        whoWins = ""
    } 
    else{
        text = "Player 2 wins" 
        whoWins = player2
    } 
    handleBetEnd()
    buttonRoll.textContent = newGameHtmlText
    document.getElementsByTagName("h1")[0].innerText = text
}
function getPicturesForHtml(firstDice, secondDice){

    img1.src = "../images/dice" + firstDice.toString() +  ".png"
    img2.src = "../images/dice" + secondDice.toString() +  ".png"
    img1.classList.add("dice-roll")
    img2.classList.add("dice-roll")
}
function rolling(){
    
        const firstDice = Math.floor(Math.random()*5)+1
        const secondDice = Math.floor(Math.random()*5)+1
        sumSecondPlayer += secondDice
        sumFirstPlayer += firstDice
        getPicturesForHtml(firstDice, secondDice)
        setTimeout(function(){
            img1.classList.remove("dice-roll")
            img2.classList.remove("dice-roll")
        },1000)

}