
var sliderWidth = ($(window).width()) *0.84;
var sliderHeight =($(window).height()) *0.9;
$(document).ready(function(){
    $(window).resize(function() {
        sliderWidth = ($(window).width());
        sliderWidth = sliderWidth * 0.84;
       	sliderHeight = $(window).height();
        sliderHeight = sliderHeight;

       	
       	if (sliderWidth <= 979){
       		sliderHeight = 980;
       	}
       	else sliderHeight = $(window).height()*0.9;
        if($(window).width()<769){
    			sliderWidth = $(window).width();
    			sliderHeight = 1580;
		    }
        if($(window).width()<480){
          sliderWidth = $(window).width();
          sliderHeight = 1180;
        }

        $(" #crew .slider").diyslider({
		    width: sliderWidth+'px', // width of the slider
		    height: sliderHeight+'px', // height of the slider
		    display: 1, // number of slides you want it to display at once
		    loop: false // disable looping on slides
		}); 

		$("#crew .back-btn").bind("click", function(){
		    // Go to the previous slide
		    $(".slider").diyslider("move", "back");
		});
		$("#crew .next-btn").bind("click", function(){
		    // Go to the previous slide
		    $(".slider").diyslider("move", "forth");
		});


    });
});

if($(window).width()<768){
	sliderWidth = $(window).width();
	sliderHeight = 1240;
}
$(" #crew .slider").diyslider({
    width: sliderWidth + 'px', // width of the slider
    height: sliderHeight  + 'px', // height of the slider
    display: 1, // number of slides you want it to display at once
    loop: false // disable looping on slides
}); 

// use buttons to change slide
$("#crew .back-btn").bind("click", function(){
    // Go to the previous slide
    $(".slider").diyslider("move", "back");
});
$("#crew .next-btn").bind("click", function(){
    // Go to the previous slide
    $(".slider").diyslider("move", "forth");
});