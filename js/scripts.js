// Открытие, скрытие мобильного меню

$(document).ready(function() {
  
  $('#hamburger').on('click touchstart', function(e) {
    e.preventDefault();
    const hamburger = $(e.currentTarget),
          mobileMenu = $('#mobile-menu'),
          elemBody = $('.body');
    hamburger.toggleClass('mobile-menu-open');
    mobileMenu.toggleClass('mobile-menu-open');
    elemBody.toggleClass('mobile-menu-open');
  });

  $('.mobile-menu__link').on('click touchstart', function(e) {
    e.preventDefault();
    const hamburger = $('#hamburger'),
          mobileMenu = $('#mobile-menu'),
          elemBody = $('.body');
    hamburger.removeClass('mobile-menu-open');
    mobileMenu.removeClass('mobile-menu-open');
    elemBody.removeClass('mobile-menu-open');
  });

});

// Открытие, скрытие cостава бургеров в секции Goods

var compositionButton = document.querySelectorAll('.composition__button');
var compositionList = document.querySelectorAll('.composition__list');

for (var i = 0; i < compositionButton.length; i++) {
  compositionButton[i].addEventListener('click', function() {
    for (var a = 0; a < compositionList.length; a++) {
      compositionList[a].classList.toggle('open');
    }
  });
};

// Открытие, скрытие профайлов сотрудников в секции Team

$(document).ready(function() {
    $(".team-menu__name").on('click touchstart', function(e) {
      e.preventDefault();
      if ($(this).hasClass('team-menu__name--active')) {
        $('.team-menu__name').removeClass('team-menu__name--active');
      } else {
        $('.team-menu__name').removeClass('team-menu__name--active');
        $(this).addClass('team-menu__name--active');
      };
    });
});

// Открытие, скрытие аккордеон меню в секции Menu

$(document).ready(function() {
  $(".accordeon-menu__title").on('click touchstart', function(e) {
    e.preventDefault();
    var elemName = $(e.currentTarget);
    var elemDesc = elemName.next(); 
    var elemNameWidth = $('.accordeon-menu__title').width();
    var brWidth = $(window).width();
    var finalWidth = brWidth - (elemNameWidth * 3) - 2; // '-2' - костыль, так быть не должно 
    if (elemName.parent().hasClass('accordeon-menu__item--active')) {
      $('.accordeon-menu__item').removeClass('accordeon-menu__item--active');
      $('.accordeon-menu__description').css('width', '0px');
    } else {
      $('.accordeon-menu__item').removeClass('accordeon-menu__item--active');
      $('.accordeon-menu__description').css('width', '0px');
      elemName.parent().addClass('accordeon-menu__item--active');
      elemDesc.css('width', finalWidth);
    };
  });
});

// Slider

$(document).ready(function() {
  
  var moveSlide = function(container, slideNum) {
    var items = container.find('.goods-slider__item');
    var activeSlide = items.filter('.goods-slider__item--active');
    var reqItem = items.eq(slideNum);
    var reqIndex = reqItem.index();
    var list = container.find('.goods-slider__list');
    var duration = 500;

    if (reqItem.length) {
      list.animate({
        'left' : -reqIndex * 100 + '%'
      }, duration, function() {
        activeSlide.removeClass('goods-slider__item--active');
        reqItem.addClass('goods-slider__item--active');
      });
    };
  };
  
  $('.goods-slider__arrow').on('click touchstart', function(e) {
    e.preventDefault();
    var slideArrow = $(e.currentTarget);
    var container = slideArrow.closest('.goods-slider');
    var items = container.find('.goods-slider__item');
    var activeItem = items.filter('.goods-slider__item--active');
    var nextItem = activeItem.next();
    var prevItem = activeItem.prev();
    var existedItem;
    var edgeItem;
    var reqItem; 

    if (slideArrow.hasClass('goods-slider__arrow--next')) {
      existedItem = activeItem.next();
      edgeItem = items.first();
    }
    
    if (slideArrow.hasClass('goods-slider__arrow--prev')) {
      existedItem = activeItem.prev();
      edgeItem = items.last();
    } 
    
    reqItem = existedItem.length ? existedItem.index() : edgeItem.index(); 

    moveSlide(container, reqItem);
  });

});

// OPS

const display = $('.content');
const sections = $('.content__item');

let inScroll = false; // состояние покоя, скролла нет

const mobileDetect = new MobileDetect(window.navigator.userAgent); // определяем на каком браузере сидим, если значение отлично от null, значит на мобильном - http://hgoebl.github.io/mobile-detect.js/
const isMobile = mobileDetect.mobile();

const switchMenuActiveClass = function(sectionEq) {
  $('.pagination__item').eq(sectionEq).addClass('pagination__item--active').siblings().removeClass('pagination__item--active');
}

const performTransition = function(sectionEq) { // определяем величину сдвига по оси Y на основе индекса секций, аргумент sectionEq 
  if (inScroll === false) { // как только дернули touch
    inScroll = true;
    const position = (sectionEq * -100) + '%';
  
    display.css({
      'transform': `translate(0, ${position})`,
      '-webkit-transform': `translate(0, ${position})`
    });
  
    sections.eq(sectionEq).addClass('content__item--active').siblings().removeClass('content__item--active');

    setTimeout(function() {
      inScroll = false;
      switchMenuActiveClass(sectionEq);
    }, 1100); // задержка на 300мс (по умолчанию transition на 1s) для предотвращения прокручивания сразу нескольких секций
  };
}

const difineSections = function(sections) { // определяем активную секцию и ее ближайших соседей (следующего, предыдущего)
  const activeSection = sections.filter('.content__item--active');
  return { // возвращаем объект с нужными секциями
    activeSection: activeSection,
    nextSection: activeSection.next(),
    prevSection: activeSection.prev()
  }
}

const scrollToSection = function(direction) { // определяем для мобильных куда будет осуществляться скролл при touchmove
  const section = difineSections(sections);

  if (inScroll) return; // если в состоянии скролла, ничего не делаем

  if (direction === 'up' && section.nextSection.length) { // скроллим вниз если есть куда
    performTransition(section.nextSection.index())
  }

  if (direction === 'down' && section.prevSection.length) { // скроллим вверх если есть куда
    performTransition(section.prevSection.index())
  }
}

$('.wrapper').on({ // на одном элементе передано 2 события (прокрутка мышкой/клавой и тач) в виде свойств объекта

  wheel : function(e) {
    const deltaY = e.originalEvent.deltaY; // величина в пикселях, отражающая насколько мы прокрутили колесико мыши и в какую сторону
    let direction = (deltaY > 0) ? 'up' : 'down' // если deltaY > 0, в переменной сохраняем 'up', иначе 'down'
    scrollToSection(direction); 
  },
  touchmove: function(e) { // touchstart (коснулись пальцем), touchmove (повели пальцем), touchend (отпустили палец)
    e.preventDefault(); // запрещаем действие по-умолчанию, для мобильных - прокрутку к пустым областям
  }
});

$(document).on('keydown', function(e) { // скролл с клавиатуры
  const section = difineSections(sections);

  if (inScroll) return // как только дернули touch

  switch (e.keyCode) {
    case 40: // код кнопки вверх на клаве
      if (!section.nextSection.length) return;
      performTransition(section.nextSection.index());
      break;

    case 38: // код кнопки вниз на клаве
      if (!section.prevSection.length) return;
      performTransition(section.prevSection.index());
      break;
  }
});

if (isMobile) {
  $(window).swipe({ // движение пальцем по экрану touchswipe.js - https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      scrollToSection(direction);
    }
  })
}

$('[data-scroll-to]').on('click touchstart', function(e) { // скролл к секции с опред. индексом
  e.preventDefault();
  const currentLink = $(e.currentTarget);
  const sectionIndex = parseInt(currentLink.attr('data-scroll-to')); // строку переводим в число

  performTransition(sectionIndex);
});

// Reviews Modal

$(document).ready(function() {
  
  $('.reviews__link').on('click touchstart', function(e) {
    e.preventDefault();
    const currentLink = $(e.currentTarget),
          container = currentLink.closest('.reviews__mask'),
          name = container.children('.reviews__name').text(),
          value = container.children('.reviews__value').text();
    showModal = function() {
      $('.modal-review__name').text(name);
      $('.modal-review__value').text(value); 
    }
    showModal();

    $('.modal-review').removeClass('visuallyhidden');
    $('.pagination').css('z-index', '-1');
  
    if (!$('.modal-review').hasClass('visuallyhidden')) {
      $('.modal-review__close').on('click', function(e) {
        e.preventDefault()
        $('.modal-review').addClass('visuallyhidden');
        $('.pagination').css('z-index', '2000');
      });
      $('.modal-review').on('click', function(e) {
        if ($('.modal-review__container').has(e.target).length === 0) {
          $('.modal-review').addClass('visuallyhidden');
          $('.pagination').css('z-index', '2000');
        }
      });
    }

  });

});

// Скрываем текст отзыва на мобильных

var reviewValue = document.querySelectorAll('.reviews__value');

for (var i = 0; i < reviewValue.length; i++) {
  if (document.body.clientWidth <= 480) {
    reviewValue[i].classList.add('visuallyhidden');   
  };
};

// Заменяем текст кнопки на мобильных

var a = document.querySelectorAll('.reviews__link');

for (var i = 0; i < a.length; i++) {
  if (document.body.clientWidth <= 480) {
    a[i].innerHTML='Читать отзыв';  
  };
};