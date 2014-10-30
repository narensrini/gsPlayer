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
  });