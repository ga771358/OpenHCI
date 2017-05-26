(()=>{

	const cartDes = [ { height: "60vh",y: "-25%", x:"-5%"} , { height: "60vh",y: "-25%", x:"-126%"} , { height: "60vh",y: "-25%", x:"-252%"} ,{height:"60vh",y: "-25%",x:"-378%"}, { height: "60vh",y: "-25%", x:"-504%"} ];


	const cart = document.querySelectorAll("#registration .cart");
	const buttonContainer = document.querySelector("#registration .btn-container");
	const homeBtn = buttonContainer.querySelector(".reg-btn");
	
	let currentCartIndex = 0;
	let unChoosedCarts = [];
	let isHomePage = true;
	let currentCart = null;

	const noneTheStep = function(){
		console.log("hide" + currentCartIndex);
		$(`#registration .step0${currentCartIndex}`).hide();
	}

	const homeClickHandler = function(){
		console.log("Yo");
		if(!isHomePage){
			isHomePage = !isHomePage;
			$(`#registration .step0${currentCartIndex}`).removeClass("animate-center");
			
			TweenMax.to(currentCart,0.8,{height: "40vh",y: "0%", x:"0%"});
			TweenMax.to(unChoosedCarts,0.8,{opacity:1});
			TweenMax.to(buttonContainer,0.5,{opacity:0,onComplete:noneTheStep});
			
			$(currentCart.querySelector(".hover-sign")).css({opacity:0});
			
		}
	}

	const toggleStepClass = function(){
		$(`#registration .step0${currentCartIndex}`).show();

		setTimeout(()=>{
			$(`#registration .step0${currentCartIndex}`).addClass("animate-center");
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

			currentCart = this;

			isHomePage = !isHomePage;
			
			console.log(this.dataset.index);
			currentCartIndex = this.dataset.index;
			setUnChoosedCarts();
			console.log(unChoosedCarts);

			let timeLine = new TimelineMax({onComplete:toggleStepClass});

			console.log(cartDes[currentCartIndex-1]);

			timeLine
				.to(unChoosedCarts,0.8,{opacity:0},0)
				.to(buttonContainer,0.8,{opacity:1},0)
				.to(currentCart,0.8,cartDes[currentCartIndex-1]);
		}


	}

	cart.forEach((elem)=>{
		// disable 錄取名單, 之後才enable !
		if(elem.dataset.index !== "5"){
			elem.addEventListener("click",cartClickHandler);
			elem.addEventListener("mouseenter",cartHoverHandler);
			elem.addEventListener("mouseleave",cartEndHoverHandler);
		}
	});

	homeBtn.addEventListener("click",homeClickHandler);

	
	
})();