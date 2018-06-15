//////////////////////////////////////////////////////////////
// Functions used in finish.html
//////////////////////////////////////////////////////////////

var VIEW_TITLE_ID = "mainTitle";
var VIEW_SUBTITLE_ID = "secondaryTitle";

var VIEW_TIME_ID = "currentTime";
var VIEW_SCORE_ID = "currentResult";

var VIEW_BTN_ID = "btnAction";
var VIEW_MSG_ID = "empty";


function isPlaying() {
	return readPlayingMatchFromStorage() == VALUE_TRUE;
}

function drawDone(msg) {
	showHTMLWidget(VIEW_MSG_ID);
	writeTextInHTML(VIEW_MSG_ID, msg);

	hideHTMLWidget(VIEW_TIME_ID);
	hideHTMLWidget(VIEW_SCORE_ID);	
}

function drawEmpty() {
	showHTMLWidget(VIEW_MSG_ID);

	hideHTMLWidget(VIEW_TIME_ID);
	hideHTMLWidget(VIEW_SCORE_ID);

	disableHTMLWidget(VIEW_BTN_ID);
}

function drawItem(time, score) {
	writeTextInHTML(VIEW_TIME_ID, time);
	writeTextInHTML(VIEW_SCORE_ID, score);

	hideHTMLWidget(VIEW_MSG_ID);

	enableHTMLWidget(VIEW_BTN_ID);
}

function fetchLastMatch() {
	if (isPlaying()) {
		drawItem(storageTime2HTML(), storageScore2HTML());

	} else {
		drawEmpty();
	}
}
