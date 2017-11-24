//

var hamburger = document.querySelector('#hamburger');
var mobileMenu = document.querySelector('#mobile-menu');
var elemBody = document.querySelector('.body');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  elemBody.classList.toggle('open');
});

//

var compositionButton = document.querySelectorAll('.composition__button');
var compositionList = document.querySelectorAll('.composition__list');

for (var i = 0; i < compositionButton.length; i++) {
  compositionButton[i].addEventListener('click', function() {
    for (var a = 0; a < compositionList.length; a++) {
      compositionList[a].classList.toggle('open');
    }
  });
};

//

$(document).ready(function(){
    $(".team-menu__name").click( function () {
      var container = $(this).parents(".team-menu__item");
      var name = container.find(".team-menu__profile");
      var profile = container.find(".team-menu__name");
  
      name.slideToggle(200);
      
      if (profile.hasClass("team-menu__name--active")) {
        profile.removeClass("team-menu__name--active");
      }
      else {
        profile.addClass("team-menu__name--active");
      }
    });
});

//

var accMenuName = document.querySelectorAll('.accordeon-menu__title');
var accMenuDesc = document.querySelectorAll('.accordeon-menu__description');

for (var i = 0; i < accMenuName.length; i++) {
  accMenuName[i].addEventListener('click', function() {
    for (var a = 0; a < accMenuDesc.length; a++) {
      accMenuDesc[a].classList.toggle('open');
    }
  });
};

//

var reviewValue = document.querySelectorAll('.mask p');

for (var i = 0; i < reviewValue.length; i++) {
  if (document.body.clientWidth <= 480) {
    reviewValue[i].classList.add('visuallyhidden');   
  };
};

//

var a = document.querySelectorAll('.reviews .button__link');

for (var i = 0; i <a.length; i++) {
  if (document.body.clientWidth <= 480) {
    a[i].innerHTML='Читать отзыв';  
  };
};
