const index = {};

index.$menu = $('#sideMenu');
index.$navItem = $('.navItem');
index.$navItemName = $('.navItemName')
index.$home = $('#home');
index.$about=$('#about');
index.$skills = $('#skills');
index.$works = $('#works');
index.$contact = $('#contact');
index.$menuButton = $('#menuButton');
index.$scrollDown = $('#scrollDown');
index.isOpen = false;

// Scroll function
index.scroll = function(target) {
  $('html,body').animate({ scrollTop: $(target).offset().top }, 500);
}

// Menu button function
index.showHideMenu = function() {
  index.$menu.toggleClass('sideMenuHide sideMenuShow');
  index.isOpen = !index.isOpen;
}

// Mobile class changes on initial load
if ($(window).width() <= 990) {
  index.$menu.addClass('sideMenuHide').removeClass('sideMenuShow');
  index.$scrollDown.hide();
}

index.eventListeners = function() {
  // when windox resizes between large and small displayes
  $(window).on('resize', function() {
    if ($(window).width() > 990) {
      index.$menu.removeClass('sideMenuHide').addClass('sideMenuShow')
      index.$scrollDown.show();
      index.isOpen= false;
    } else {
      index.$menu.removeClass('sideMenuShow').addClass('sideMenuHide');
      index.isOpen = false;
      index.$scrollDown.hide();
    }
  });

  // Nav menu click events for scroll function
  $('a[href*=\\#]').on('click', function () {
    index.scroll(this.hash);
  });

  // Menu button click event
  index.$menuButton.on('click', index.showHideMenu);

  // Hide menu when clicking a link
  index.$navItem.on('click', function() {
    if (index.isOpen) {// Hide menu when clicking a link
      index.showHideMenu();
    }
  });

  // Menu button ENTER key event
  index.$menuButton.on('keypress', function(e){
    if (e.which === 13) {
      $(this).trigger('click');
    }
  })
}

// init method
index.init = function() {
  index.eventListeners();
}

// Document Ready
$(function() {
  index.init();
})


function initLanguageToggle() {
  const btnIt = document.getElementById('btn-it');
  const btnEn = document.getElementById('btn-en');
  const elements = document.querySelectorAll('[data-lang]');

  function setLang(lang) {
    elements.forEach(el => {
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });
    btnIt.classList.toggle('active', lang === 'it');
    btnEn.classList.toggle('active', lang === 'en');
  }

  btnIt.addEventListener('click', () => setLang('it'));
  btnEn.addEventListener('click', () => setLang('en'));

  // Set default language
  setLang('it');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLanguageToggle);

