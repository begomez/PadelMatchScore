//////////////////////////////////////////////////////////////
// Anim utils
//////////////////////////////////////////////////////////////

var LOADER_CONTAINER = "loaderContainer";
var LOADER_ICON = "loaderIcon";
var LOADER_MSG = "loaderMsg";
var LOADER_ANIMATED = "ball_animated";
var ID_BTN = "btnAction";

var LOADING_TIME = 1500;

function myPlayFunction() {
    document.getElementById(LOADER_ICON).style.WebkitAnimationPlayState = "running"; // Code for Chrome, Safari, and Opera
    document.getElementById(LOADER_ICON).style.animationPlayState = "running";
}

function myPauseFunction() {
    document.getElementById(LOADER_ICON).style.WebkitAnimationPlayState = "paused"; // Code for Chrome, Safari, and Opera
    document.getElementById(LOADER_ICON).style.animationPlayState = "paused";
}

function startLoading() {
	//hideHTMLWidget(ID_BTN);
    //showHTMLWidget(LOADER_CONTAINER);
    //myPlayFunction();
}

function endLoading() {
	//myPauseFunction();
	//hideHTMLWidget(LOADER_CONTAINER);
}


