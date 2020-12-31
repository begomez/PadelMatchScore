//////////////////////////////////////////////////////////////
// Functions used in discard.html
//////////////////////////////////////////////////////////////
var SUCCESS_MSG = LANG_JSON_DATA["discard_success"];

/*
function setTexts() {
	window.document.getElementById(VIEW_TITLE_ID).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(VIEW_SUBTITLE_ID).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(VIEW_TIME_ID).innerHTML = "";
	window.document.getElementById(VIEW_SCORE_ID).innerHTML = "";
	window.document.getElementById(VIEW_MSG_ID).innerHTML = LANG_JSON_DATA["error_no_match"];
	window.document.getElementById(VIEW_BTN_ID).innerHTML = LANG_JSON_DATA["action_discard"];
}
*/

function discardGameFromStorage() {
	var widgetName = "board";
	
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

