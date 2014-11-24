function search() {
	var artist = "Yo";
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
		var tab = tabs[0];
		if(tabs.length == 0) {
			document.getElementById("Stuff").innerHTML = "Grooveshark isn't open!";
			return;
		}
		else
		{
			chrome.tabs.sendMessage(tab.id, {message: "getPlayState"}, function(response) {
                var getState = response.data.slice(23,26);
                if (getState == "pla"){
                	document.getElementById("playpause").src = "/img/Pause.png";
                  document.getElementById("pstate").innerHTML = "<b>Now Playing</b> - ";
                }else if (getState == "pau"){
                	document.getElementById("playpause").src = "/img/Play.png";
                  document.getElementById("pstate").innerHTML = "<b>Paused</b> - ";
                }
            });
      chrome.tabs.sendMessage(tab.id, {message: "getNextAndPrev"}, function (response) {
        //see if skip to next song or previous song is available.
            NPStates = response.data;
        });
			chrome.tabs.sendMessage(tab.id, {message: "nowplaying"}, function(response) {
				var n = response.data.search("title=\"");
				if(n==-1) {
					document.getElementById("Stuff").innerHTML = "Nothing is playing";
					return;
				}else{
            if (NPStates[0]){ //check if prev is possible
              document.getElementById("prev").src = "/img/Prev.png";
            }else{
              document.getElementById("prev").src = "/img/PrevFaded.png";
            }
            if (NPStates[1]){//check if next is possible
              document.getElementById("next").src = "/img/Next.png";
            }
            else{
              document.getElementById("next").src = "/img/NextFaded.png";
            }
        }
				n+=7;
				var i = n;
				while(response.data[i] != ">") {
					i+=1;
				};
				i-=1;
				var title = response.data.slice(n,i);
				var newstr = response.data.slice(i,response.data.length);
				n = newstr.search("title=\"");
				n+=7;
				i = n;
				while(newstr[i] != ">") {
					i+=1;
				};
				i-=1;
				artist = newstr.slice(n,i);
				document.getElementById("next").onclick = playNext;
				document.getElementById("prev").onclick = playPrev;
				document.getElementById("playpause").onclick = playPause;
				document.getElementById("Stuff").innerHTML = artist + " - " + title;
				return;
			});
		} 
	});
}

function selectTab() {
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
        var tabToActivate = tabs[0];
        tabToActivate_Id = tabToActivate.id;
        chrome.tabs.update(tabToActivate_Id, {active: true});
	});
}

function getAlbumArt() {
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message:'art'}, function(response) {
			document.getElementById("albumart").src=response.data;
			return;
		});
	});
}

function playPause() {
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message:'playpause'}, function(response) {
			search();
			getAlbumArt();
			return;
		});
	});
}

function playPrev() {
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message:'playprev'}, function(response) {
			sleep(500);
			search();
			getAlbumArt();
			return;
		});
	});
}

function playNext() {
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message:'playnext'}, function(response) {
			sleep(500);
			search();
			getAlbumArt();
			return;
		});
	});
}

function addToCollection() {
	var tab = chrome.tabs.getCurrent;
	chrome.tabs.query({url:"*://grooveshark.com/*"}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message:'addtocollection'}, function(response) {
			chrome.tabs.update(tab.id, {active:true});
			return;
		});
	});
}

chrome.commands.onCommand.addListener(function(command) {
  search();
  getAlbumArt();
});

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
