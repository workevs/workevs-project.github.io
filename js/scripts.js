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