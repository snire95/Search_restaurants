tableCreation = (Parameters) => { 
    var newTable = document.createElement("table"); 
    for (let i = 0 ; i < Parameters.columns ; i++){
        newTable.appendChild(addTD(Parameters.rows , i));
    }
    game.appendChild(newTable);
}
// נבדק

matrixCreature = (row, column) => {
    var matrix = [] ;
    for (let j = 0 ; j < row ; j++){
        var arr = [];
        for(let i = 0 ; i < column ; i++){
            arr[i] = 0 ;
        }
        matrix[j] = arr ; 
    }
    return matrix;
} 
// נבדק

addTD = (row , numTd) => {
    var tr = document.createElement("tr")
    for( let j = 0 ; j < row ; j ++){
        tr.appendChild(addTR(j , numTd));
        tr.classList.add('column');   
        tr.id = 'tr' + numTd;
    }
    return tr;
}

arrayLocation = (tr, arrGame, row) => { 
    for (let j = 0; j < row; j++){
        if (arrGame[j][tr] == 0) {
            return j;
        }    
    }     
}
 
addTR = (numTr , numTd) => {
    var td = document.createElement('td');
    td.classList.add('slot');   
    td.id ='tr' + numTd + 'td' + numTr;
    return td;                                     
}

colorPlayer = (activePlayer) => {
    if(activePlayer){
        return "blue" ; 
    } else {
        return "red";
    }
} 

