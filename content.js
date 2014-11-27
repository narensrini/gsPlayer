chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
 	if(request.message == 'nowplaying') {
 		var str;
 		if(document.getElementById("now-playing-metadata"))
 			str = document.getElementById("now-playing-metadata").innerHTML;
 		else
 			str = "Nothing is playing.";
  		sendResponse({data: str});
  }else if(request.message == 'art') {
  		var str;
  		if(document.getElementById("now-playing-image"))
  			str = document.getElementById("now-playing-image").src;
  		sendResponse({data: str});
  }else if(request.message == 'getPlayState'){
 		var str = "";
 		if(document.getElementById("play-pause"))
 			str = document.getElementById("play-pause").className;
  		sendResponse({data: str});
  }else if(request.message == 'playpause'){
        var str = "";
        document.getElementById("play-pause").click();
        sendResponse({data: str});//this is just a temporary fix :p
  }else if(request.message == 'playnext'){
        var str = "";
        document.getElementById("play-next").click();
        sendResponse({data: str});//this is just a temporary fix :p
  }else if(request.message == 'playprev'){
        var str = "";
        document.getElementById("play-prev").click();
        sendResponse({data: str});//this is just a temporary fix :p
  }else if(request.message == 'addtocollection'){
        document.getElementById("np-add").click();
        var str = document.getElementById("np-add").getAttribute("class");
        sendResponse({data: str});//this is just a temporary fix :p
  }else if(request.message == 'collectionstatus'){
        var str = document.getElementById("np-add").getAttribute("class");
        sendResponse({data: str});//this is just a temporary fix :p
  }else if(request.message == "getNextAndPrev"){
        //get length of class name
        var states = [1,1];//start by assuming both are valid
        var prevClass =  document.getElementById("play-prev").getAttribute("class").length;
        var nextClass =  document.getElementById("play-next").getAttribute("class").length;
        console.log(nextClass);
        if (prevClass === 31){//then it's disabled
          states[0] = 0;
        }
        if (nextClass === 31){//then it's disabled
          states[1] = 0;
        }
        sendResponse({data: states});
  }
  else if(request.message == 'login') {
        if(document.getElementById("notification-button"))
            sendResponse({data: 'Y'});
        else
            sendResponse({data: 'N'});
  }
});

