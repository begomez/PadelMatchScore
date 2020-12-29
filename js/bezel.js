var DIRECTION_CW = "CW";
var DIRECTION_CCW = "CCW";

function initBezel(tau, ident, toRight, toLeft) {
    var page = document.getElementById(ident); /* Query with page ID */

    page.addEventListener('pagebeforeshow', function pageScrollHandler(e) {
        var page = e.target;

        /* Rotary event handler */
        rotaryEventHandler = function(e) {
            if (e.detail.direction === DIRECTION_CW) {
                /* Right direction */
                console.log("rotating CW");
                
                toRight();
                
                
            } else if (e.detail.direction === DIRECTION_CCW) {
                /* Left direction */
                console.log("rotating CCW");
                
                toLeft();
               
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
