(()=>{
	$(document).ready( () => {

		const upArrow = document.querySelector("#program .left-side-container .btn-up");
		const downArrow = document.querySelector("#program .left-side-container .btn-down");
		const textTimeLine = new TimelineMax();
		const dateTimeLine = new TimelineMax();
		const speakerTimeLine = new TimelineMax();

		const activityDay = 6;
		let currentDay = 1;
		let animationComplete = true;

		const diableArrowHandler = function(){
			animationComplete = false;
		}

		const enableArrowHandler = function(){
			animationComplete = true;
		}

		const upArrowHandler = function(e){
			currentDay --;
			if(currentDay > 0 && animationComplete) {
				console.log(currentDay);
				diableArrowHandler();

				// Update Content .
				const preDayScheduleText = document.querySelectorAll(`#program .day${currentDay+1}-content p`);
				const preDayDateText = document.querySelector(`#program .day${currentDay+1}-content .date`);
				const preDayTitleText = document.querySelector(`#program .day${currentDay+1}-content .day`);
				const currentDayScheduleText = document.querySelectorAll(`#program .day${currentDay}-content p`);
				const currentDayDateText = document.querySelector(`#program .day${currentDay}-content .date`);
				const currentDayTitleText = document.querySelector(`#program .day${currentDay}-content .day`);

	 
				textTimeLine.staggerFromTo([preDayTitleText,...preDayScheduleText], 0.5,{opacity:1,y:0},{ opacity:0,y:-30,ease:Power4.easeIn},0.03)
				   .staggerFromTo([currentDayTitleText,...currentDayScheduleText], 0.5, {opacity:0, y:30}, {opacity:1,y:0,ease: Power4.easeIn},0.03);

				dateTimeLine.fromTo(preDayDateText, 0.5,{opacity:1,x:0},{ opacity:0,x:-30,ease:Power4.easeIn})
				   .fromTo(currentDayDateText, 0.5, {opacity:0, x:30}, {opacity:1,x:0,ease: Power4.easeIn, onComplete:enableArrowHandler});
			
				// Update Speaker .
				const preSpeaker = document.querySelector(`#program .day${currentDay+1}-speaker`);
				const currentSpeaker = document.querySelector(`#program .day${currentDay}-speaker`);
				let fadeInDelay = 0 ;
				
				if(preSpeaker !== null)
					speakerTimeLine.fromTo(preSpeaker,0.5,{opacity:1},{opacity:0});
				else
					fadeInDelay = 0.5;
				if(currentSpeaker !== null)
					speakerTimeLine.fromTo(currentSpeaker,1.2,{opacity:0},{opacity:1,ease: Power4.easeIn,delay:fadeInDelay});
				
				// Update Button Text .
				const preBtnText =  (currentDay-1 < 1) ? "" : `Day ${currentDay-1}`;
				const nextBtnText =  (currentDay+1 > activityDay) ? "" : `Day ${currentDay+1}`;

				$("#program .btn-up .text").fadeOut(800, function() {
        			$(this).text(preBtnText).fadeIn(800);
        		});

        		$("#program .btn-down .text").fadeOut(800, function() {
        			$(this).text(nextBtnText).fadeIn(800);
        		});
				
			} else {
				currentDay ++ ;
			}
		}

		const downArrowHandler = function(e){
			currentDay ++;
			if(currentDay <= activityDay && animationComplete){
				console.log(currentDay);
				diableArrowHandler();

				// Update Content .
				const preDayScheduleText = document.querySelectorAll(`#program .day${currentDay-1}-content p`);
				const preDayDateText = document.querySelector(`#program .day${currentDay-1}-content .date`);
				const preDayTitleText = document.querySelector(`#program .day${currentDay-1}-content .day`);
				const currentDayScheduleText = document.querySelectorAll(`#program .day${currentDay}-content p`);
				const currentDayDateText = document.querySelector(`#program .day${currentDay}-content .date`);
				const currentDayTitleText = document.querySelector(`#program .day${currentDay}-content .day`);

				textTimeLine.staggerFromTo([preDayTitleText,...preDayScheduleText], 0.5,{opacity:1,y:0},{ opacity:0,y:-30,ease:Power4.easeIn},0.03)
				  .staggerFromTo([currentDayTitleText,...currentDayScheduleText], 0.5, {opacity:0, y:30}, {opacity:1,y:0,ease: Power4.easeIn},0.03);

				dateTimeLine.fromTo(preDayDateText, 0.5,{opacity:1,x:0},{ opacity:0,x:-30,ease:Power4.easeIn})
				   .fromTo(currentDayDateText, 0.5, {opacity:0, x:30}, {opacity:1,x:0,ease: Power4.easeIn, onComplete:enableArrowHandler});
				

				// Update Speaker .
				const preSpeaker = document.querySelector(`#program .day${currentDay-1}-speaker`);
				const currentSpeaker = document.querySelector(`#program .day${currentDay}-speaker`);
				let fadeInDelay = 0;
				
				if(preSpeaker !== null)
					speakerTimeLine.fromTo(preSpeaker,0.5,{opacity:1},{opacity:0});
				else
					fadeInDelay = 0.5;
				
				if(currentSpeaker !== null)
					speakerTimeLine.fromTo(currentSpeaker,1.2,{opacity:0},{opacity:1,ease: Power4.easeIn,delay:fadeInDelay});

				// Update Button Text .
				const preBtnText =  (currentDay-1 < 1) ? "" : `Day ${currentDay-1}`;
				const nextBtnText =  (currentDay+1 > activityDay) ? "" : `Day ${currentDay+1}`;

				$("#program .btn-up .text").fadeOut(800, function() {
        			$(this).text(preBtnText).fadeIn(800);
        		});

        		$("#program .btn-down .text").fadeOut(800, function() {
        			$(this).text(nextBtnText).fadeIn(800);
        		});
				
			} else {
				currentDay --;
			}	
		}

		upArrow.addEventListener("click",upArrowHandler);
		downArrow.addEventListener("click",downArrowHandler);

	});
})();
