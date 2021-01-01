var PAGE_INDEX = "index.html";
var PAGE_SCORE = "score.html";
var PAGE_RESULTS = "list.html";
var PAGE_STATS = "index_stats.html";
var PAGE_TUT = "tutorial.html";
var PAGE_GRAPH = "stats_graphic.html";
var PAGE_BARS = "stats_cols.html";

(function initNavigation() {
	tau.defaults.pageTransition = "slideup";
})();

function navigateBack() {
	tau.back();
}

function toIndex() {
	navigateTo(PAGE_INDEX);
}

function toScore() {
	navigateTo(PAGE_SCORE);
};

function toResults() {
	navigateTo(PAGE_RESULTS);
}

function toStats() {
	navigateTo(PAGE_STATS);
}

function toTutorial() {
	navigateTo(PAGE_TUT);
}

function toGraphic() {
	navigateTo(PAGE_GRAPH);
}

function toBars() {
	navigateTo(PAGE_BARS);
}

function navigateTo(target) {
	tau.changeTo(target);
}