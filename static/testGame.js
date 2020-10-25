//       לא צריך לבדוק  ********************
testGame = (td, tr, Parameters) => {
    var victorySequence= [];
    arrtestingDirection = [1, 1, -1, -1, -1, 1, 1, -1, 0, 1, 0, -1, 1, 0, -1, 0];
    for (let i = 0; i < 16; i = i + 4) {
        victorySequence[0] = [td, tr];
        victorySequence = testCondition(arrtestingDirection[i], arrtestingDirection[i + 1], Parameters,victorySequence, td, tr);
        victorySequence = testCondition(arrtestingDirection[i + 2], arrtestingDirection[i + 3], Parameters,victorySequence, td, tr);
        showVictory(Parameters,victorySequence);
        victorySequence.length = 0    
    } 
}

// nameWin = (activePlayer) =>{
//     var Player = 1;
//     if (activePlayer == true) {
//         Player = 2;
//     };
//     return Player;
// }
  
testCondition = (testingDirection1, testingDirection2, Parameters,victorySequence, td, tr) => {
    let condition = true , condition1 = true ;
    for (let i = 1; i <= (Parameters.victoryScore + 1); i++) {
        if (testingDirection1 == 1) {
            condition = (td + i) < Parameters.rows;
        } else if (testingDirection1 == -1) {
            condition = (td - i) >= 0;
        }
        if (testingDirection2 == 1) {
            condition1 = (tr + i) < Parameters.columns;
        } else if (testingDirection2 == -1) {
            condition1 = (tr - i) >= 0;
        } 
        if (condition && condition1) {
            if (Parameters.arrGame[td + (i * testingDirection1)][tr + (i * testingDirection2)] == Parameters.color) {
                victorySequence.push([(td + (i * testingDirection1)), (tr + (i * testingDirection2))]);
            }else {
                return victorySequence;
            } 
        }else {
            return victorySequence;
        } 
    }
}

showVictory = (Parameters,victoryArray) => {
    if (victoryArray.length >= Parameters.victoryScore) {
        console.log(Parameters.arrGame);
        Parameters.victory = false;
        // winPlayer = nameWin(Parameters.activePlayer);
        document.querySelector('#name-' + Parameters.Player).textContent = 'winner!';
        for( var j = 0 ; j <victoryArray.length ; j++){
            document.getElementById("tr" + (victoryArray[j][1]) + "td" + (victoryArray[j][0])).style.borderColor = "yellow";  
        }
    }    
}

testErr = (Parameters) => {
    let err = true;
    if (Parameters.rows > 20 || Parameters.columns > 20) {
        document.getElementById("Row&ColumnLittle20").classList.remove('remove');
        err = false;
    }
    if (Parameters.rows < 4 || Parameters.columns < 4) {
        document.getElementById("Row&ColumnBig3").classList.remove('remove');
        err = false;
    }
    if ((Parameters.columns - Parameters.victoryScore) <= 0 || (Parameters.rows - Parameters.victoryScore) <= 0 || this.victoryScore <= 0) {    
        document.getElementById("Winlittle").classList.remove('remove');
        err = false;
    }
    if(Parameters.rows == "" || Parameters.columns == "" || Parameters.victoryScore == ""){    
        document.getElementById("fillcells").classList.remove('remove');
        err = false;
    }
    return err;
    
}
stalemate = (LastModifiedMounter, column) => {
    if (LastModifiedMounter == column) {
        document.querySelector('#name-1').textContent = 'stalemate';
        document.querySelector('#name-2').textContent = 'stalemate';
        document.querySelector('.wrapper-1').classList.remove('not-active');
        document.querySelector('.wrapper-2').classList.remove('not-active');
        document.querySelector('.wrapper-1').classList.add('active');
        document.querySelector('.wrapper-2').classList.add('active');
        return false;
    } else {
        return true;
    }
}  
