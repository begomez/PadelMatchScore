//////////////////////////////////////////////////////////////
// Functions used in discard.html
//////////////////////////////////////////////////////////////
var SUCCESS_MSG = LANG_JSON_DATA["discard_success"];
var MAIN_SCORE_BOARD = "board";

function discardGameFromStorage() {
	var widgetName = MAIN_SCORE_BOARD;
	
	if (isPlaying()) {
		startLoading(widgetName);

		setTimeout(
			function() {
				resetMatchInStorage();

				//drawDone(SUCCESS_MSG);

				endLoading(widgetName);

			}, 
			LOADING_TIME
		);
		
	} else {

	}
}

function drawDone() {
	showHTMLWidget(VIEW_MSG_ID);
	writeTextInHTML(VIEW_MSG_ID, SUCCESS_MSG);

	hideHTMLWidget(VIEW_TIME_ID);
	hideHTMLWidget(VIEW_SCORE_ID);
}

