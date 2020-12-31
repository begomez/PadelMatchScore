//////////////////////////////////////////////////////////////
// Anim utils
//////////////////////////////////////////////////////////////

var SPLASH_IMG = "splash_img";
var LOADER_CONTAINER = "loaderContainer";
var LOADER_ICON = "loaderIcon";
var LOADER_MSG = "loaderMsg";
var LOADER_ANIMATED = "ball_animated";
var ID_BTN = "btnAction";

var LOADING_TIME = 1500;

function animateSplash() {
    innerAnimate(SPLASH_IMG);
}

function myPlayFunction() {
    innerAnimate(LOADER_ICON);
}

function innerAnimate(target) {
    document.getElementById(target).style.WebkitAnimationPlayState = "running"; // Code for Chrome, Safari, and Opera
    document.getElementById(target).style.animationPlayState = "running";	
} 

function myPauseFunction() {
    document.getElementById(LOADER_ICON).style.WebkitAnimationPlayState = "paused"; // Code for Chrome, Safari, and Opera
    document.getElementById(LOADER_ICON).style.animationPlayState = "paused";
}

function startLoading(widgetName) {
	hideHTMLWidget(widgetName);
    showHTMLWidget(LOADER_CONTAINER);
    myPlayFunction();
}

function endLoading(widgetName) {
	myPauseFunction();
	hideHTMLWidget(LOADER_CONTAINER);
	showHTMLWidget(widgetName);	
}


