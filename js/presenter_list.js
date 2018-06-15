//////////////////////////////////////////////////////////////
// Functions used in list.html
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";
var ID_EMPTY = "empty";

var TARGET = "matchesList";

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["app_name"];
	window.document.getElementById(ID_EMPTY).innerHTML = LANG_JSON_DATA["error_no_data"];
}

function hideEmptyList() {
	hideHTMLWidget(ID_EMPTY);
}

function createMainListItem() {
	var item = createHTMLItemList();

	addStyleToHTMLWidget(item, "li-no-thumb");

	return item;
}

function createImageItem() {
	var div = createHTMLDiv();

	//addStyleToHTMLWidget(div, "img-icon");
	//addStyleToHTMLWidget(div, "play-icon");
	addStyleToHTMLWidget(div, "ui-li-thumb-left");

	return div;
}

function createDateItem(time) {
	var title = createHTMLSpan();

	addTextToHTMLWidget(title, formatMilisAsDateShort(time));
	addStyleToHTMLWidget(title, "title");

	return title;
}

function createTimeItem(time) {
	var subtitle = createHTMLSpan();

	addTextToHTMLWidget(subtitle, formatMilisAsTime(time));
	addStyleToHTMLWidget(subtitle, "subtitle");

	return subtitle;
}

function createSummaryItem(summary) {
	var content = createHTMLHeader();

	addTextToHTMLWidget(content, summary);
	addStyleToHTMLWidget(content, "content");

	return content;
}

function getData() {
	var db = getRepository();

	fetchFinishedMatches(
		db, 
		function(result) {
			hideEmptyList();

			drawList(result);
		},
		function() {
			//XXX: do nothing empty is already shown
		}
	);
}

function drawList(result) {
	var list = window.document.getElementById(TARGET);

	for (var i = 0; i < result.length; i++) {
		var item = createMainListItem();

		item.appendChild(createDateItem(result[i].getTime()));
		item.appendChild(createTimeItem(result[i].getTime()));
		item.appendChild(createSummaryItem(result[i].getSummary()));

		list.appendChild(item);
	}
	
}