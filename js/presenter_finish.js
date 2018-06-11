//////////////////////////////////////////////////////////////
// Functions used in finish.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";
var ID_CURRENT = "current";
var ID_BTN = "btnAction";

var SUCCESS_MSG = LANG_JSON_DATA["finish_success"];



function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_finish"];
	window.document.getElementById(ID_CURRENT).innerHTML = LANG_JSON_DATA["str_current"];
}

function saveGameInDB() {
	if (isPlaying()) {
		prepareRepository();

		startLoading();

		setTimeout(
			function() {
				fetchDBData();
			}, 
			LOADING_TIME
		);
	}
}

function fetchDBData() {
	var db = getRepository();

	fetchMaxMatchId(db, function(result) {
		insertDBData(db, result);
	});
}

function insertDBData(db, result) {
	insertLocalScore(db, result);
	insertVisitorScore(db, result);
	
	var summary = getSetsSummary();
	insertEndMatch(db, result, summary);

	resetMatchInStorage();

	drawDone();

	resetViews();

	endLoading();
}

function insertLocalScore(db, matchId) {
	var local = readLocalScoreFromStorage();
	logMessage("local is" + local);
	var localArr = stringToArray(local, SEPARATOR);

	var localNumArr = new Array();

	for (var i = 0; i < localArr.length; i++) {
		localNumArr.push(Number(localArr[i]));
	}

	insertScore(
		db, 
		localNumArr[INDEX_POINTS], 
		localNumArr[INDEX_SET1], 
		localNumArr[INDEX_SET2], 
		localNumArr[INDEX_SET3], 
		localNumArr[INDEX_ID], 
		matchId);
}

function insertVisitorScore(db, matchId) {
	var visitor = readVisitorScoreFromStorage();
	
	var visitorArr = stringToArray(visitor, SEPARATOR);

	var visitorNumArr = new Array();

	for (var i = 0; i < visitorArr.length; i++) {
		visitorNumArr.push(Number(visitorArr[i]));
	}

	insertScore(
		db, 
		visitorNumArr[INDEX_POINTS], 
		visitorNumArr[INDEX_SET1], 
		visitorNumArr[INDEX_SET2], 
		visitorNumArr[INDEX_SET3], 
		visitorNumArr[INDEX_ID], 
		matchId);
}

function drawDone() {
	writeTextInHTML(ID_CURRENT, SUCCESS_MSG);
}

