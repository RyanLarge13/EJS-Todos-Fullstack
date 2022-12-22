const baseUrl = "https://ejs-todos-fullstack.vercel.app/";

export const toggleNav = (e) => {
  e.preventDefault();
  const spans = document.querySelectorAll(".nav-toggle span");
  const nav = document.querySelector("nav");
  spans.forEach((span) => {
    span.classList.toggle("open");
  });
  nav.classList.toggle("open");
};

export const logout = async (e) => {
  e.preventDefault();
  await fetch(`${baseUrl}logout`, {
    method: "DELETE",
  }).then((res) => {
    window.location = `${baseUrl}`;
  });
};

document.querySelector(".nav-toggle").addEventListener("click", toggleNav);
document.querySelector(".logout").addEventListener("click", logout);
