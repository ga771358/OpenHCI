(()=>{
	$(document).ready( () => {

		const backBtn = document.querySelector("#program .right-side-bar .back-btn");
		const nextBtn = document.querySelector("#program .right-side-bar .next-btn");

		const textTimeLine = new TimelineMax();
		const dateTimeLine = new TimelineMax();
		const titleTimeLine = new TimelineMax();

		const dayCount = 6;

		$(window).resize(()=>{

			
			if($(window).width() > 760){	// prevent mobile resize .
				// console.log($(window).width());
				initialize();
				currentPage = 0 ;
				updateSectionHeight();
			}
		});


		let pages = 2;
		let blockNum = 3;
		let currentPage = 0;
		let groups = [];
		let animationComplete = true;

		const updateSectionHeight = function(){
			let maxHeight = $(groups[currentPage][0]).height();

			for(let i = 1 ; i < blockNum ; i ++){
				maxHeight = $(groups[currentPage][i]).height() > maxHeight? $(groups[currentPage][i]).height():maxHeight;
			}

			let heightOffset = $(`#program .middle-container`).offset().top - $(`#program`).offset().top;
			$(`#program`).css({height: `${maxHeight + heightOffset}px`});
		}

		const updateBtn = function(){
			if(currentPage === 0){
				TweenMax.to("#program .back-btn",1,{opacity:0});
			}
			else if(currentPage === 1){
				TweenMax.to("#program .back-btn",1,{opacity:1});
			}
			
			if(currentPage === pages-2){
				TweenMax.to("#program .next-btn",1,{opacity:1});
			}
			else if(currentPage === pages-1){
				TweenMax.to("#program .next-btn",1,{opacity:0});
			}
		}

		const updateActiveClass = function(){

			for(let i = 1 ; i <= dayCount ; i ++ ){
				$(`#program .day${i}`).removeClass("active");
				$(`#program .day${i}`).removeClass("pre-active");
			}

			groups[0].forEach((elem)=>{
				elem.addClass("active");
			});
		}
		
		const updateBlockDOM = function(){
			$(`#program .day-block1`).empty();
			$(`#program .day-block2`).empty();
			$(`#program .day-block3`).empty();

			for(let i = 0 ; i < pages ; i ++){
				for(let j = 0 ; j < blockNum ; j ++){
					$(`#program .day-block${j+1}`).append(groups[i][j]);
				}
			}

		}
		
		const updatePageElem = function(){
			// init groups .
			groups = [];
			

			for(let i = 0 ; i < pages ; i ++){
				let group = [];
				for(let j = 0 ; j < blockNum ; j ++){
					group.push($(`#program .day${i*blockNum + j + 1}`));
				}
				groups.push(group);
			}

			
		}

		const updateBlockAndPageNum = function(){
			let windowWidth = $(window).width();

			if(windowWidth > 1024){
				pages = 2;
				blockNum = 3;

				$(`#program .day-block1`).css({"display": "initial"});
				$(`#program .day-block2`).css({"display": "initial"});
				$(`#program .day-block3`).css({"display": "initial"});

			} else if( 768 < windowWidth && windowWidth <= 1024) {
				pages = 3;
				blockNum = 2;

				$(`#program .day-block1`).css({"display": "initial"});
				$(`#program .day-block2`).css({"display": "initial"});
				$(`#program .day-block3`).css({"display": "none"});
			} else {
				pages = 6;
				blockNum = 1;

				$(`#program .day-block1`).css({"display": "initial"});
				$(`#program .day-block2`).css({"display": "none"});
				$(`#program .day-block3`).css({"display": "none"});
			}

			// init style in .html side (priority higher than .css side).
			for(let i = 1 ; i <= 6 ; i ++ ) {
				$(`.day${i}`).children().css({"opacity": "", "transform": ""});
			}
			
		}

		const initialize = function(){
			updateBlockAndPageNum();
			updatePageElem();
			updateBlockDOM();
			updateActiveClass();
			updateBtn();
		}

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
			currentPage --;

			if(currentPage > -1 && animationComplete) {
				updateBtn();
				updateSectionHeight();
				diableBtnHandler();

				// Update Content .
			
				for(let i = 1 ; i <= 6 ; i ++){
					$(`.day${i}`).removeClass( "active pre-active" );
				}

				for(let i = 0 ; i < blockNum ; i ++){
					groups[currentPage][i].addClass("active");
					groups[currentPage+1][i].addClass("pre-active");
				}
				
				let currentDateImgs = [];
				let currentTitles = [];
				let currentIcons = [];
				let currentScheduleTexts = [];

				// i : current block #
				for(let i = 0 ; i < blockNum ; i ++){
					// page : current Group 
					currentDateImgs.push(document.querySelector(`#program .day-block${i+1} .active .date`));
					currentTitles.push(document.querySelector(`#program .day-block${i+1} .active .title`));
					currentIcons.push(document.querySelector(`#program .day-block${i+1} .active .icon`));
					currentScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .active p`));
				}

				let preDateImgs = [];
				let preTitles = [];
				let preIcons = [];
				let preScheduleTexts = [];

				for(let i = 0 ; i < blockNum ; i ++){
					preDateImgs.push(document.querySelector(`#program .day-block${i+1} .pre-active .date`));
					preTitles.push(document.querySelector(`#program .day-block${i+1} .pre-active .title`));
					preIcons.push(document.querySelector(`#program .day-block${i+1} .pre-active .icon`));
					preScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .pre-active p`));
				}

				for(let i = 0 ; i < blockNum ; i ++){

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
			
			
			currentPage ++;
			
			if(currentPage < pages && animationComplete){
				updateBtn();
				updateSectionHeight();
				diableBtnHandler();
			
				for(let i = 1 ; i <= 6 ; i ++){
					$(`.day${i}`).removeClass( "active pre-active" );
				}

				for(let i = 0 ; i < blockNum ; i ++){
					groups[currentPage][i].addClass("active");
					groups[currentPage-1][i].addClass("pre-active");
				}

				// Update Content .
				

				let currentDateImgs = [];
				let currentTitles = [];
				let currentIcons = [];
				let currentScheduleTexts = [];

				for(let i = 0 ; i < blockNum ; i ++){
					currentDateImgs.push(document.querySelector(`#program .day-block${i+1} .active .date`));
					currentTitles.push(document.querySelector(`#program .day-block${i+1} .active .title`));
					currentIcons.push(document.querySelector(`#program .day-block${i+1} .active .icon`));
					currentScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .active p`));
				}

				let preDateImgs = [];
				let preTitles = [];
				let preIcons = [];
				let preScheduleTexts = [];

				for(let i = 0 ; i < blockNum ; i ++){
					preDateImgs.push(document.querySelector(`#program .day-block${i+1} .pre-active .date`));
					preTitles.push(document.querySelector(`#program .day-block${i+1} .pre-active .title`));
					preIcons.push(document.querySelector(`#program .day-block${i+1} .pre-active .icon`));
					preScheduleTexts.push(document.querySelectorAll(`#program .day-block${i+1} .pre-active p`));
				}

				for(let i = 0 ; i < blockNum ; i ++){

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

		initialize();



	});
})();
