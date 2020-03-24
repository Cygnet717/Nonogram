'use strict';

let gameBoard = [];
let rowClues = [];
let columnClues = [];

function nonogram (axesSize){
  let numOfBoxes = axesSize*axesSize;
  let gameArray = [];
  for(let i=0; i<numOfBoxes; i++){
    if(Math.floor(Math.random()*Math.floor(axesSize+1)) >= 6){
      gameArray = gameArray.concat(1)
    } else {
      gameArray = gameArray.concat(0)
    }
  }
  return makeRows(gameArray, axesSize)
}

function makeRows(arr, axesSize){
  let arrRows = [];
  let rowlength = axesSize -1;
  let rowCount = 0;
    for(let i=0; rowCount < axesSize; i+=rowlength){
      let row= [];
      row =  row.concat(arr.slice(i, i+axesSize))
      arrRows[rowCount] = row
      rowCount++
    }
  gameBoard = gameBoard.concat(arrRows)
  return bulidClues(arrRows, axesSize)
}

function bulidClues(gameArr, axesSize){
  let allRowClues = [];
  let allColumnClues = [];
  let count = 0;
//count row
  for(let i=0; i<axesSize; i++){
    let row =[];
    for(let j=0; j<axesSize; j++){
      if(gameArr[i][j] === 1){
        if(axesSize-1 === j){
          count = count +1;
          row = row.concat(count);
          count = 0;
        } else {
          count = count + 1
        }
      } else if(gameArr[i][j] === 0){
        if(count > 0){
        row = row.concat(count)
        }
      count = 0;
      }
    }
    allRowClues[i] = row;
  }
//count column
  for(let i=0; i<axesSize; i++){
    let column = [];
    for(let j=0; j<axesSize; j++){
      if(gameArr[j][i] === 1){
        if(axesSize -1 === j){
          count = count +1;
          column = column.concat(count);
          count = 0;
        } else {
          count = count + 1;
        }
      } else if(gameArr[j][i] === 0){
        if(count > 0){
          column = column.concat(count)
        }
        count = 0;
      }
    }
    allColumnClues[i] = column;
  }
}

nonogram (10)
console.log(gameBoard)