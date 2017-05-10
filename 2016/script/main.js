$(document).ready(function(){
    $('.carousel').carousel({
      interval: 3000
    })

    $('.nav li a').click(function () {
      $('.nav li').removeClass('active');
      $(this).parent().addClass('active');
    })
});

$(function(){
  // 預設顯示第一個 Tab
  var _showTab = 5;
  var $defaultLi = $('ul.days li').eq(_showTab).addClass('active');
  $($defaultLi.find('a').attr('href')).siblings().hide();
 
  // 當 li 頁籤被點擊時...
  // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
  $('ul.days li').click(function() {
    // 找出 li 中的超連結 href(#id)
    var $this = $(this),
      _clickTab = $this.find('a').attr('href');
    // 把目前點擊到的 li 頁籤加上 .active
    // 並把兄弟元素中有 .active 的都移除 class
    $this.addClass('active').siblings('.active').removeClass('active');
    // 淡入相對應的內容並隱藏兄弟元素
    $(_clickTab).stop(false, true).fadeIn().siblings().hide();
 
    return false;
  }).find('a').focus(function(){
    this.blur();
  });
});

$(function(){
  var audio = document.getElementById('background_audio');

  document.getElementById('mute').addEventListener('click', function (e)
  {
      e = e || window.event;
      audio.muted = !audio.muted;
      e.preventDefault();
  }, false);
});

$(document).ready(function(){
  // scroll to element
    $('nav a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing');
    });
});

$(function(){
  $.stellar();
});