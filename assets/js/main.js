// Behaviour of the page chrome: theme, navigation menu and footer placement.

const root = document.documentElement;
const masthead = document.querySelector(".masthead");
const sidebar = document.querySelector(".sidebar");
const footer = document.querySelector(".page__footer");
const LARGE = 925;   // px, the $large breakpoint of _sass/_themes.scss

// Width or height of an element without its padding and border.
function inner(el, side) {
  const style = getComputedStyle(el);
  const [a, b] = side === "width" ? ["Left", "Right"] : ["Top", "Bottom"];
  return el.getBoundingClientRect()[side]
    - parseFloat(style["padding" + a]) - parseFloat(style["padding" + b])
    - parseFloat(style["border" + a + "Width"]) - parseFloat(style["border" + b + "Width"]);
}

/* Theme: the saved choice if there is one, otherwise the system preference. */

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeIcon = document.getElementById("theme-icon");

function setTheme(theme) {
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  themeIcon.classList.toggle("fa-moon", theme === "dark");
  themeIcon.classList.toggle("fa-sun", theme !== "dark");
}

setTheme(localStorage.getItem("theme") || (darkQuery.matches ? "dark" : "light"));
darkQuery.addEventListener("change", (event) => {
  if (!localStorage.getItem("theme")) setTheme(event.matches ? "dark" : "light");
});
document.getElementById("theme-toggle").addEventListener("click", () => {
  const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  setTheme(theme);
});

/* Navigation: the links that do not fit in the masthead move to a menu behind the button. */

const nav = document.getElementById("site-nav");
const menuButton = nav.querySelector("button");
const visibleLinks = nav.querySelector(".visible-links");
const hiddenLinks = nav.querySelector(".hidden-links");
const tail = visibleLinks.querySelector(".persist.tail");
const breaks = [];   // widths of the visible list at which a link was hidden

function availableWidth() {
  const width = inner(nav, "width");
  return menuButton.classList.contains("hidden") ? width : width - inner(menuButton, "width") - 30;
}

function updateNav() {
  if (inner(visibleLinks, "width") > availableWidth()) {
    let movable = visibleLinks.querySelectorAll(":scope > :not(.persist)");
    while (inner(visibleLinks, "width") > availableWidth() && movable.length > 0) {
      breaks.push(inner(visibleLinks, "width"));
      hiddenLinks.prepend(movable[movable.length - 1]);
      menuButton.classList.remove("hidden");
      movable = visibleLinks.querySelectorAll(":scope > :not(.persist)");
    }
  } else {
    while (breaks.length > 0 && availableWidth() > breaks[breaks.length - 1]) {
      visibleLinks.insertBefore(hiddenLinks.firstElementChild, tail);
      breaks.pop();
    }
    if (breaks.length === 0) {
      menuButton.classList.add("hidden");
      menuButton.classList.remove("close");
      hiddenLinks.classList.add("hidden");
    }
  }
  menuButton.setAttribute("count", breaks.length);

  // The masthead is fixed: push the page, and the sidebar on wide screens, below it.
  const height = inner(masthead, "height") + "px";
  document.body.style.paddingTop = height;
  if (sidebar) sidebar.style.paddingTop = window.innerWidth >= LARGE ? height : "";
}

menuButton.addEventListener("click", () => {
  hiddenLinks.classList.toggle("hidden");
  menuButton.classList.toggle("close");
});

/* Footer: it is positioned at the bottom of the page, so the body keeps room for it. */

function placeFooter() {
  const style = getComputedStyle(footer);
  document.body.style.paddingBottom = "0";
  document.body.style.marginBottom =
    footer.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom) + "px";
}

function layout() {
  updateNav();
  placeFooter();
}

window.addEventListener("resize", layout);
layout();
