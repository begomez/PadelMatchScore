var DELAY = 3000;
var DIRECTION_CW = "CW";
var DIRECTION_CCW = "CCW";
var locked = false;


function initBezel(tau, ident, toRight, toLeft, delay) {
    var page = document.getElementById(ident); /* Query with page ID */

    
    page.addEventListener('pagebeforeshow', function pageScrollHandler(e) {
        var page = e.target;

        
        /* Rotary event handler */
        rotaryEventHandler = function rotHandler(e) {
   
        	if (e.detail.direction === DIRECTION_CW) {
                /* Right direction */
                console.log("rotating CW");
                if (locked == false) {
                		locked = true;
                		toRight();
                		setTimeout(
            				function() {locked = false;}, 
            				delay
        				);
                }
                    
            } else if (e.detail.direction === DIRECTION_CCW) {
                /* Left direction */
                console.log("rotating CCW");
                if (locked == false) {
                		locked = true;
                		toLeft();
                		setTimeout(
            				function() {locked = false;},
            				delay
                		);
                }
            }
        };

        /* Register the rotary event */
        document.addEventListener('rotarydetent', rotaryEventHandler, false);

        /* Deregister the rotary event */
        page.addEventListener('pagebeforehide', function pageHideHandler() {
            page.removeEventListener('pagebeforehide', pageHideHandler, false);
            document.removeEventListener('rotarydetent', rotaryEventHandler, false);
        }, false);
    }, false);
}
