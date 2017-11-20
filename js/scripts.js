//

var hamburger = document.querySelector('#hamburger');
var mobileMenu = document.querySelector('#mobile-menu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
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