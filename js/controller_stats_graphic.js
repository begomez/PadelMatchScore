//////////////////////////////////////////////////////////////
// Logic for view "stats_graphic.html"
//////////////////////////////////////////////////////////////

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function initGraph() {
	var stored = readSumariesFromStorage();
	var matches = fromStorageToObj(stored);
	dumpData(matches);

	
	var page = document.getElementById("stats"),
		graphEl = document.getElementById("graph"),
		titleMarquee = page.querySelector("header"),
		graphWidget,
		marquee;

	page.addEventListener("pagebeforeshow", function () {
		graphWidget = tau.widget.Graph(graphEl);
			
		for (i = 0; i < matches.length; i++) {
			graphWidget.value(matches[i].getLocalGamesPerSet(1));
			graphWidget.value(matches[i].getLocalGamesPerSet(2));
			graphWidget.value(matches[i].getLocalGamesPerSet(3));
		}
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
