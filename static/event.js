createEvent = (Parameters) => {
    for (let tr = 0; tr < Parameters.columns; tr++) {
        let TR = document.querySelector('#tr' + tr);
        TR.addEventListener("mouseover", function () {
            td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
            Parameters.color = colorPlayer(Parameters.Player);
            playerColorChangeMouseover(td, tr, Parameters.color, Parameters.rows, Parameters.victory, Parameters.Player, Parameters.active);
        });
        TR.addEventListener("mouseout", function () {
            td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
            playerColorChangeMouseover(td, tr, "white", Parameters.rows, Parameters.victory,Parameters.Player, Parameters.active);
        });
        TR.addEventListener('click', function () {
            td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
            dotColor(td, tr, Parameters);
        });
    }
}

playerColorChange = (td, tr,Parameters) =>{
    Parameters.color = colorPlayer(Parameters.active);
    document.getElementById("tr" + tr + "td" + td).style.background = Parameters.color;
    Parameters.arrGame[td][tr] = Parameters.color; 
}


playerColorChangeMouseover = (tr, td, color, row,victory, Player, active) => {
    if(victory && tr < row &&  Player == active) {
    document.getElementById("tr" + td + "td" + tr).style.background = color;
    }  
}

dotColor = ( td, tr, Parameters) => {
    console.log("Parameter.Player  " + Parameters.Player )
    console.log("Parameter.active  " + Parameters.active )
    if (Parameters.victory && td < Parameters.rows && Parameters.Player == Parameters.active) {
        playerColorChange(td, tr,Parameters);
        testGame(td, tr, Parameters);
        if ((td + 1) == Parameters.rows) {
            Parameters.LastModifiedMounter++;
        };
        sendInfo(Parameters, tr, td);
        let deadlock = stalemate(Parameters.LastModifiedMounter, Parameters.columns, Parameters.rows);
        if(Parameters.victor || deadlock ){
            Parameters.active = nextPlayer(Parameters.victory , Parameters.Player);  
        } 
        BoardUpdate(Parameters); 
    }       
} 

nextPlayer = (victory, Player) => {
    if (victory == true) { 
        setActivePlayer(); 
        if(Player == 2){
            return 1;
        }else{
            return 2;
        }
    }      
}

setActivePlayer = () => {
    document.querySelector('.wrapper-1').classList.toggle('active');
    document.querySelector('.wrapper-2').classList.toggle('not-active');
    document.querySelector('.wrapper-1').classList.toggle('not-active');
    document.querySelector('.wrapper-2').classList.toggle('active');
}

sendInfo = (Parameter, tr ,td) => {
    QueueData = {
        ID : Parameter.id ,
        Player_id : Parameter.active,
        Location : [tr ,td]
    }
    fetch(`${window.location.href}/SendInfo`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(QueueData),
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
