//////////////////////////////////////////////////////////////
// Logic for view "stats_graphic.html"
//////////////////////////////////////////////////////////////

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function initGraph() {
	var stored = readSumariesFromStorage();
	console.log(stored);
	var matches = fromStorageToObj(stored);
	dumpData(matches);

	
	var page = document.getElementById("stats"),
		graphEl = document.getElementById("graph"),
		titleMarquee = page.querySelector("header"),
		graphWidget,
		marquee;

	page.addEventListener("pagebeforeshow", function () {
		graphWidget = tau.widget.Graph(graphEl);
		
		//graphWidget.data.value("[10,12,15]");
	});
	
	page.addEventListener("pageshow", function () {
		marquee = tau.widget.Marquee(titleMarquee, {
			iteration: "infinite",
			marqueeStyle: "scroll",
			ellipsisEffect: "none",
			speed: 40,
			delay: 1000
		});
	});

	page.addEventListener("pagebeforehide", function () {
		graphWidget.destroy();
		marquee.destroy();
	});
}

function prepareDataForGraph(result) {
	var gamesPerMatch = Array();

	for (var i = 0; i < result.length; i++) {
		
		console.log(result[i].getGamesPerMatch());
		
		gamesPerMatch.add(result[i].getGamesPerMatch());
	}
	
	return gamesPerMatch;
}