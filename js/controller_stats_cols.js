//////////////////////////////////////////////////////////////
// Logic for view "stats_cols.html"
//////////////////////////////////////////////////////////////

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function initGraph () {
	var page = document.getElementById("bar"),
		graphEl = document.getElementById("graph"),
		graphWidget,
		data,
		i,
		numberOfBars = 7,//XXX:
		x,
		y,
		label;

	page.addEventListener("pagebeforeshow", function () {
		graphWidget = tau.widget.Graph(graphEl);
		data = [];

		label = "Series 1";
		for (i = 0; i < numberOfBars; i++) {
			x = i + 1;
			y = Math.round(Math.random() * 20);
			data.push({x: x, y: y, label: label});
		}

		label = "Series 2";
		for (i = 0; i < numberOfBars; i++) {
			x = i + 1;
			y = Math.round(Math.random() * 20);
			data.push({x: x, y: y, label: label});
		}
		
		label = "Series 3";
		for (i = 0; i < numberOfBars; i++) {
			x = i + 1;
			y = Math.round(Math.random() * 20);
			data.push({x: x, y: y, label: label});
		}

		graphWidget.value(data);
	});
}

function prepareDataForBars(result) {
	var gamesSet1 = Array();
	var gamesSet2 = Array();
	var gamesSet3 = Array();

	for (var i = 0; i < result.length; i++) {		
		gamesSet1.add(result[i].getGamesPerSet(1));
		gamesSet2.add(result[i].getGamesPerSet(2));
		gamesSet3.add(result[i].getGamesPerSet(3));
	}
}