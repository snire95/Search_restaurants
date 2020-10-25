
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
            Player : data[0][6],
            LastModifiedMounter : data[0][4],
            active : 1
        };
        if(Parameter.Player == 1){
            console.log("test")
            document.getElementById("div-input-name-2").classList.add('remove');
            document.getElementById("div-name-2").classList.remove('remove');  
        }
        tableCreation(Parameter); 
        document.querySelector('#name-1').textContent = Parameter.name1;
        game.classList.remove('remove');
        play.classList.remove('remove');
        Parameter.arrGame = matrixCreature(Parameter.rows,Parameter.columns);
        createEvent(Parameter); 
        if(Parameter.Player !== Parameter.active){
            BoardUpdate(Parameter)
        }
        
     
    })
})

BoardUpdate = (Parameter) => {
    console.log("test shit")
    var fun = setInterval(function(){
        fetch(`${window.location.href}/startGame`)
        .then(function (response) {
            if (response.status !== 200) {
                console.log(`Looks like there was a problem. Status code: ${response.status}`);
                return;
            }
            response.json()
            .then(function (data) {
                var cunt = 0 ;
                console.log("Parameter.Player in fun  " + Parameter.Player )
                console.log("Parameter.active in fun   " + Parameter.active )
                if(data[0] !== undefined){
                    if(data[0][1] !== Parameter.Player){
                        if(cunt == 0 ){
                            setActivePlayer();
                            pp = (data[0][3])
                            tr = pp.charAt(1);
                            td = pp.charAt(4);
                            console.log(Parameter.arrGame)
                            tdd = arrayLocation(tr, Parameter.arrGame, Parameter.rows);
                            console.log(td + " td return")
                            Parameter.active = data[0][1]
                            playerColorChange(td, tr, Parameter);
                            if(Parameter.active == 1){
                                Parameter.active = 2;
                            }else 
                                Parameter.active = 1;
                            clearInterval(fun);
                        } 
                    }

                }
            })
        })
        .catch(function (error) {    
            console.log("Fetch error: " + error);
        });
        
    }, 4000);

}





