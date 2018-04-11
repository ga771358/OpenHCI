(()=>{

	const cartDes = [ { height: "60vh",y: "-25%", x:"-5%"} , { height: "60vh",y: "-25%", x:"-126%"} , { height: "60vh",y: "-25%", x:"-252%"} ,{height:"60vh",y: "-25%",x:"-378%"}, { height: "60vh",y: "-25%", x:"-504%"} ];


	const cart = document.querySelectorAll("#registration .cart");
	const buttonContainer = document.querySelector("#registration .btn-container");
	const homeBtn = buttonContainer.querySelector(".reg-btn");
	const sectionOriginHeight = $(`#registration`).height();
	// 錄取名單 Step !
	const finalStep = document.querySelector("#registration .cart5");
	

	
	let currentCartIndex = 0;
	let unChoosedCarts = [];
	let isHomePage = true;
	let currentCart = null;

	const toggleCartAnimation = function(){
		$(`#registration .cart`).toggleClass("hvr-wobble-vertical");
	}
	const resetSectionHeight = function(){
		$(`#registration`).css({height: `${sectionOriginHeight}px`});
	}

	const updateSectionHeight = function(){
		let stepTextAreaHeight = $(`#registration .right-side-container .right-btm .step0${currentCartIndex} .content`).height();
		let heightOffset = $(`#registration .right-side-container .right-btm`).offset().top - $(`#registration`).offset().top;

		$(`#registration`).css({height: `${stepTextAreaHeight + heightOffset}px`});
	}

	const noneTheStep = function(){
		$(`#registration .step0${currentCartIndex}`).css({display: "none"});
	}

	const homeClickHandler = function(){
		if(!isHomePage){
			toggleCartAnimation();

			isHomePage = !isHomePage;
			$(currentCart).removeClass("selected");

			$(`#registration .step0${currentCartIndex}`).toggleClass("animate-right");
			
			TweenMax.to(currentCart,0.8,{height: "40vh",y: "0%", x:"0%"});
			TweenMax.to(unChoosedCarts,0.8,{opacity:1,onComplete:resetSectionHeight});
			// TweenMax.to(finalStep,0.8,{opacity:0.3}); 	// Special !
			TweenMax.to(buttonContainer,0.5,{opacity:0,onComplete:noneTheStep});
			
			$(currentCart.querySelector(".hover-sign")).css({opacity:0});
			
		}
	}

	const toggleStepClass = function(){
		$(`#registration .step0${currentCartIndex}`).css({display: "block"});
		updateSectionHeight();

		setTimeout(()=>{
			$(`#registration .step0${currentCartIndex}`).toggleClass("animate-right");
			// $(`#registration .step0${currentCartIndex}`).addClass("animate-center");
		},10);
		
	}

	const setUnChoosedCarts = function(){
		unChoosedCarts = [];

		cart.forEach((elem)=>{
			if(elem.dataset.index !== currentCartIndex)
				unChoosedCarts.push(elem);
		});
	}

	const cartHoverHandler = function(){
		if(isHomePage){
			$(this.querySelector(".hover-sign")).css({opacity:1});
		}
	}

	const cartEndHoverHandler = function(){
		if(isHomePage){
			$(this.querySelector(".hover-sign")).css({opacity:0});
		}
	}

	const cartClickHandler = function(){

		if(isHomePage){

			toggleCartAnimation();

			currentCart = this;
			$(this).addClass("selected");

			isHomePage = !isHomePage;
			
			currentCartIndex = this.dataset.index;
			setUnChoosedCarts();
			
			let timeLine = new TimelineMax({onComplete:toggleStepClass});

			timeLine
				.to(unChoosedCarts,0.5,{opacity:0},0)
				// .to(finalStep,0.5,{opacity:0},0)	// Special .
				.to(buttonContainer,0.5,{opacity:1},0)
				.to(currentCart,0.5,cartDes[currentCartIndex-1]);
		}
	}

	cart.forEach((elem)=>{
		// disable ,  變成錄取名單, 之後才enable !
		// if(elem.dataset.index !== "5"){
			elem.addEventListener("click",cartClickHandler);
		if(elem.dataset.index !== "5"){
			elem.addEventListener("mouseenter",cartHoverHandler);
			elem.addEventListener("mouseleave",cartEndHoverHandler);
		}
	});

	homeBtn.addEventListener("click",homeClickHandler);

	toggleCartAnimation();

})();