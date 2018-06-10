//////////////////////////////////////////////////////////////
// Javascript utils 
//////////////////////////////////////////////////////////////

var SEPARATOR = ",";

var INDEX_ID = 0;
var INDEX_POINTS = 1;
var INDEX_SET1 = 2;
var INDEX_SET2 = 3;
var INDEX_SET3 = 4;

var VALUE_NO_ID = 0;
var VALUE_TRUE = "true";
var VALUE_FALSE = "false";

function getNow() {
    return new Date();
}

function arrayToString(arr) {
	return arrayToString(arr, SEPARATOR);
}

function arrayToString(arr, separator) {
	var str = "";
	
	for (var i = 0; i < arr.length; i++) {
		str += trim(arr[i]);
		
		if (i <= (arr.length - 1)) { 
			str += separator;
		}
	}

	return trim(str);
}

function stringToArray(str) {
	return stringToArray(str, SEPARATOR);
}

function stringToArray(str, separator) {
	return str.split(separator);
}

function formatDateInMilis(milis) {
	return new Date(milis).toDateString();
}