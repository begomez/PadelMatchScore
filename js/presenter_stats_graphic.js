//////////////////////////////////////////////////////////////
// Functions used in stats_graphic.html
//////////////////////////////////////////////////////////////


var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function initGraph() {
	var page = document.getElementById("stats"),
		graphEl = document.getElementById("graph"),
		titleMarquee = page.querySelector("header"),
		graphWidget,
		marquee;

	page.addEventListener("pagebeforeshow", function () {
		graphWidget = tau.widget.Graph(graphEl);
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