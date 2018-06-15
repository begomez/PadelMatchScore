//////////////////////////////////////////////////////////////
// Local storage lib
//////////////////////////////////////////////////////////////

var KEY_IN_PLAY = "key_in_play";
var KEY_SCORE_LOCAL = "key_score_local";
var KEY_SCORE_VISITOR = "key_score_visitor";
var KEY_TIMESTAMP = "key_timestamp";

var VALUE_DEFAULT = "0,0,0,0,0";
var VALUE_UNDEFINED = "undefined";


function supportsStorage() {
	if (typeof(Storage) !== VALUE_UNDEFINED) {
		logMessage("Storage supported...");

	    return true;

	} else {
		logError("Storage NOT supported");

	    return false;
	}
}

function getLocalStorage() {
	return window.localStorage;
}

function getSessionStorage() {
	return window.sessionStorage;
}

function storageHasNoKeys() {
	return 
		readLocalScoreFromStorage() === null 
		&& readVisitorScoreFromStorage() === null
		;
}

function writePlayingMatchInStorage() {
	getLocalStorage().setItem(KEY_IN_PLAY, VALUE_TRUE);
	getLocalStorage().setItem(KEY_TIMESTAMP, new Date());
}

function readPlayingMatchFromStorage() {
	return getLocalStorage().getItem(KEY_IN_PLAY);
}

function initStorage() {
	var storage = getLocalStorage();

	storage.setItem(KEY_IN_PLAY, VALUE_FALSE);
	storage.setItem(KEY_SCORE_LOCAL, VALUE_DEFAULT);
	storage.setItem(KEY_SCORE_VISITOR, VALUE_DEFAULT);

	logMessage("Storage was init");
}

function saveMatchInStorage(local, visitor) {
	var storage = getLocalStorage();

	storage.setItem(KEY_SCORE_LOCAL, local);
	storage.setItem(KEY_SCORE_VISITOR, visitor);
}

function readLocalScoreFromStorage() {
	return getScoreKeyOrDefault(KEY_SCORE_LOCAL);
}

function readVisitorScoreFromStorage() {
	return getScoreKeyOrDefault(KEY_SCORE_VISITOR);
}

function getScoreKeyOrDefault(key) {
	var value = getLocalStorage().getItem(key);

	if (value == null) {
		value = VALUE_DEFAULT;

	} else if (value === VALUE_UNDEFINED) {
		value = VALUE_DEFAULT;

	} else if (value === "") {
		value = VALUE_DEFAULT;
	}

	logMessage("key " + key + "\n" + " value " + value);

	return value;
}

function resetMatchInStorage() {
	var storage = getLocalStorage();

	storage.setItem(KEY_TIMESTAMP, "");
	storage.setItem(KEY_SCORE_LOCAL, VALUE_DEFAULT);
	storage.setItem(KEY_SCORE_VISITOR, VALUE_DEFAULT);
	storage.setItem(KEY_IN_PLAY, VALUE_FALSE);

	logMessage("Data reset from storage");
}

function storageTime2HTML() {
	var ret = "";

	if (readPlayingMatchFromStorage() == VALUE_TRUE) {
		var TIMEZONE_GMT = "GMT";

		var strDate = getLocalStorage().getItem(KEY_TIMESTAMP);
		
		ret += strDate.substring(0, strDate.indexOf(TIMEZONE_GMT));
	}

	return ret;
}

function storageScore2HTML() {
	var ret = "";

	if (readPlayingMatchFromStorage() == VALUE_TRUE) {				
		ret += getSetsSummary();
	}

	return ret;
}

function getSetsSummary() {
	var ret = "";
	var DASH = "-";
	var BLANK = " "; 

	var local = readLocalScoreFromStorage();	
	var localArr = stringToArray(local, SEPARATOR);

	var visitor = readVisitorScoreFromStorage();
	var visitorArr = stringToArray(visitor, SEPARATOR);

	ret += (localArr[INDEX_SET1]).trim() + DASH + (visitorArr[INDEX_SET1]).trim();
	ret += BLANK;
	ret += (localArr[INDEX_SET2]).trim() + DASH + (visitorArr[INDEX_SET2]).trim();
	ret += BLANK;
	ret += (localArr[INDEX_SET3]).trim() + DASH + (visitorArr[INDEX_SET3]).trim();

	return ret;
}
