chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
 	if(request.message == 'nowplaying') {
 		var str;
 		if(document.getElementById("now-playing-metadata"))
 			str = document.getElementById("now-playing-metadata").innerHTML;
 		else
 			str = "Nothing is playing.";
  		sendResponse({data: str});
  	}
  	else if(request.message == 'art') {
  		var str;
  		if(document.getElementById("now-playing-image"))
  			str = document.getElementById("now-playing-image").src;
  		sendResponse({data: str});
  	}
    else if(request.message == 'getPlayState'){
 		var str = "";
 		if(document.getElementById("play-pause"))
 			str = document.getElementById("play-pause").className;
  		sendResponse({data: str});
    }
  });
