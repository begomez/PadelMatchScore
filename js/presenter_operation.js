//////////////////////////////////////////////////////////////
// Functions used in finish.html
//////////////////////////////////////////////////////////////

var VIEW_TITLE_ID = "currentTime";
var VIEW_SUBTITLE_ID = "currentResult";

var VIEW_BTN_ID = "btnAction";

var EMPTY_MSG = LANG_JSON_DATA["error_no_match"];


function isPlaying() {
	return readPlayingMatchFromStorage() == VALUE_TRUE;
}

function drawEmpty() {
	writeTextInHTML(VIEW_TITLE_ID, EMPTY_MSG);
	hideHTMLWidget(VIEW_SUBTITLE_ID);
}

function drawItem(time, score) {
	writeTextInHTML(VIEW_TITLE_ID, time);
	writeTextInHTML(VIEW_SUBTITLE_ID, score);
}

function resetViews() {
	disableHTMLWidget(VIEW_BTN_ID);
}

function fetchLastMatch() {
	if (isPlaying()) {
		drawItem(storageTime2HTML(), storageScore2HTML());
		enableHTMLWidget(VIEW_BTN_ID);

	} else {
		drawEmpty();
		resetViews();
	}
}
