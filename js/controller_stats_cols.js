//////////////////////////////////////////////////////////////
// Logic for view "stats_cols.html"
//////////////////////////////////////////////////////////////

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function initGraph () {
	var stored = readSumariesFromStorage();
	console.log(stored);
	var matches = fromStorageToObj(stored);
	dumpData(matches);
	
	var page = document.getElementById("bar"),
		graphEl = document.getElementById("graph"),
		graphWidget,
		data,
		i,
		numberOfBars = matches.length,
		x,
		y,
		label;

	
	page.addEventListener("pagebeforeshow", function () {
		graphWidget = tau.widget.Graph(graphEl);
			
		data = [];

		label = LANG_JSON_DATA["stats_local"];
		for (i = 0; i < numberOfBars; i++) {
			x = i + 1;
			y = matches[i].getLocalGamesPerMatch();
			data.push({x: x, y: y, label: label});
		}

		label = LANG_JSON_DATA["stats_visitor"];
		for (i = 0; i < numberOfBars; i++) {
			x = i + 1;
			y = matches[i].getVisitorGamesPerMatch();
			data.push({x: x, y: y, label: label});
		}
		
		graphWidget.value(data);
	});
}
