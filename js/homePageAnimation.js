(()=>{
	let svgDoc = null;
	let redPoly = null;
	let whitePoly = null;
	let white = null;

	let hand1 = null;
	let hane2 = null;

	// let cube1 = null;
	// let cube2 = null;
	// let cube3 = null;
	// let cube4 = null;

	let leader1 = null;

	const vivusComplete = function(){
		
		TweenMax.to(redPoly,1,{opacity: 1});
		TweenMax.to(whitePoly,1,{opacity: 1});
		TweenMax.to(white,1,{opacity: 1});
		TweenMax.to(hand1,1,{opacity: 1});
		TweenMax.to(hand2,1,{opacity: 1});
		TweenMax.to($(svgDoc.querySelector("#poly1")),1,{opacity:1});
		TweenMax.to(leader1,1,{opacity:1});

		/*
		let tl1 = new TimelineMax();
		tl1.repeat(-1);
		tl1.to(cube1,1,{x:-40,y:-50})
			.to(cube1,1,{x:0,y:0});

		let tl2 = new TimelineMax({delay:1.5});
		tl2.repeat(-1);
		tl2.to(cube2,1,{y:-50})
			.to(cube2,1,{y:0});

		let tl3 = new TimelineMax({delay:2.5});
		tl3.repeat(-1);
		tl3.to(cube3,1,{x:60,y:-50})
			.to(cube3,1,{x:0,y:0});

		let tl4 = new TimelineMax({delay:3.5});
		tl4.repeat(-1);
		tl4.to(cube4,1,{x:80,y:-10})
			.to(cube4,1,{x:0,y:0});
		*/

	}

	const vivusStart = function(){
		svgDoc = document.getElementById("home-bg").getSVGDocument();
		redPoly = svgDoc.querySelectorAll(".st2");
		whitePoly = svgDoc.querySelectorAll(".st16");
		white = svgDoc.querySelectorAll(".st3");

		hand1 = svgDoc.querySelector("#hand1");
		hand2 = svgDoc.querySelector("#hand2");

		leader1 = svgDoc.querySelector("#open-leader");

		// cube1 = svgDoc.querySelector("#cube1");
		// cube2 = svgDoc.querySelector("#cube2");
		// cube3 = svgDoc.querySelector("#cube3");
		// cube4 = svgDoc.querySelector("#cube4")
		
		$(redPoly).css({opacity: 0});
		$(whitePoly).css({opacity: 0});
		$(white).css({opacity: 0});
		$(hand1).css({opacity: 0});
		$(hand2).css({opacity: 0});
		$(svgDoc.querySelector("#poly1")).css({opacity: 0});
		$(leader1).css({opacity: 0});
		
	}


	new Vivus('home-bg', {duration: 100,start:"autostart", onReady:vivusStart}, vivusComplete);


})();

