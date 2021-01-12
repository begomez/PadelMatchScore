//////////////////////////////////////////////////////////////
// Logic for view "tutorial.html"
//////////////////////////////////////////////////////////////

var IMG_STEP_1 = "tut_step_1.png";
var IMG_STEP_2 = "tut_step_2.png";
var IMG_STEP_3 = "tut_step_3.png";
var IMG_STEP_4 = "tut_step_4.png";
var IMG_STEP_5 = "tut_step_5.png";

var ID_IMG = "imgTutorial";
var ID_MSG = "msgTutorial";
var ID_BTN = "btnAction";
var ID_INDICATOR = "pageIndicator";

var MAX_PAGES = 5;
var FIRST_PAGE = 1;
var SECOND_PAGE = 2;
var THIRD_PAGE = 3;
var FOURTH_PAGE = 4;
var FIFTH_PAGE = 5;

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
			updateIndicator(page);
			break;
		case SECOND_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step2"];
			loadImage(ID_IMG, "../images/" + IMG_STEP_2);
			hideFooter();
			updateIndicator(page);
			break;
		case THIRD_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step3"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_3);
			hideFooter();
			updateIndicator(page);
			break;
		case FOURTH_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step4"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_4);
			hideFooter();
			updateIndicator(page);
			break;
		case FIFTH_PAGE:
			window.document.getElementById(ID_MSG).innerHTML = LANG_JSON_DATA["tutorial_step5"];
			window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_done"];
			loadImage(ID_IMG, "../images/"+ IMG_STEP_5);
			showFooter();
			updateIndicator(page);
			break;
		default:
			onSkipClick();
			break;
	}
}

function updateIndicator(page) {
	var indicator = document.getElementById(ID_INDICATOR);
	var tauIndicator =  tau.widget.PageIndicator(indicator, {numberOfPages: MAX_PAGES});
	if (tauIndicator !== null) {
		tauIndicator.setActive(page-1);		
	}	
}

function onSkipClick() {
	window.location = "index.html";
}
