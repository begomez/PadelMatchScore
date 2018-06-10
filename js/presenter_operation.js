//////////////////////////////////////////////////////////////
// Functions used in finish.html
//////////////////////////////////////////////////////////////

var VIEW_MSG_ID = "current";
var VIEW_BTN_ID = "btnAction";

var EMPTY_MSG = "No match";


function isPlaying() {
	return readPlayingMatchFromStorage() == VALUE_TRUE;
}

function drawEmpty() {
	writeTextInHTML(VIEW_MSG_ID, EMPTY_MSG);
}

function drawItem(result) {
	writeTextInHTML(VIEW_MSG_ID, result);
}

function resetViews() {
	disableHTMLWidget(VIEW_BTN_ID);
}

function fetchLastMatch() {
	if (isPlaying()) {
		drawItem(storageToHTML());
		enableHTMLWidget(VIEW_BTN_ID);

	} else {
		drawEmpty();
		resetViews();
	}
}
