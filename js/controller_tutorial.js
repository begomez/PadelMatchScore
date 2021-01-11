//////////////////////////////////////////////////////////////
// Logic for view "tutorial.html"
//////////////////////////////////////////////////////////////

var IMG_STEP_1 = "tut_step_1.png";
var IMG_STEP_2 = "tut_step_2.png";
var IMG_STEP_3 = "tut_step_3.png";
var IMG_STEP_4 = "tut_step_4.png";

var ID_IMG = "imgTutorial";
var ID_MSG = "msgTutorial";
var ID_BTN = "btnSkip";

var FIRST_PAGE = 1;
var SECOND_PAGE = 2;
var THIRD_PAGE = 3;
var FOURTH_PAGE = 4;

var page = 1;

function setTexts() {
}

function configPage(page) {	
	logMessage("Navigating to page " + page);

	hideHTMLWidget(ID_BTN);
	
	window.document.getElementById("tutorial").scrollTop = 0;

	switch(page) {
		case FIRST_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step1"];
			loadImage(ID_IMG, "../images/" + IMG_STEP_1);
			hideFooter();
			break;
		case SECOND_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step2"];
			loadImage(ID_IMG, "../images/" + IMG_STEP_2);
			hideFooter();
			break;
		case THIRD_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step3"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_3);
			hideFooter();
			break;
		case FOURTH_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step4"];
			window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_done"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_4);
			showFooter();
			break;
		default:
			onSkipClick();
			break;
	}
}

function onSkipClick() {
	window.location = "index.html";
}
