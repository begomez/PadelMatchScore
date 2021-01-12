//////////////////////////////////////////////////////////////
// Logic for view "empty.html"
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";

var ID_EMPTY = "empty";
var ID_BTN = "btnAction";


function setTexts() {
	//window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["option_history"];
	window.document.getElementById(ID_EMPTY).innerHTML = LANG_JSON_DATA["error_no_data"];
	window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_done"];
}
