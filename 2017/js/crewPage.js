
var sliderWidth = ($(window).width()) *0.73;
//var sliderHeight =($(window).height()) *0.9;

const crewDivChanger = function(){
        sliderWidth = ($(window).width());
        sliderWidth = sliderWidth * 0.73;
        sliderHeight = $(window).height();
        sliderHeight = sliderHeight;

        
        if (sliderWidth <= 979){
          sliderHeight = 580;
        }
        else sliderHeight = $(window).height()*0.9;

        if($(window).width()<769){
          sliderHeight = 880;
        }
        if($(window).width()<480){
          sliderWidth = $(window).width();
          sliderHeight = 900;
        }
        if($(window).width()<321){
          sliderWidth = $(window).width();
          sliderHeight = 980;
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
}

$(document).ready(function(){
    $(window).resize(function() {
        crewDivChanger();
    });
});

crewDivChanger();