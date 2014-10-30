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
			chrome.tabs.sendMessage(tab.id, {message: "nowplaying"}, function(response) {
				var n = response.data.search("title=\"");
				if(n==-1) {
					document.getElementById("Stuff").innerHTML = "Nothing is playing";
					return;
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
				document.getElementById("Stuff").innerHTML = "<b>Now Playing</b> - " + artist + " - " + title;
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
