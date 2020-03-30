'use strict';

$(document).ready(function(){
  let gameBoard = [];

  //make puzzle of specefied size
  function nonogram (axisSize){
    let numOfBoxes = axisSize*axisSize;
    let gameArray = [];
    for(let i=0; i<numOfBoxes; i++){
      if(Math.floor(Math.random()*Math.floor(axisSize+1)) >= 5){
        gameArray = gameArray.concat(1);
      } else {
        gameArray = gameArray.concat(0);
      }
    }
    return makeRows(gameArray, axisSize);
  }

  //break array into rows of specefied size
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

  //make clues to go on the sides of the puzzle
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
    return (
      populateBoard(gameBoard, axisSize),
      populateClues(allRowClues, allColumnClues, axisSize)
    );
  }

  //fill gameboard with puzzle
  function populateBoard(gameBoard, axisSize){
    let gameBoxContents = '';
    for(let i=0; i<gameBoard.length; i++){
      for(let j=0; j<gameBoard[i].length; j++){
        if(gameBoard[i][j] === 1){ //space to be shaded
          gameBoxContents = gameBoxContents.concat(`<div class='cell solution'></div>`);
        } else {
          gameBoxContents = gameBoxContents.concat(`<div class='cell not'></div>`);
        }
      }
    }
    let width = axisSize*20;
    $('.gameBox').css({'width': `${width}px`, 'height': `${width}px`});
    $('.rowClues').css({'height': `${width}px`});
    $('.columnClues').css({'width': `${width}px`});
    $('.gameBox').empty().append(gameBoxContents);
  }

  //fill clue boxes with clues
  function populateClues(rowClues, columnClues, axisSize){
    //concat filling for rowClues
    let rowClueContents = '';
    for(let i=0; i<rowClues.length; i++){
      let rowString = JSON.stringify(rowClues[i]).replace(/,/gi, ' ');
      rowString = rowString.slice(1, rowString.length-1);
      rowClueContents = rowClueContents.concat(`<span class='rowClue'>${rowString}</span>`);
    }
    //concat filling for columnClues
    let columnClueContents = '';
    for(let i=0; i<columnClues.length; i++){
      let columnString = JSON.stringify(columnClues[i]).replace(/,/gi, '');
      columnString = columnString.slice(1, columnString.length-1);
      columnClueContents = columnClueContents.concat(`<span class='columnClue'>${columnString}</span>`);
    }
    //clear and insert clues into respective locations
    $('.rowClues').empty().append(rowClueContents);
    $('.columnClues').empty().append(columnClueContents);
  }

  //click controls
  let colorEmptyToggle = true;

  $('.switch').on('mousedown', event=> {
    colorEmptyToggle = !colorEmptyToggle;
    console.log(colorEmptyToggle)
  })

  $('.gameBox').on('click', '.cell', event=>{
    event.preventDefault();
    if(colorEmptyToggle ===  true){
      if($(event.target).attr('class').includes('color')){
      $(event.target).removeClass('color');
      } else if($(event.target).attr('class').includes('empty')) {

      } else {
        $(event.target).addClass('color');
      }
    } else {
      if($(event.target).attr('class').includes('empty')){
          $(event.target).removeClass('empty').empty();
        } else if($(event.target).attr('class').includes('color')){

        } else {
          $(event.target).addClass('empty').append('&cross;');
        }
    }
    
  })

    //if xed insert  empty
    //if shaded  class lit  color

  nonogram (10)
  //console.log(gameBoard)
})