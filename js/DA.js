(()=> {

var DA = {};

DA.avaliablePaths  = [];
DA.degree = null;
DA.current = null;
DA.slideFunction = function() {};
DA.fadeFunction = function() {};
DA.animating = false;


DA.init = function() {
    $(window).load(function(){
		$('.work').delay(0).fadeIn(300);
	    setTimeout(function(){
            window.scrollTo(0, 1);
        }, 0);
    });

    $('.work ul li').hover(function() {
        $(this).find('img .pic').fadeIn(1000);
    }, function(){
        $(this).find('img .pic').fadeOut(1000);
    });
    
    DA.slideFunction = Modernizr.csstransitions ? DA.slideTo : DA.slideToJs;
    DA.fadeFunction = Modernizr.cssanimations && !$.browser.msie && !$.browser.opera ? DA.fadeTo : DA.fadeToJs;
    
    $(window).resize(DA.updateBG);
    
};


DA.handleAddress = function(event) {
    if (DA.animating) return false;
    console.log(event);
    // project-XXX .
    var address = event.pathNames.join('-');
    if (!DA.validAddress(address)) {
        $.address.value('/work');
        return;
    }
    // project or work .
    DA.updateNav(event.pathNames[0]);
    // project-XXX .
    DA.slideFunction(address, event.pathNames[1]);
    DA.toggleNavArrows(address, event.pathNames[1]);
    if (event.pathNames[0] === 'project'){
        DA.loadProject(event.pathNames[1]);
    }
    DA.updateBG();
    DA.fadeFunction(address);    
};


DA.updateNav = function(page) {
    page = page === 'project' ? 'work' : page;
    $('.nav li span').hide();
    $('a.' + page + '-btn').siblings('span').show();
};

DA.removeClass = function(elem, cls) {
    elem.removeClass('animate-left')
        .removeClass('animate-right')
        .removeClass('animate-center')
        .addClass(cls);
};


DA.slideTo = function(page) {
    $('#registration section').css('visibility', 'visible');
    DA.animating = true;
    $('.' + page).show();
    $('.bar-' + page).show();
    
    setTimeout(function(){
        DA.removeClass($('.' + page), 'animate-center');
        setTimeout(function(){
            DA.removeClass($('.bar-' + page), 'animate-center');
        }, 60);
    }, 10);   
    
    DA.removeClass($('.' + page).prevAll('#registration section'), 'animate-left');    
    DA.removeClass($('.' + page).nextAll('#registration section'), 'animate-right');
    
    DA.removeClass($('.bar-' + page).prevAll('.bar-text'), 'animate-left');    
    DA.removeClass($('.bar-' + page).nextAll('.bar-text'), 'animate-right');
    
    setTimeout(function(){
        $('.' + page).prevAll('#registration section').hide();
        $('.' + page).nextAll('#registration section').hide();
        
        setTimeout(function(){
            $('.bar-' + page).prevAll('.bar-text').hide();
            $('.bar-' + page).nextAll('.bar-text').hide();
        }, 60);
        DA.animating = false;
    }, 940);    
};


DA.slideToJs = function(page) {
    DA.animating = true;
    $('.' + page).css('visibility', 'visible').show().animate({'left':'0%'}, 1000 , 'easeInOutQuart');
    $('.' + page).prevAll('#registration section').animate({'left':'-100%'}, 1000, 'easeInOutQuart', function(){$(this).css('visibility', 'visible').hide();DA.animating = false;});
    $('.' + page).nextAll('#registration section').animate({'left':'100%'}, 1000, 'easeInOutQuart', function(){$(this).css('visibility', 'visible').hide();DA.animating = false;});
    
    $('.bar-' + page).delay(60).show().animate({'left':'0%'}, 1000, 'easeInOutQuart');
    $('.bar-' + page).delay(60).prevAll('.bar-text').animate({'left':'-120%'}, 1000, 'easeInOutQuart', function(){$(this).hide();DA.animating = false;});
    $('.bar-' + page).delay(60).nextAll('.bar-text').animate({'left':'120%'}, 1000, 'easeInOutQuart', function(){$(this).hide();DA.animating = false;});

};

DA.toggleNavArrows = function(page, project) {
    if (project) {
        $('.prev').show().animate({'margin-left':'65px'}, 800, 'easeInOutQuart');
        $('.next').show().animate({'margin-left':'-65px'}, 800, 'easeInOutQuart');
        $('.back-btn').show().animate({'margin-left':'0px'}, 800, 'easeInOutQuart');
    } else {        
        $('.prev').animate({'margin-left':'0px'}, 800, function() {$(this).hide();});
        $('.next').animate({'margin-left':'0px'}, 800, function() {$(this).hide();});
        $('.back-btn').animate({'margin-left':'-65px'}, 800, function() {$(this).hide();});
    }
};


DA.updateBG = function() {
    var max = -1;
    $('#registration section').each(function(){
        var h = $(this).height();
        if (h > max) max = h;
    });
    var winh = $(window).height() - 370;
    
    let page = DA.address.split("-");
    page = page[0];
    if (max < winh) {
        max = winh;
    }
    if(page !== 'project') {
        if (max < 400) {
            max = 400;
        }
    }
    $('.blur-bg').css('height', max + 30 + 'px');
    
};

DA.fadeToJs = function(page) {
    var $img = $('img.fade');
    var $new_img = $('<img>').attr("src", $('.' + page).attr("data-flipper")).addClass('fade').css('z-index', '1').hide();
    $img.after($new_img);
    $img.delay(200).fadeOut(400, function(){
        $new_img.css('z-index', '');
        $img.remove();
    });
    $new_img.fadeIn(600);
};

DA.fadeTo = function (page) {
    console.log(page);
    if (DA.degree === null) {
        $('img.fade').remove();
        DA.degree = 0;
        DA.current = $('.' + page).index();
        $('.flipper .front').css("background-image", "url(" + $('.' + page).attr("data-flipper") + ")").addClass('current');
    } else {        
        var direction = DA.current - $('.' + page).index() > 0 ? 180 : -180;
        DA.degree += direction;
        DA.current = $('.' + page).index();
        $('.flipper').css({transform:'rotateY(' + DA.degree + 'deg)'});
        var $back = $('.sides').not('.current');
        $('.current').removeClass('current');
        $back.css("background-image", "url(" + $('.' + page).attr("data-flipper") + ")").addClass('current');
    }
};

const backBtn = document.querySelector("#registration .back-btn");
const preBtn = document.querySelector("#registration .prev");
const nextBtn = document.querySelector("#registration .next");

const stepBtns = Array.from(document.querySelectorAll("#registration .work li"));
let noPreStep = false;
let noNextStep = false;


DA.address = "work";


const backBtnHandler = function(){
    if (DA.animating) return false;
    console.log("Back!");
    DA.address = "work";
    onAddressChange(DA.address);
}

const preBtnHandler = function(){
    if (DA.animating || noPreStep) return false;
    console.log("Pre!");
    DA.address = "project-" + $('.' + DA.address).prev().attr("data-project-name");
    onAddressChange(DA.address);
}

const nextBtnHandler = function(){
    if (DA.animating || noNextStep) return false;
    console.log("Next!");
    DA.address = "project-" + $('.' + DA.address).next().attr("data-project-name");
    console.log(DA.address);
    onAddressChange(DA.address)
}

const stepBtnHandler = function(){
    let projectName = $(this).children("a").children("img").attr("data-project-name");
    DA.address = "project-" + projectName;
    onAddressChange(DA.address);

}

const onAddressChange = function(address){
    
    let prev = $('.' + address).prev().attr("data-project-name");
    let next = $('.' + address).next().attr("data-project-name");

    noPreStep = prev ? false: true;
    noNextStep = next ? false: true;

    let pathNames = address.split("-");
    DA.updateNav(pathNames[0]);
    DA.slideFunction(address, pathNames[1]);
    DA.toggleNavArrows(address, pathNames[1]);
    DA.updateBG();
    DA.fadeFunction(address);    
}

backBtn.addEventListener("click", backBtnHandler);
preBtn.addEventListener("click", preBtnHandler);
nextBtn.addEventListener("click", nextBtnHandler);

stepBtns.forEach((elem)=>{
    elem.addEventListener("click", stepBtnHandler);
});

$(DA.init);

})();