//////////////////////////////////////////////////////////////
// Common logic for data visualization views
//////////////////////////////////////////////////////////////
var PAGE = 1;
var OFFSET = 10;

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function retrieveData() {
	fetchFromDB();
}

function dumpData(result) {
	for (var i = 0; i < result.length; i++) {
		console.log(result[i].getSummary());
		console.log(result[i].getGamesPerSet(1));
		console.log(result[i].getGamesPerSet(2));
		console.log(result[i].getGamesPerSet(3));
		console.log(result[i].getGamesPerMatch());
	}
}

function prepareDataForGraph(result) {
	var gamesPerMatch = Array();

	for (var i = 0; i < result.length; i++) {
		
		console.log(result[i].getGamesPerMatch());
		
		gamesPerMatch.add(result[i].getGamesPerMatch());
	}
	
	return gamesPerMatch;
}

function prepareDataForBars(result) {
	var gamesSet1 = Array();
	var gamesSet2 = Array();
	var gamesSet3 = Array();

	for (var i = 0; i < result.length; i++) {		
		gamesSet1.add(result[i].getGamesPerSet(1));
		gamesSet2.add(result[i].getGamesPerSet(2));
		gamesSet3.add(result[i].getGamesPerSet(3));
	}
}

function fetchFromDB() {
	var db = getRepository();

	fetchFinishedMatches(
		db,
		PAGE,
		PAGE * OFFSET, 
		function(result) {
			dumpData(result)

		},
		function() {
			
		}
	);
}