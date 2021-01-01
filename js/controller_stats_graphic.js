//////////////////////////////////////////////////////////////
// Logic for view "stats_graphic.html"
//////////////////////////////////////////////////////////////


function initGraph() {
	var page = document.getElementById("stats"),
		graphEl = document.getElementById("graph"),
		titleMarquee = page.querySelector("header"),
		graphWidget,
		marquee;

	page.addEventListener("pagebeforeshow", function () {
		graphWidget = tau.widget.Graph(graphEl);
	});
	
	page.addEventListener("pageshow", function () {
		marquee = tau.widget.Marquee(titleMarquee, {
			iteration: "infinite",
			marqueeStyle: "scroll",
			ellipsisEffect: "none",
			speed: 40,
			delay: 1000
		});
	});

	page.addEventListener("pagebeforehide", function () {
		graphWidget.destroy();
		marquee.destroy();
	});
	}