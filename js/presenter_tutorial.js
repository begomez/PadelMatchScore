//////////////////////////////////////////////////////////////
// Functions used in splash.html
//////////////////////////////////////////////////////////////

var IMG_STEP_1 = "tut_step_1.png";
var IMG_STEP_2 = "tut_step_2.png";
var IMG_STEP_3 = "tut_step_3.png";
var IMG_STEP_4 = "tut_step_4.png";

var ID_IMG = "imgTutorial";
var ID_MSG = "msgTutorial";
var ID_BTN = "btnAction";
var ID_BTN_SKIP = "btnSkip";

var FIRST_PAGE = 1;
var SECOND_PAGE = 2;
var THIRD_PAGE = 3;
var FOURTH_PAGE = 4;

var page = 1;

function setTexts() {
	window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_continue"];
	window.document.getElementById(ID_BTN_SKIP).innerHTML = LANG_JSON_DATA["action_skip"];
}

function configPage(page) {
	window.document.getElementById("tutorial").scrollTop = 0;

	logMessage("Navigating to page " + page);

	switch(page) {
		case FIRST_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step1"];
			hideHTMLWidget(ID_BTN);
			loadImage(ID_IMG, "../images/" + IMG_STEP_1);
			break;
		case SECOND_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step2"];
			hideHTMLWidget(ID_BTN);
			loadImage(ID_IMG, "../images/" + IMG_STEP_2);
			break;
		case THIRD_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step3"];
			hideHTMLWidget(ID_BTN);
			loadImage(ID_IMG, "../images/"+ IMG_STEP_3);
			break;
		case FOURTH_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step4"];
			showHTMLWidget(ID_BTN);
			window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_done"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_4);
			break;
		default:
			onSkipClick();
			break;
	}
}

function onSkipClick(page) {
	window.location = "index.html";
}
