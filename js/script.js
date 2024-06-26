const footerYear = document.querySelector(".year");
const currentYear = new Date().getFullYear();
footerYear.textContent = currentYear;

///////////////////////////////////////////////////////////
// mobile navigation
const navBtnEL = document.querySelector(".btn-mobile-nav");
const navHeaderEl = document.querySelector(".header");

navBtnEL.addEventListener("click", function () {
  navHeaderEl.classList.toggle("nav-open");
  console.log(navHeaderEl.classList);
});

///////////////////////////////////////////////////////////
// smooth scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Check if the link is internal (starts with #)
    if (href.startsWith("#")) {
      e.preventDefault();

      // scroll back to top:
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // other scrolling
        const sectionEl = document.querySelector(href);
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }

      // close mobile nav
      if (link.classList.contains("main-nav-link")) {
        navHeaderEl.classList.toggle("nav-open");
      }
    }
  });
});

///////////////////////////////////////////////////////////
// sticky navbar

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
