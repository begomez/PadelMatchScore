//////////////////////////////////////////////////////////////
// Tizen core lib
//////////////////////////////////////////////////////////////

( function () {
	window.addEventListener('tizenhwkey', function(ev) {
		if(ev.keyName === "back") {
			var page = document.getElementsByClassName('ui-page-active')[0],
				pageid = page ? page.id : "";
			
			
			if (pageid === "main") {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {}
				
			} else {
				page = document.getElementsByClassName("ui-page")[0];
				pageid = page ? page.id : "";
				
				if (pageid === "nodata") {
					toIndex();
					
				} else {
					navigateBack();					
				}
			}
			
		} else {
			console.log(ev.keyName);
		}
	} );
} () );
