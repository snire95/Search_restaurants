
// TODO: Wrap everything with self executing function, example: (function() {})()
const play = document.getElementById("play");
const game = document.getElementById("game");   
const add = document.getElementById("startGame");
const winer = document.getElementById("winer");
var IdGlobsl = 0;
var name2 = checkCookiename2("name2" + window.location.pathname)
var existingCookie = getCookie("id&Player" + window.location.pathname);
if("name2" + window.location.pathname == name2 && (existingCookie != "" || existingCookie != "undefined")){
    var myVar = setInterval(ViewName2, 800);
}
if("name2" + window.location.pathname != name2){
    document.querySelector('#name-2').textContent = name2 ;
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
        var Parameter = JSON.parse(data)
        Parameter.active = 1 ;
        Parameter.Player = checkCookie(Parameter.Player)
        Parameter.Player = parseInt(Parameter.Player)
        if(Parameter.Player == 1 || Parameter.Player > 2 ){
            document.getElementById("div-input-name-2").classList.add('remove');
            document.getElementById("div-name-2").classList.remove('remove');  
        }
        if(Parameter.Player == 2 &&  document.querySelector('#name-2').textContent == "Waiting for player"){
            document.getElementById("div-input-name-2").classList.remove('remove');
        }
        tableCreation(Parameter); 
        document.querySelector('#name-1').textContent = Parameter.name1;
        document.querySelector('#win').textContent = "Sequence of "+ Parameter.victoryScore +" for victory";
        Parameter.arrGame = matrixCreature(Parameter.rows,Parameter.columns);
        createEvent(Parameter); 
        GameRecovery(Parameter);
        BoardUpdate(Parameter);

    })
})


GameRecovery = (Parameter) => {
    fetch(`${window.location.href}/GameRecovery`)
    .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function (Allture) {
            if (Allture == [] || undefined == Allture[0]){
                game.classList.remove('remove');
                play.classList.remove('remove');
            }else {
                if(!Allture[Allture.length-1].victory){
                    testGame(Allture[Allture.length-1].td, Allture[Allture.length-1].tr, Parameter);
                }else{
                    for(i=0; i< Allture.length; i++){
                        Parameter.active = Allture[i].PlayerId;
                        playerColorChange(Allture[i].td, Allture[i].tr, Parameter);
                        IdGlobsl = Allture[Allture.length-1].ID
                        if ((Allture[i].td + 1) == Parameter.rows) {
                            Parameter.LastModifiedMounter++;
                            console.log("snirnrirnir")
                            console.log(Parameter.LastModifiedMounter)
                        };
                        var deadlock = stalemate(Parameter.LastModifiedMounter, Parameter.columns);
                        
                        if(!deadlock){
                            console.log("dcf")
                            setActivePlayer();
                        }
    
    
    
                    }
                    testGame(Allture[Allture.length-1].td, Allture[Allture.length-1].tr, Parameter);
                    if(Parameter.victory || !deadlock){
                        setActivePlayer();
                    }
    
                    if((Parameter.victory || deadlock) && Parameter.active == Allture[Allture.length-1].PlayerId ){
                        if(Parameter.active == 1){
                            Parameter.active = 2;
                        }else 
                            Parameter.active = 1;
                    } 
                }
       
                game.classList.remove('remove');
                play.classList.remove('remove');
                
            }
    
        })
    }) 
}


BoardUpdate = (Parameter) => {
    var fun = setInterval( async () => {
        if(Parameter.victory){
            const response = await fetch(`${window.location.href}/NextTurn`)
            const data = await response.json();  
            if(data[0] !== undefined){
                var ture = JSON.parse(data)
                if (IdGlobsl != ture.ID || IdGlobsl > ture.ID && arrGame[ture.td][ture.tr] == 0){

                    if(ture.PlayerId !== Parameter.Player){
                        tdd = arrayLocation(ture.tr, Parameter.arrGame, Parameter.rows);
                        playerColorChange(ture.td, ture.tr, Parameter);
                        testGame(ture.td, ture.tr, Parameter);
                        if ((ture.td + 1) == Parameter.rows) {

                            Parameter.LastModifiedMounter++;
                            console.log("snirnrirnir")
                            console.log(Parameter.LastModifiedMounter)
                        };
                        let deadlock = stalemate(Parameter.LastModifiedMounter, Parameter.columns);
                        if(!deadlock){
                            setActivePlayer();
    
                        }
                        if(Parameter.victory && deadlock){
                            IdGlobsl = ture.ID
                            setActivePlayer();
                            if(Parameter.active == 1){
                                Parameter.active = 2;
                            }else 
                                Parameter.active = 1;
                        }
                    }                   
                }
            }
            if (response.status !== 200) {
                console.log(`Looks like there was a problem. Status code: ${response.status}`);
                return;
            } 
        }
    },2000);
    
}

statusFetch = (response) => {
    if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status code: ${response.status}`);
        return;
    } 
}

catchFetch = (error) => {
    console.log("Fetch error: " + error);
}

ShareWhatsApp = () => {
    window.open('whatsapp://send?text=' + `${window.location.href}`)
}
EnternewRoom = (event) => {
    var x = event.which || event.keyCode; 
    if (x == 13) {
        newRoom()
    }
}
EventEnter = (event) =>  {
    var x = event.which || event.keyCode; 
    if (x == 13) {
        saveName2()
    }
}

saveName2 = () => {
        name2 =  document.querySelector('#name_2').value;
        ViewName(name2)
        fetch(`${window.location.href}/save_name2`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(name2),
            cache: "no-cache",
            headers: new Headers({"content-type": "application/json"})
        }).then(statusFetch(response))
        .catch(catchFetch(error)); 
}
