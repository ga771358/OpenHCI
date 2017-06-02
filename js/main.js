$(document).ready(function(){
  // scroll to element
    $(' nav a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);
      if(target!== "#noscroll"){
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing');
      }
      
    });
});


$(function(){
  var audio = document.getElementById('background-audio');

  document.getElementById('mute').addEventListener('click', function (e)
  {
      e = e || window.event;
      audio.muted = !audio.muted;
      e.preventDefault();

      $('#mute img').attr('src', function (index, currentSource) {
        return currentSource == 'image/audioOn.png' ? 'image/audioOff.png' : 'image/audioOn.png';
      });

  }, false);
});