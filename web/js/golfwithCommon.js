// 아래소스에서 변경 - 20211214
// https://s3.amazonaws.com/fscore.image.live/golfwith/js/common.js?version=1700307_01

$(document).ready(function(){
  scrollTop();
});
//팝업닫기 160808 추가
$('.layer_wrap').find('.btn_pop_close').click(function(){
  $(this).parents('.layer_wrap').hide();
})

//로그인팝업 스크립트 160808 추가
$('#menu').find('.login_btn').click(function(){
  $('.dim').hide();
  $('#menu').removeClass('on');
  $('#login_pop').show();
  return false;
});
$('#login_pop').find('.signup_btn').click(function(){
  $('#login_pop').hide();
  $('#signup_pop').show();
  return false;
});
$('#login_pop').find('.forgot_btn').click(function(){
  $('#login_pop').hide();
  $('#forgot_pop').show();
  return false;
});

//삭제확인팝업 스크립트 160808 추가
$('.account_btns').find('.deleted_btn').click(function(){
  $('#deleted_pop').show();
  return false;
});

/*특정높이에서 스트롤 이벤트 발생*/
$.fn.scrollActive = function (aboveHeight){
  var $obj = $(this);
  var locate;
  $(window).scroll(function(){
  locate = $(window).scrollTop();
  if (locate > aboveHeight){
    $obj.addClass('scrollActive');
  } else {
    $obj.removeClass('scrollActive');
  }
  });
}
function scrollTop(){
  var $body = $('html, body'),
  $top = '';
  $('.top_nav').click(function(){
  $body.scrollTop(0);
  return false;
  });
}
/*플레이스홀더 스타일*/
$('input[placeholder]').each(function(){
  placeholder($(this))
});
$('input[placeholder]').on('propertychange input',function(){
  placeholder($(this));
});
function placeholder($this){
  if($this.val().length > 0){
  $this.removeClass('placeholder')
  }else{
  $this.addClass('placeholder')
  }
}
function fncEnCode(param){
  var encode = '';
  for(i=0; i<param.length; i++){
    var len  = ''+param.charCodeAt(i);
    var token = '' + len.length;
    encode  += token + param.charCodeAt(i);
  }
  return encode;
}
/* on off 버튼*/
$.fn.btnOnOff = function (){
  var $obj = $(this),id;
  $obj.click(function(){
  id = $(this).attr('href');
  if($(this).hasClass('on')){
    $(this).add(id).removeClass('on');
  }else{
    $(this).add(id).addClass('on');
  }
  return false;
  })

}
/*open 버튼*/
$.fn.btnOpen = function (){
  var $obj = $(this),id;
  $obj.click(function(){
  id = $(this).attr('href');
  if($(id).hasClass('on') == false){
    $(this).add(id).addClass('on');
    $('.dim').show();
  }
  return false;
  })

}
/*close 버튼*/
$.fn.btnClose = function (){
  var $obj = $(this),id;

  $obj.click(function(){		
  id = $(this).attr('href');
  if($(id).hasClass('on')){
    $(this).add(id).removeClass('on');
    $('.dim').hide();
  }
  return false;
  })
}
/*아코디언*/
$.fn.accordion = function (){
  var $obj = $(this);
 $obj.find('.accordion_item').find('.accordion_btn').click(function(){
  if($(this).parents('.accordion_item').hasClass('open')){
    $(this).parents('.accordion_item').removeClass('open');
    return false;
  }else{
    $obj.find('.accordion_item').removeClass('open');
    $(this).parents('.accordion_item').addClass('open');
    return false;
  }
  })

}
/*메인슬라이더*/
$.fn.mainSlider = function (){
  var $obj = $(this);
  var $pageBtns = $obj.find('.naviPages'),
  $leftBtn = $obj.find('.leftBtn'),
  $rightBtn = $obj.find('.rightBtn'),
  size=$obj.find('.slider_section').size();
  index=0;
  var playAnimation = true;
  
  function init(){
    initStyle();
    initEvent();
    setAnimate();
  }
  function initStyle(){
    $obj.find('.slider_section').removeClass('active');
    $obj.find('.slider_section').eq(index).addClass('active');
  }
  function countIndexAction(){
    index++
    aniAction();
  }
  function aniAction(){
    if(index > size-1){
      index = 0;
    }else if(index < 0){
      index = size-1;
    }
    removeStyle();
    activeStyle($obj.find('.slider_section').eq(index));
    pageStyle();
  }
  function activeStyle(){
    clearInterval(aniCount);
    $this = $obj.find('.slider_section').eq(index);
    $this.css({
      opacity:0
    }).animate({
      opacity:1
    },1500,function(){
      $this.addClass('active');
      if(playAnimation){
      aniCount = setInterval(countIndexAction,5000);
      }
    })
    activeItme();
  }
  function activeItme(){
    $obj.find('.slider_section').eq(index).find('li').css({
      top:'15px',
      opacity:0
    })
    $obj.find('.slider_section').eq(index).find('li').each(function(){
      var $this = $(this)
      var time = $this.index()*650-$this.index()*$this.index()*50;
      setTimeout(function(){
        activeiTemStyle($this);
      },time);
    });
  }
  function activeiTemStyle($this){
    $this.animate({
      top:0,
      opacity:1
    },1000)
  }
  function removeStyle(){
    $obj.find('.slider_section.active').removeClass('active').css({
      opacity:1
    }).animate({
      opacity:0
    },1500);
  }
  function pageStyle(){
    $('.naviPages').find('.naviPage.active').removeClass('active')
    $('.naviPages').find('.naviPage').eq(index).addClass('active')
  }
  function initEvent(){
    $pageBtns.find('.naviPage').click(function(){
      playAnimation = false;
      if($obj.find('.slider_section').is(':animated') == false){
        index = $(this).index();
        aniAction();
      }
    });
    $leftBtn.click(function(){
      if($obj.find('.slider_section').is(':animated') == false){
        index--;
        aniAction();
      }
    });
    $rightBtn.click(function(){
      if($obj.find('.slider_section').is(':animated') == false){
        index++;
        aniAction();
      }
    });
  }
  function setAnimate(){
    clearInterval(aniCount);
    aniCount = setInterval(countIndexAction,5000);
  }
  var aniCount = setInterval(countIndexAction,5000);
  init();
}