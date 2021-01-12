//////////////////////////////////////////////////////////////
// Logic for view "list.html"
//////////////////////////////////////////////////////////////

var ID_TITLE = "mainTitle";
var ID_SUBTITLE = "secondaryTitle";

var ID_BTN = "btnAction";

var TARGET = "matchesList";

var PAGE = 1;
var OFFSET = 2;

function setTexts() {
	window.document.getElementById(ID_TITLE).innerHTML = LANG_JSON_DATA["option_history"];
	//window.document.getElementById(ID_SUBTITLE).innerHTML = LANG_JSON_DATA["option_history"];
	window.document.getElementById(ID_BTN).innerHTML = LANG_JSON_DATA["action_more"];
}

function hideEmptyList() {
	hideHTMLWidget(ID_CONTAINER);
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

	addTextToHTMLWidget(title, formatMilisAsDate(time));
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
		PAGE,
		PAGE * OFFSET, 
		function(result) {
			hideEmptyList();

			drawList(result);

			PAGE++;
		},
		function() {
			toEmpty();
		}
	);
}

function drawList(result) {
	var list = window.document.getElementById(TARGET);

	emptyContainer(list);

	for (var i = 0; i < result.length; i++) {
		var item = createMainListItem();

		item.appendChild(createDateItem(result[i].getTime()));
		item.appendChild(createTimeItem(result[i].getTime()));
		item.appendChild(createSummaryItem(result[i].getSummary()));

		list.appendChild(item);
	}
}