const baseUrl = "http://localhost:8080/";
const todos = document.querySelectorAll(".todo");
const sideMenuBtns = document.querySelectorAll(".item");

const showForm = (e) => {
  e.preventDefault();
  const profileForm = document.querySelector(".profile-form");
  profileForm.classList.toggle("show");
};

const deleteTodo = async (e) => {
  e.preventDefault();
  const todo = e.target.parentElement;
  const title = todo.firstElementChild.innerHTML;
  await fetch(`${baseUrl}delete/${title}`, {
    method: "DELETE",
  }).then((res) => {
    return (window.location = `${baseUrl}profile`);
  });
};

const openAside = (e) => {
  e.preventDefault();
  const sideMenu = document.querySelector(".side-menu");
  sideMenu.classList.toggle("display");
};

const displayList = (e) => {
  e.preventDefault();
  const ref = e.target.innerHTML;
  const arrayOfLists = Array.from(document.querySelectorAll(".list"));
  arrayOfLists.forEach((list) => {
    list.style.display = "none";
  });
  for (let i = 0; i < arrayOfLists.length; i++) {
    if (arrayOfLists[i].id === ref) {
      arrayOfLists[i].style.display = "flex";
    }
  }
};

sideMenuBtns.forEach((btn) => {
  btn.addEventListener("click", displayList);
});
todos.forEach((todo) => {
  todo.addEventListener("dblclick", deleteTodo);
});
document.querySelector(".show-form").addEventListener("click", showForm);
document
  .querySelector(".side-menu-toggle")
  .addEventListener("click", openAside);
