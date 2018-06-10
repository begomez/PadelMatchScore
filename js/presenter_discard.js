//////////////////////////////////////////////////////////////
// Functions used in discard.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_CURRENT = "current";
var ID_BTN = "btnAction";

var SUCCESS_MSG = "Match discarded";


function setTexts() {

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

