(()=>{
	$(document).ready( () => {

		const backBtn = document.querySelector("#program .left-side-bar .back-btn");
		const nextBtn = document.querySelector("#program .left-side-bar .next-btn");

		const textTimeLine = new TimelineMax();
		const dateTimeLine = new TimelineMax();
		const titleTimeLine = new TimelineMax();

		const pages = 2;
		let currentPage = 1;
		let animationComplete = true;

		const diableBtnHandler = function(){
			animationComplete = false;
		}

		const enableBtnHandler = function(){
			animationComplete = true;
		}

		const updateContainerHeight = function(){
			let windowHeight = $(window).height();
			let containerHeight = ($(`#program .day${currentDay}-content`).offset().top - $(`#program`).offset().top) + $(`#program .day${currentDay}-content`).height();
			
			windowHeight < containerHeight && $(`#program`).css("min-height", `${containerHeight}px`);
		}

		const backBtnHandler = function(e){
			console.log("Back");
			
			currentPage --;
			
			if(currentPage > 0 && animationComplete) {
				console.log(currentPage);

				
				// updateContainerHeight();
				diableBtnHandler();

				// Update Content .
				
				let currentDateImgs = [];
				let currentTitles = [];
				let currentIcons = [];
				let currentScheduleTexts = [];

				for(let i = 0 ; i < 3 ; i ++){
					currentDateImgs.push(document.querySelector(`#program .day-block${i+1} .page${currentPage} .date`));
					currentTitles.push(document.querySelector(`#program .day-block${i+1} .page${currentPage} .title`));
					currentIcons.push(document.querySelector(`#program .day-block${i+1} .page${currentPage} .icon`));
					currentScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .page${currentPage} p`));
				}

				let preDateImgs = [];
				let preTitles = [];
				let preIcons = [];
				let preScheduleTexts = [];

				for(let i = 0 ; i < 3 ; i ++){
					preDateImgs.push(document.querySelector(`#program .day-block${i+1} .page${currentPage+1} .date`));
					preTitles.push(document.querySelector(`#program .day-block${i+1} .page${currentPage+1} .title`));
					preIcons.push(document.querySelector(`#program .day-block${i+1} .page${currentPage+1} .icon`));
					preScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .page${currentPage+1} p`));
				}

				for(let i = 0 ; i < 3 ; i ++){

					let dateImgsTimeLine = new TimelineMax();
					let titlesTimeLine = new TimelineMax();
					let iconsTimeLine = new TimelineMax();
					let scheduleTextsTimeLine = new TimelineMax();

					dateImgsTimeLine
						.fromTo(preDateImgs[i],0.5,{opacity:1},{opacity:0})
						.fromTo(currentDateImgs[i],0.5,{opacity:0},{opacity:1});
					titlesTimeLine
						.fromTo(preTitles[i], 0.5,{opacity:1,x:0},{ opacity:0,x:-30,ease:Power4.easeIn})
				   		.fromTo(currentTitles[i], 0.5, {opacity:0, x:30}, {opacity:1,x:0,ease: Power4.easeIn});
					iconsTimeLine
						.fromTo(preIcons[i], 0.5,{opacity:1,x:0},{ opacity:0,x:-30,ease:Power4.easeIn})
				   		.fromTo(currentIcons[i], 0.5, {opacity:0, x:30}, {opacity:1,x:0,ease: Power4.easeIn, onComplete:enableBtnHandler});
					scheduleTextsTimeLine
						.staggerFromTo(preScheduleTexts[i], 0.5,{opacity:1,y:0},{ opacity:0,y:-30,ease:Power4.easeIn},0.03)
				   		.staggerFromTo(currentScheduleTexts[i], 0.5, {opacity:0, y:30}, {opacity:1,y:0,ease: Power4.easeIn},0.03);
				}
				
			} else {
				currentPage ++ ;
			}
			
		}

		const nextBtnHandler = function(e){
			console.log("next");
			
			currentPage ++;
			
			if(currentPage <= pages && animationComplete){
				console.log(currentPage);

				
				// updateContainerHeight();
				diableBtnHandler();

				// Update Content .
				

				let currentDateImgs = [];
				let currentTitles = [];
				let currentIcons = [];
				let currentScheduleTexts = [];

				for(let i = 0 ; i < 3 ; i ++){
					currentDateImgs.push(document.querySelector(`#program .day-block${i+1} .page${currentPage} .date`));
					currentTitles.push(document.querySelector(`#program .day-block${i+1} .page${currentPage} .title`));
					currentIcons.push(document.querySelector(`#program .day-block${i+1} .page${currentPage} .icon`));
					currentScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .page${currentPage} p`));
				}

				let preDateImgs = [];
				let preTitles = [];
				let preIcons = [];
				let preScheduleTexts = [];

				for(let i = 0 ; i < 3 ; i ++){
					preDateImgs.push(document.querySelector(`#program .day-block${i+1} .page${currentPage-1} .date`));
					preTitles.push(document.querySelector(`#program .day-block${i+1} .page${currentPage-1} .title`));
					preIcons.push(document.querySelector(`#program .day-block${i+1} .page${currentPage-1} .icon`));
					preScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .page${currentPage-1} p`));
				}

				for(let i = 0 ; i < 3 ; i ++){

					let dateImgsTimeLine = new TimelineMax();
					let titlesTimeLine = new TimelineMax();
					let iconsTimeLine = new TimelineMax();
					let scheduleTextsTimeLine = new TimelineMax();

					dateImgsTimeLine
						.fromTo(preDateImgs[i],0.5,{opacity:1},{opacity:0})
						.fromTo(currentDateImgs[i],0.5,{opacity:0},{opacity:1});
					titlesTimeLine
						.fromTo(preTitles[i], 0.5,{opacity:1,x:0},{ opacity:0,x:-30,ease:Power4.easeIn})
				   		.fromTo(currentTitles[i], 0.5, {opacity:0, x:30}, {opacity:1,x:0,ease: Power4.easeIn});
					iconsTimeLine
						.fromTo(preIcons[i], 0.5,{opacity:1,x:0},{ opacity:0,x:-30,ease:Power4.easeIn})
				   		.fromTo(currentIcons[i], 0.5, {opacity:0, x:30}, {opacity:1,x:0,ease: Power4.easeIn, onComplete:enableBtnHandler});
					scheduleTextsTimeLine
						.staggerFromTo(preScheduleTexts[i], 0.5,{opacity:1,y:0},{ opacity:0,y:-30,ease:Power4.easeIn},0.03)
				   		.staggerFromTo(currentScheduleTexts[i], 0.5, {opacity:0, y:30}, {opacity:1,y:0,ease: Power4.easeIn},0.03);
				}
				
				
			} else {
				currentPage --;
			}	
			
		}

		backBtn.addEventListener("click",backBtnHandler);
		nextBtn.addEventListener("click",nextBtnHandler);

	});
})();
