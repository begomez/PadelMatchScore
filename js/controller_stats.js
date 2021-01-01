//////////////////////////////////////////////////////////////
// Common logic for data visualization views
//////////////////////////////////////////////////////////////
var PAGE = 1;
var OFFSET = 10;

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";

var ID_CONTAINER = "emptyContainer";
var ID_OPTIONS = "listContent";
var ID_EMPTY = "empty";

function retrieveData() {
	fetchFromDB();
}

function fetchFromDB() {
	var db = getRepository();

	fetchFinishedMatches(
		db,
		PAGE,
		PAGE * OFFSET, 
		function(result) {
			showHeader();
			hideEmptyList();
			
			writeSumariesInStorage(result);
			
			dumpData(result)

		},
		function() {
			hideHeader();
			hideOptions();
		}
	);
}

function hideEmptyList() {
	hideHTMLWidget(ID_CONTAINER);
}

function hideOptions() {
	hideHTMLWidget(ID_OPTIONS);	
} 

function dumpData(result) {
	for (var i = 0; i < result.length; i++) {
		logMessage(result[i].getSummary());
		logMessage(result[i].getGamesPerSet(1));
		logMessage(result[i].getGamesPerSet(2));
		logMessage(result[i].getGamesPerSet(3));
		logMessage(result[i].getGamesPerMatch());
	}
}

function fromStorageToObj(storage) {
	logMessage(storage);
	
	var strMatches = stringToArray(storage, ",");
	
	var matches = Array();
	
	for (i = 0; i < strMatches.length; i++) {
		var parts = stringToArray(strMatches[i], "/");
		
		logMessage(parts);
		
		var match = new PadelMatchSummary(parts[0], parts[1], parts[2]);
		
		logMessage(match.toString());
		
		matches.push(match);
	}
	
	return matches;
}
