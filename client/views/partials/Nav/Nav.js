export const toggleNav = (e) => {
  e.preventDefault();
  const spans = document.querySelectorAll(".nav-toggle span");
  const nav = document.querySelector("nav");
  spans.forEach((span) => {
    span.classList.toggle("open");
  });
  nav.classList.toggle('open')
};

document.querySelector(".nav-toggle").addEventListener("click", toggleNav);
