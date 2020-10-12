
// TODO: Wrap everything with self executing function, example: (function() {})()
const play = document.getElementById("play");
const game = document.getElementById("game");   
const add = document.getElementById("startGame");
var myVar = setInterval(ViewName2, 3000);

saveName2 = () => {
    name2 =  document.querySelector('#name_2').value;
    console.log(window.location.href);
    fetch(`${window.location.href}/save_name2`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(name2),
        cache: "no-cache",
        headers: new Headers({"content-type": "application/json"})
    }) .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
      response.json()
    .then(ViewName(data));
    })
    .catch(function (error) {    
        console.log("Fetch error: " + error);
    }); 
}

ViewName = (name) => {
    if(name == ""){
        document.querySelector('#name-2').textContent = "Palyer-2";
        console.log(document.querySelector('#name-2'))
    }else{
        document.querySelector('#name-2').textContent = name;
    }
    document.getElementById("div-input-name-2").classList.add('remove');
    document.getElementById("div-name-2").classList.remove('remove');  
}


fetch(`${window.location.href}/creatTable`)
.then(function (response) {
    if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status code: ${response.status}`);
        return;
    }
    response.json().then(function (data) {
        var Parameter = {
            id: data[0][0],
            rows :  data[0][2],
            columns : data[0][1],
            victoryScore : data[0][3],
            name1 : data[0][8],
            victory: data[0][7],
            activePlayer : data[0][6],
            LastModifiedMounter : data[0][4],
            active : false
        };
        tableCreation(Parameter); 
        document.querySelector('#name-1').textContent = Parameter.name1;
        game.classList.remove('remove');
        play.classList.remove('remove');
        Parameter.arrGame = matrixCreature(Parameter.rows,Parameter.columns);
        createEvent(Parameter);      
    })
})


createEvent = (Parameters) => {
    for (let tr = 0; tr < Parameters.columns; tr++) {
        let TR = document.querySelector('#tr' + tr);
        TR.addEventListener("mouseover", function () {
            td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
            Parameters.color = colorPlayer(Parameters.activePlayer);
            playerColorChangeMouseover(td, tr, Parameters.color, Parameters.rows, Parameters.victory, Parameters.activePlayer, Parameters.active);
        });
        TR.addEventListener("mouseout", function () {
            td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
            playerColorChangeMouseover(td, tr, "white", Parameters.rows, Parameters.victory,Parameters.activePlayer, Parameters.active);
        });
        TR.addEventListener('click', function () {
            td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
            dotColor(td, tr, Parameters);
        });
    }
}



playerColorChange = (td, tr,Parameters) =>{
    Parameters.color = colorPlayer(Parameters.activePlayer);
    document.getElementById("tr" + tr + "td" + td).style.background = Parameters.color;
    Parameters.arrGame[td][tr] = Parameters.color; 
}

dotColor = ( td, tr,Parameters) => {
    if (Parameters.victory && td < Parameters.rows && Parameters.activePlayer == Parameters.active) {
        playerColorChange(td, tr,Parameters);
        testGame(td, tr, Parameters);
        if ((td + 1) == Parameters.rows) {
            Parameters.LastModifiedMounter++;
        };
        sendInfo(Parameters, tr, td);
        let deadlock = stalemate(Parameters.LastModifiedMounter, Parameters.columns, Parameters.rows);
        if(Parameters.victor || deadlock ){
            Parameters.activePlayer = nextPlayer(Parameters.victory , Parameters.activePlayer);  
        } 
    }       
} 

sendInfo = (Parameter, tr ,td) => {
    Parameter.point = [tr ,td];
    fetch(`${window.location.href}/SendInfo`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(Parameter),
        cache: "no-cache",
        headers: new Headers({"content-type": "application/json"})
    })
    .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
      response.json()
    })
    .catch(function (error) {    
        console.log("Fetch error: " + error);
    });

}

nextPlayer = (victory, activePlayer) => {
    if (victory == true) { 
        setActivePlayer(); 
        return (!activePlayer);
    }      
}

playerColorChangeMouseover = (tr, td, color, row,victory, activePlayer, active) => {
    if(victory && tr < row &&  activePlayer == active) {
    document.getElementById("tr" + td + "td" + tr).style.background = color;
    }  
}

setActivePlayer = () => {
    document.querySelector('.wrapper-1').classList.toggle('active');
    document.querySelector('.wrapper-2').classList.toggle('not-active');
    document.querySelector('.wrapper-1').classList.toggle('not-active');
    document.querySelector('.wrapper-2').classList.toggle('active');
}


