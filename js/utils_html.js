//////////////////////////////////////////////////////////////
// Javascript utils used to manage DOM elements
//////////////////////////////////////////////////////////////
var INDEX_PLAYER = 0;
var INDEX_POINTS = 1;
var INDEX_SET1 = 2;
var INDEX_SET2 = 3;
var INDEX_SET3 = 4;

var ID_PREFIX_LOCAL = "local";
var ID_PREFIX_VISITOR = "visitor";

var ID_POINTS_HTML = "Points";
var ID_SET1_HTML = "Set1";
var ID_SET2_HTML = "Set2";
var ID_SET3_HTML = "Set3";

var UNIT = 10;
var LARGE = "xx-large";
var LARGER = "larger";

var WIDGET_BR = "BR";
var WIDGET_LI = "LI";
var WIDGET_P = "P";
var WIDGET_DIV = "DIV";
var WIDGET_SPAN = "SPAN";
var WIDGET_H1 = "H1";


function readTextFromHTML(name) {
	return window.document.getElementById(name).innerHTML;
}

function writeTextInHTML(name, value) {
	window.document.getElementById(name).innerHTML = value;
}

function readLocalScoreFromHTML() {
	return readScore(ID_PREFIX_LOCAL);
}

function readVisitorScoreFromHTML() {
	return readScore(ID_PREFIX_VISITOR);
}

function readScore(target) {
	var arr = new Array();

	arr[INDEX_PLAYER] = 0;
	arr[INDEX_POINTS] = readTextFromHTML(target + ID_POINTS_HTML);
	arr[INDEX_SET1] = readTextFromHTML(target + ID_SET1_HTML);
	arr[INDEX_SET2] = readTextFromHTML(target + ID_SET2_HTML);
	arr[INDEX_SET3] = readTextFromHTML(target + ID_SET3_HTML);

	return arr;
}

function writeLocalScoreInHTML(arr) {
	return writeScore(ID_PREFIX_LOCAL, arr);
}

function writeVisitorScoreInHTML(arr) {
	return writeScore(ID_PREFIX_VISITOR, arr);
}

function writeScore(target, arr) {
	writeTextInHTML(target + ID_POINTS_HTML, arr[INDEX_POINTS]);
	writeTextInHTML(target + ID_SET1_HTML, arr[INDEX_SET1]);
	writeTextInHTML(target + ID_SET2_HTML, arr[INDEX_SET2]);
	writeTextInHTML(target + ID_SET3_HTML, arr[INDEX_SET3]);
}

function resizeElement(large, larger, id) {
    document.getElementById(large).style.fontSize = LARGE;
    document.getElementById(larger).style.fontSize = LARGER;
}

function decrease(percent) {
	return (parseInt(percent) - UNIT) + "%";
}

function increase(percent) {
	return (parseInt(percent) + UNIT) + "%";        
}

function getInnerChild(widget, target) {
	var INDEX_FIRST = 0;

    return widget.getElementsByTagName(target)[INDEX_FIRST];
}

function getOuterParent(widget) {
    return widget.parentNode;
}

function getSibling(widget, targetTag) {
    return getSiblingInPosition(widget, targetTag, 1);
}

function getSiblingInPosition(widget, targetTag, pos) {
	var parent = getOuterParent(widget);

	return parent.getElementsByTagName(targetTag)[pos];
}

function createHTMLItemList() {
	return createHTMLWidget(WIDGET_LI);
}

function createHTMLSpan() {
	return createHTMLWidget(WIDGET_SPAN);
}

function createHTMLPara() {
	return createHTMLWidget(WIDGET_P);
}

function createHTMLDiv() {
	return createHTMLWidget(WIDGET_DIV);
}

function createHTMLNewLine() {
	return createHTMLWidget(WIDGET_BR);
}

function addTextToHTMLWidget(widget, text) {
	var node = document.createTextNode(text);

	widget.appendChild(node);
} 

function removeStyleFromHTMLWidgetById(target, styleName) {
	var widget = window.document.getElementById(target);

	widget.className = widget.className.replace(styleName, "");
}

function addStyleToHTMLWidget(widget, styleName) {
	if (widget != null) {
		widget.classList.add(styleName);
	}
}

function addStyleToHTMLWidgetById(target, styleName) {
	var widget = window.document.getElementById(target);

	widget.classList.add(styleName);
}

function createHTMLWidget(type) {
	return document.createElement(type);
}

function showHTMLWidget(ident) {
	window.document.getElementById(ident).style.visibility = "visible";
	window.document.getElementById(ident).style.display = "block";
}

function hideHTMLWidget(ident) {
	window.document.getElementById(ident).style.visibility = "hidden";
	window.document.getElementById(ident).style.display = "none";
}

function enableHTMLWidget(target) {
	window.document.getElementById(target).enabled = true;
}

function disableHTMLWidget(target) {
	window.document.getElementById(target).removeAttribute("onclick");
}

function loadImage(target, name) {
	window.document.getElementById(target).src = name;
}
