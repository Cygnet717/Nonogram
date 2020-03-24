'use strict';

let gameBoard = [];
let rowClues = [];
let columnClues = [];

function nonogram (axisSize){
  let numOfBoxes = axisSize*axisSize;
  let gameArray = [];
  for(let i=0; i<numOfBoxes; i++){
    if(Math.floor(Math.random()*Math.floor(axisSize+1)) >= 6){
      gameArray = gameArray.concat(1);
    } else {
      gameArray = gameArray.concat(0);
    }
  }
  return makeRows(gameArray, axisSize);
}

function makeRows(arr, axisSize){
  let arrRows = [];
  let rowlength = axisSize -1;
  let rowCount = 0;
    for(let i=0; rowCount < axisSize; i+=rowlength){
      let row= [];
      row =  row.concat(arr.slice(i, i+axisSize));
      arrRows[rowCount] = row;
      rowCount++;
    }
  gameBoard = gameBoard.concat(arrRows);
  return bulidClues(arrRows, axisSize);
}

function bulidClues(gameArr, axisSize){
  let allRowClues = [];
  let allColumnClues = [];
  let count = 0;
//count row
  for(let i=0; i<axisSize; i++){
    let row =[];
    for(let j=0; j<axisSize; j++){
      if(gameArr[i][j] === 1){
        if(axisSize-1 === j){
          count = count +1;
          row = row.concat(count);
          count = 0;
        } else {
          count = count + 1;
        }
      } else if(gameArr[i][j] === 0){
        if(count > 0){
        row = row.concat(count);
        }
      count = 0;
      }
    }
    allRowClues[i] = row;
  }
//count column
  for(let i=0; i<axisSize; i++){
    let column = [];
    for(let j=0; j<axisSize; j++){
      if(gameArr[j][i] === 1){
        if(axisSize -1 === j){
          count = count +1;
          column = column.concat(count);
          count = 0;
        } else {
          count = count + 1;
        }
      } else if(gameArr[j][i] === 0){
        if(count > 0){
          column = column.concat(count);
        }
        count = 0;
      }
    }
    allColumnClues[i] = column;
  }
  return populateBoard(gameBoard, axisSize)
}

nonogram (10)
console.log(gameBoard)

function populateBoard(gameBoard, axisSize){
    let gameBoxContents = '';
    for(let i=0; i<gameBoard.length; i++){
        for(let j=0; j<gameBoard[i].length; j++){
            if(gameBoard[i][j] === 1){ //space to be shaded
                gameBoxContents = gameBoxContents.concat(`<div class='cell solution'>1</div>`)
            } else {
                gameBoxContents = gameBoxContents.concat(`<div class='cell not'>0</div>`)
            }
        }
    }
    let width = axisSize*20;
    $('.gameBox').css({'width': `${width}px`, 'height': `${width}px`})
    $('.gameBox').append(gameBoxContents)
}

$(document).ready(function(){
    

    //if xed insert &cross;
    //if shaded  class lit
})