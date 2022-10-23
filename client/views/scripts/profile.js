const baseUrl = "http://localhost:8080/";
const todos = document.querySelectorAll(".todo");
const doneTodos = document.querySelectorAll(".finished");
const sideMenuBtns = document.querySelectorAll(".item");

const showForm = (e) => {
  e.preventDefault();
  const profileForm = document.querySelector(".profile-form");
  profileForm.classList.toggle("show");
};

const deleteTodo = async (e, param) => {
  const todo = e.target.parentElement;
  const title = todo.firstElementChild.innerHTML;
  await fetch(`${baseUrl}${param}${title}`, {
    method: "DELETE",
  }).then((res) => {
    return (window.location = `${baseUrl}profile`);
  });
};

const openAside = (e) => {
  e.preventDefault();
  const sideMenu = document.querySelector(".side-menu-toggle");
  const sideMenuToggle = document.querySelector(".side-menu");
  sideMenu.classList.toggle("display");
  sideMenuToggle.classList.toggle("display");
};

const displayList = (e) => {
  e.preventDefault();
  const listIndicator = document.querySelector(".list-indicator");
  const ref = e.target.innerText;
  const arrayOfLists = Array.from(document.querySelectorAll(".list"));
  listIndicator.innerHTML = ref.toString();
  arrayOfLists.forEach((list) => {
    list.style.display = "none";
  });
  for (let i = 0; i < arrayOfLists.length; i++) {
    if (arrayOfLists[i].id === ref) {
      arrayOfLists[i].style.display = "flex";
    }
  }
  openAside(e);
};

sideMenuBtns.forEach((btn) => {
  btn.addEventListener("click", displayList);
});
todos.forEach((todo) => {
  todo.addEventListener("dblclick", (e) => {
    e.preventDefault();
    const param = "delete/";
    deleteTodo(e, param);
  });
});
doneTodos.forEach((todo) => {
  todo.addEventListener("dblclick", (e) => {
    e.preventDefault();
    const param = "remove/";
    deleteTodo(e, param);
  });
});
document.querySelector(".show-form").addEventListener("click", showForm);
document
  .querySelector(".side-menu-toggle")
  .addEventListener("click", openAside);
