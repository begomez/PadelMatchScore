//////////////////////////////////////////////////////////////
// Logic for discarding a game
//////////////////////////////////////////////////////////////


var SUCCESS_MSG = LANG_JSON_DATA["discard_success"];

function discardGameFromStorage() {
	var widgetName = MAIN_SCORE_BOARD;
	
	if (isPlaying()) {
		startLoading(widgetName);

		setTimeout(
			function() {
				resetMatchInStorage();

				endLoading(widgetName);
				
				navigateBack();
				
			}, 
			LOADING_TIME
		);
	}
}

function drawDone() {
	showHTMLWidget(VIEW_MSG_ID);
	writeTextInHTML(VIEW_MSG_ID, SUCCESS_MSG);

	hideHTMLWidget(VIEW_TIME_ID);
	hideHTMLWidget(VIEW_SCORE_ID);
}

