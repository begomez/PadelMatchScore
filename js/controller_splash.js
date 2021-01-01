//////////////////////////////////////////////////////////////
// Functions used on splash.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
}

function initComponents() {
	if (storageHasNoKeys()) {
		initStorage();
	}

	truncateRepository();
}