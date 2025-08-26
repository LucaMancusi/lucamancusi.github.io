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

  const btnItMobile = document.getElementById('btn-it-mobile');
  const btnEnMobile = document.getElementById('btn-en-mobile');

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

  btnItMobile.addEventListener('click', () => setLang('it'));
  btnEnMobile.addEventListener('click', () => setLang('en'));

  // Set default language
  setLang('it');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLanguageToggle);

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('theme-toggle');
  const whiteModeHref = 'styles/styles-white-mode.css';
  const darkModeHref = 'styles/styles-dark-mode.css';
  const themeKey = 'theme-mode';

  function setTheme(mode) {
    let link = document.querySelector('link[href*="styles/styles-"][rel="stylesheet"]');
    if (!link) return;
    if (mode === 'dark') {
      link.href = darkModeHref;
      toggle.checked = true;
    } else {
      link.href = whiteModeHref;
      toggle.checked = false;
    }
    localStorage.setItem(themeKey, mode);
  }

  // On load, set theme from localStorage
  const saved = localStorage.getItem(themeKey);
  if (saved === 'dark') setTheme('dark');
  else setTheme('white');

  toggle.addEventListener('change', function() {
    setTheme(this.checked ? 'dark' : 'white');
  });
});


function initMobileThemeToggle() {
  const switchOnOffMobile = document.getElementById('switch-on-off-mobile');
  const whiteModeHref = 'styles/styles-white-mode.css';
  const darkModeHref = 'styles/styles-dark-mode.css';
  const themeKey = 'theme-mode';

  function setTheme(mode) {
    let link = document.querySelector('link[href*="styles/styles-"][rel="stylesheet"]');
    if (!link) return;
    if (mode === 'dark') {
      link.href = darkModeHref;
      switchOnOffMobile.classList.remove('lni-moon-half-right-5');
      switchOnOffMobile.classList.add('lni-sun-1');
    } else {
      link.href = whiteModeHref;
      switchOnOffMobile.classList.remove('lni-sun-1');
      switchOnOffMobile.classList.add('lni-moon-half-right-5');
    }
    localStorage.setItem(themeKey, mode);
  }

  // On load, set theme from localStorage
  const saved = localStorage.getItem(themeKey);
  if (saved === 'dark') setTheme('dark');
  else setTheme('white');

  switchOnOffMobile.addEventListener('click', function() {
    setTheme(switchOnOffMobile.classList.contains('lni-moon-half-right-5') ? 'dark' : 'white');
  });
}

document.addEventListener('DOMContentLoaded', initMobileThemeToggle);




window.addEventListener("load", function(){
  window.cookieconsent.initialise({
    palette: {
      popup: { background: "#0f172a" },
      button: { background: "#38bdf8", text: "#0f172a" }
    },
    theme: "classic",
    position: "bottom",
    type: "opt-in", // Importante: consenso preventivo
    content: {
      message: "Questo sito utilizza Google Analytics per migliorare l'esperienza utente.",
      dismiss: "Rifiuta",
      allow: "Accetta",
      link: "Leggi di più",
      href: "/privacy.html" // crea una pagina privacy semplice
    },
    onInitialise: function (status) {
      if (status == cookieconsent.status.allow) enableGA();
    },
    onStatusChange: function(status) {
      if (status == cookieconsent.status.allow) enableGA();
    }
  });
});

// Funzione che carica Google Analytics solo se l’utente accetta
function enableGA() {
  if (window.gaEnabled) return; // evita doppi caricamenti
  window.gaEnabled = true;

  var gtagScript = document.createElement('script');
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-0Q6LEDVLND";
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  gtagScript.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-0Q6LEDVLND');
  };
}