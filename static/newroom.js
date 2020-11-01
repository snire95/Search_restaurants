newRoom = () => {
    var Parameter = {
        rows : document.querySelector('#rows').value,
        columns : document.querySelector('#columns').value,
        victoryScore : document.querySelector('#win').value,
        name1 :  document.querySelector('#name_1').value,
        victory: true,
        Player : 1,
        LastModifiedMounter : 0, 
    };
    if(testErr(Parameter)){
        fetch(`${window.origin}/newRoom`, {
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
        .then(function (data) {
            window.location.href = `${window.origin}/id/${data}`;
	    });
        })
        .catch(function (error) {    
            console.log("Fetch error: " + error);
        });


    }
    
}

ViewName2 = () => {
    fetch(`${window.location.href}/ViewName2`)
    .then(response => response.json())
    .then(function(data) {
        if(data != null){
            ViewName(data);
            clearInterval(myVar);
        }
    });  
}


newTab = () => {
    window.open(`${location.href}`) 
}




