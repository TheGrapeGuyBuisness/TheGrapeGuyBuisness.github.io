const navEl = document.querySelector('.nav');
const hamburgerEl = document.querySelector('.hamburger');
const navItemEls = document.querySelectorAll('.nav__item');

hamburgerEl.addEventListener('click', () => {
  navEl.classList.toggle('nav--open');
  hamburgerEl.classList.toggle('hamburger--open');
});

navItemEls.forEach(navItemEl => {
  navItemEl.addEventListener('click', () => {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open');
  });
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
})

document.addEventListener('click', () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500)
})

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

/**
* Utility function to update the button text and aria-label.
*/
function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  // use an aria-label if you are omitting text on the button
  // and using a sun/moon icon, for example
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}

/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}


/**
* On page load:
*/

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
}); 

var trail = {
  dots: null,
  mousex:0,
  mousey:0,
  length:10,
  Dot: function()
  {
    var oDot = document.createElement("div");
    $(oDot).addClass("dot");
    $(document.body).append(oDot);
    return oDot;
  },

  createDots: function()
  {
    trail.dots = [];
    for(i=0;i<trail.length;i++)
    {
      var dot = new trail.Dot();          
      $(dot).css({opacity:(trail.length-i)/trail.length});
      trail.dots[i]= dot;
    }
  },
  
  follow: function(tx, ty, dot)
  {
    var dotx = parseInt($(dot).css("left"));
    var doty = parseInt($(dot).css("top"));
    var newx = ((tx+dotx*2)/3);
    var newy = ((ty+doty*2)/3);
    
    $(dot).css({top:newy, left:newx});    
  },
  
  move: function()
  {
    trail.follow(trail.mousex, trail.mousey, trail.dots[0]);
    
    for(i=1;i<trail.length;i++)
    {
      dot = trail.dots[i-1];
      var tx = parseInt($(dot).css("left"));
      var ty = parseInt($(dot).css("top"));
      trail.follow(tx,ty, trail.dots[i]);
    }
  },
  mousemove: function(mx,my)
  {
    trail.mousex = mx;
    trail.mousey = my;
  },
  
  initialize: function()
  {
    trail.createDots();
    setInterval(function(){ trail.move(); }, 10);
  }
};
    
trail.initialize();

$(document).mousemove(function(e){
  trail.mousemove(e.pageX, e.pageY);
});