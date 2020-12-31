//////////////////////////////////////////////////////////////
// Functions used in bar.html
//////////////////////////////////////////////////////////////


var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";

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
		numberOfBars = 7,
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

		graphWidget.value(data);
	});
};