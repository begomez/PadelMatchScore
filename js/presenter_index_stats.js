//////////////////////////////////////////////////////////////
// Functions used in index.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";
var ID_ITEM_1 = "item1";
var ID_ITEM_2 = "item2";

function navigateTo(target) {
	window.location = target;
}

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_ITEM_1).innerHTML = LANG_JSON_DATA["option_stats_static"];
	window.document.getElementById(ID_ITEM_2).innerHTML = LANG_JSON_DATA["option_stats_bar"];
}