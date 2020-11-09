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
newGame = () => {
  window.open(`${origin}`) 
}



function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  
function checkCookie(activeNotCookie) {
  var ActivePlayer = getCookie("id&Player" + window.location.pathname);
  if (ActivePlayer != "" && ActivePlayer != "undefined") {
    return ActivePlayer
  } else {
      setCookie("id&Player" + window.location.pathname, activeNotCookie, 30);
      return activeNotCookie
    }
}
