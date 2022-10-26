const baseUrl = "https://ejs-todos.onrender.com/";
// const baseUrl = "http://localhost:8080/";

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
