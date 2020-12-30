//////////////////////////////////////////////////////////////
// Functions used in finish.html
//////////////////////////////////////////////////////////////
var SUCCESS_MSG = LANG_JSON_DATA["finish_success"];

/*
function setTexts() {
	window.document.getElementById(VIEW_TITLE_ID).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(VIEW_SUBTITLE_ID).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(VIEW_TIME_ID).innerHTML = "";
	window.document.getElementById(VIEW_SCORE_ID).innerHTML = "";
	window.document.getElementById(VIEW_MSG_ID).innerHTML = LANG_JSON_DATA["error_no_match"];
	window.document.getElementById(VIEW_BTN_ID).innerHTML = LANG_JSON_DATA["action_save"];
}
*/

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
	} else {
		//XXX: do nothing empty is already shown
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

	//drawDone(SUCCESS_MSG);

	endLoading();
}

function insertLocalScore(db, matchId) {
	var local = readLocalScoreFromStorage();

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


