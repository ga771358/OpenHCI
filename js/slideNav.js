(()=> {
	$(document).ready(()=> {
		// const slideAmount = 4 ;
		const scences = [];

		// init controller
		const controller = new ScrollMagic.Controller();
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#home`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#home`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-home`,`active`)
				// .addIndicators({name: `home`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#openhci2017`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#openhci2017`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-openhci2017`,`active`)
				// .addIndicators({name: `openhci2017`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#intro_goals`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#intro_goals`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-intro_goals`,`active`)
				// .addIndicators({name: `intro_goals`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#program`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#program`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-program`,`active`)
				// .addIndicators({name: `program`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#registration`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#registration`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-registration`,`active`)
				// .addIndicators({name: `registration`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#taichi`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#taichi`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-taichi`,`active`)
				// .addIndicators({name: `registration`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#crew`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#crew`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-crew`,`active`)
				// .addIndicators({name: `crew`})
				.addTo(controller)
			);
		scences.push(new ScrollMagic.Scene({
				triggerElement: `#contact`,
				duration: function(){
					// End when scroll after that slide 
					return document.querySelector(`#contact`).offsetHeight;
				}
			})
				.setClassToggle(`nav .nav-contact`,`active`)
				// .addIndicators({name: `contact`})
				.addTo(controller)
			);

		// Color Change due to bg color .
		const redBGSection = ["#intro_goals", "#program", "#registration", "#taichi"];

		redBGSection.forEach((elem)=>{
			scences.push(new ScrollMagic.Scene({
				triggerElement: `${elem}`, // trigger CSS animation when header is in the middle of the viewport
	        	duration: function(){
					/* End when scroll after that slide */
					return document.querySelector(`${elem}`).offsetHeight -5 ;
				}
	    	})
	    	.setClassToggle('nav.side-nav li', 'active-blue') // set class to active slide
	    	.addTo(controller)
			);
		});


		let navClickHandler = function(e){
			if (this.hash !== "" && this.hash !== "#noscroll") {
				e.preventDefault();
				let hash = this.hash;
				
				$("html body").animate({
					scrollTop: document.querySelector(hash).offsetTop
				}, 100, function(){
					// window.location.hash = hash;
				});
			}
		}

		const navElems = [...document.querySelectorAll("nav.side-nav a")];
					
		navElems.forEach((a) => {
			a.addEventListener("click", navClickHandler);
		});
	});
})();	