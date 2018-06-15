//////////////////////////////////////////////////////////////
// Functions used in splash.html
//////////////////////////////////////////////////////////////

var IMG_STEP_1 = "tut_step_2.png";
var IMG_STEP_2 = "tut_step_3.png";
var IMG_STEP_3 = "tut_step_4.png";

var ID_IMG = "imgTutorial";
var ID_MSG = "msgTutorial";
var ID_BTN = "btnTutorial";
var ID_BTN_SKIP = "btnSkip";

var FIRST_PAGE = 1;
var SECOND_PAGE = 2;
var THIRD_PAGE = 3;

var page = 1;

function setTexts() {
	window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_continue"];
	window.document.getElementById(ID_BTN_SKIP).innerHTML = LANG_JSON_DATA["action_skip"];
}

function configPage(page) {
	logMessage("Navigating to page " + page);

	switch(page) {
		case FIRST_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step1"];
			loadImage(ID_IMG, "../images/" + IMG_STEP_1);
			break;
		case SECOND_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step2"];
			loadImage(ID_IMG, "../images/" + IMG_STEP_2);
			break;
		case THIRD_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step3"];
			window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_done"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_3);
			break;
		default:
			onSkipClick();
			break;
	}
}

function onSkipClick(page) {
	window.location = "index.html";
}
