function initBezel(ident, toRight, toLeft) {
    var page = document.getElementById(ident); /* Query with page ID */

    page.addEventListener('popupshow', function popupOpenHandler(e) {
        var popup = e.target, /* Popup element */

            /* Rotary event handler */
            rotaryEventHandler = function(e) {
                if (e.detail.direction === 'CW') {
                    /* Right direction */
                    
                    console.log("CW");
                    
                    toRight();
                    
                } else if (e.detail.direction === 'CCW') {
                    /* Left direction */
                    
                    console.log("CCW");
                    
                    toLeft();
                }
            };

        /* Register the rotary event */
        document.addEventListener('rotarydetent', rotaryEventHandler, false);

        /* Deregister the rotary event */
        popup.addEventListener('popuphide', function popupHideHandler() {
            popup.removeEventListener('popuphide', popupHideHandler, false);
            document.removeEventListener('rotarydetent', rotaryEventHandler, false);
        }, false);
    }, false);

    page.addEventListener('pagebeforeshow', function pageScrollHandler(e) {
        var page = e.target;

        /* Rotary event handler */
        rotaryEventHandler = function(e) {
            if (e.detail.direction === 'CW') {
                /* Right direction */
                console.log("CW");
                
                toRight();
                
            } else if (e.detail.direction === 'CCW') {
                /* Left direction */
                console.log("CCW");
                
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
