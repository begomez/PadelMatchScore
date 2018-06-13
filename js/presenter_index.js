//////////////////////////////////////////////////////////////
// Functions used in splash.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";
var ID_ITEM_1 = "item1";
var ID_ITEM_2 = "item2";
var ID_ITEM_3 = "item3";
var ID_ITEM_4 = "item4";
var ID_ITEM_5 = "item5";

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_ITEM_1).innerHTML = LANG_JSON_DATA["option_start"];
	window.document.getElementById(ID_ITEM_2).innerHTML = LANG_JSON_DATA["option_finish"];
	window.document.getElementById(ID_ITEM_3).innerHTML = LANG_JSON_DATA["option_discard"];
	window.document.getElementById(ID_ITEM_4).innerHTML = LANG_JSON_DATA["option_history"];
	window.document.getElementById(ID_ITEM_5).innerHTML = LANG_JSON_DATA["option_tutorial"];
}