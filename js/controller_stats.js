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

var data;

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
			
			data = result;
			
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
		console.log(result[i].getSummary());
		console.log(result[i].getGamesPerSet(1));
		console.log(result[i].getGamesPerSet(2));
		console.log(result[i].getGamesPerSet(3));
		console.log(result[i].getGamesPerMatch());
	}
}
