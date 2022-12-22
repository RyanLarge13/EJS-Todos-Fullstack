const baseUrl = "https://ejs-todos-fullstack.vercel.app/";
const todos = document.querySelectorAll(".todo");
const doneTodos = document.querySelectorAll(".finished");
const sideMenuBtns = document.querySelectorAll(".item");
const success = document.querySelector(".success");

setTimeout(() => {
  success.style.opacity = "0";
}, 2500);

const showForm = (e) => {
  e.preventDefault();
  const profileForm = document.querySelector(".profile-form");
  profileForm.classList.add("show");
  setTimeout(() => {
    profileForm.style.opacity = "1";
  }, 10);
  document.querySelector(".fa-circle-xmark").addEventListener("click", () => {
    profileForm.style.opacity = "0";
    setTimeout(() => {
      profileForm.classList.remove("show");
    }, 500);
  });
};

const deleteTodo = async (e, param) => {
  const todo = e.target;
  const id = todo.firstElementChild.innerHTML;
  await fetch(`${baseUrl}${param}${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (param === "remove/") {
        todo.style.opacity = "0";
        return setTimeout(() => {
          todo.style.height = "0px";
        }, 500);
      }
      todo.style.opacity = "0";
      setTimeout(function () {
        window.location = `${baseUrl}profile`;
      }, 500);
    })
    .catch((err) => console.log(err));
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
  for (let k = 0; k < todos.length; k++) {
    todos[k].style.animationDelay = `${k}00ms`;
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
document.addEventListener("DOMContentLoaded", () => {
  for (let k = 0; k < todos.length; k++) {
    todos[k].style.animationDelay = `${k}00ms`;
  }
});
document.querySelector(".show-form").addEventListener("click", showForm);
document
  .querySelector(".side-menu-toggle")
  .addEventListener("click", openAside);
