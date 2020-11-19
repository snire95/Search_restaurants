createEvent = (Parameters) => {
    // name2 = (document.querySelector('#name-2').textContent)
    Waiting= "Waiting for player";
    for (let tr = 0; tr < Parameters.columns; tr++) {
        let TR = document.querySelector('#tr' + tr);
        TR.addEventListener("mouseover", function () {
            if(Waiting !== (document.querySelector('#name-2').textContent)){
                td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
                Parameters.color = colorPlayer(Parameters.Player);
                playerColorChangeMouseover(td, tr, Parameters.color, Parameters.rows, Parameters.victory, Parameters.Player, Parameters.active);
            }
        });
        TR.addEventListener("mouseout", function () {
            if(Waiting !== (document.querySelector('#name-2').textContent)){
                td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
                playerColorChangeMouseover(td, tr, "white", Parameters.rows, Parameters.victory,Parameters.Player, Parameters.active);
            }
        });
        TR.addEventListener('click', function () {
            if(Waiting !== (document.querySelector('#name-2').textContent)){
                td = arrayLocation(tr, Parameters.arrGame, Parameters.rows);
                dotColor(td, tr, Parameters);
            }
        });
    }
}

playerColorChange = (td, tr,Parameters) =>{
    Parameters.color = colorPlayer(Parameters.active);
    document.getElementById("tr" + tr + "td" + td).style.background = Parameters.color;
    Parameters.arrGame[td][tr] = Parameters.color; 
}


playerColorChangeMouseover = (tr, td, color, row, victory, Player, active) => {
    if(victory && tr < row &&  Player == active) {
    document.getElementById("tr" + td + "td" + tr).style.background = color;
    }  
}

ViewName = (name) => {
    if(name == ""){
        setCookie("name2" + window.location.pathname, "Palyer-2", 30);
        document.querySelector('#name-2').textContent = "Palyer-2";
    }else{
        setCookie("name2" + window.location.pathname, name, 30);
        document.querySelector('#name-2').textContent = name;
    }
    document.getElementById("div-input-name-2").classList.add('remove');
    document.getElementById("div-name-2").classList.remove('remove');  

}

dotColor = (td, tr, Parameter) => {
    if (Parameter.victory && td < Parameter.rows && Parameter.Player == Parameter.active) {
        playerColorChange(td, tr,Parameter);
        testGame(td, tr, Parameter);
        if ((td + 1) == Parameter.rows) {


            Parameter.LastModifiedMounter++;
            console.log("tesdkvbj")
            console.log(Parameter.LastModifiedMounter)
        };
        sendInfo(Parameter, tr, td);
        let deadlock = stalemate(Parameter.LastModifiedMounter, Parameter.columns, Parameter.rows);
        if(Parameter.victor || deadlock ){
            Parameter.active = nextPlayer(Parameter.victory , Parameter.Player);  
            BoardUpdate(Parameter); 
        } 
        
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
        victory : Parameter.victory, 
    }
    QueueData.tr = tr;
    QueueData.td = td
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
