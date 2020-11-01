
// TODO: Wrap everything with self executing function, example: (function() {})()
const play = document.getElementById("play");
const game = document.getElementById("game");   
const add = document.getElementById("startGame");
var myVar = setInterval(ViewName2, 3000);

myFunction = (event) =>  {
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
            document.getElementById("div-input-name-2").classList.add('remove');
            document.getElementById("div-name-2").classList.remove('remove');  
        }
        tableCreation(Parameter); 
        document.querySelector('#name-1').textContent = Parameter.name1;
        document.querySelector('#win').textContent = "Sequence of "+ Parameter.victoryScore +" for victory";
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
    var fun = setInterval( async () => {
        const response = await fetch(`${window.location.href}/startGame`)
        const data = await response.json();       
        if(data[0] !== undefined){
            if(data[0][1] !== Parameter.Player && data[0][4] == 0){
                pp = (data[0][3]);
                tr = parseInt(pp.charAt(1));
                td = parseInt(pp.charAt(4));
                tdd = arrayLocation(tr, Parameter.arrGame, Parameter.rows);
                Parameter.active = data[0][1]
                playerColorChange(td, tr, Parameter);
                testGame(td, tr, Parameter);
                if(Parameter.victory){
                    setActivePlayer();
                    console.log( "td : " + td + " tr : " + tr );
                    console.log(Parameter);
                    if(Parameter.active == 1){
                        Parameter.active = 2;
                    }else 
                        Parameter.active = 1;
                }
          
                clearInterval(fun);
            }
        }
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }     
    }, 2000);
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


