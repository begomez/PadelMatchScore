//////////////////////////////////////////////////////////////
// Utils to log both messages and errors
//////////////////////////////////////////////////////////////

var LOG_MSG = true;
var LOG_ERROR = true;

/**
 * Log message in output
 */
function logMessage(msg) {
	if (LOG_MSG) {
		console.log(msg);
	}
}

function logChange() {
	if (LOG_MSG) {
		console.log("...");
	}	
}

/**
 * Log error in error output
 */
function logError(errorMsg) {
	if (LOG_ERROR) {
		console.error(errorMsg);
	}
}