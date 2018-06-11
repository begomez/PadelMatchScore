//////////////////////////////////////////////////////////////
// Functions used in discard.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";
var ID_CURRENT = "current";
var ID_BTN = "btnAction";

var SUCCESS_MSG = LANG_JSON_DATA["discard_success"];


function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_discard"];
	window.document.getElementById(ID_CURRENT).innerHTML = LANG_JSON_DATA["str_current"];

}

function discardGameFromStorage() {
	if (isPlaying()) {
		startLoading();

		setTimeout(
			function() {
				resetMatchInStorage();

				drawDone();

				resetViews();

				endLoading();

			}, 
			LOADING_TIME
		);
	}
}

function drawDone() {
	writeTextInHTML(ID_CURRENT, SUCCESS_MSG);
}

