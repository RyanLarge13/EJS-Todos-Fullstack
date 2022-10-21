const showForm = (e) => {
  e.preventDefault();
  const profileForm = document.querySelector(".profile-form");
  profileForm.classList.toggle("show");
};

const handleLogout = async (e) => {
  e.preventDefault();
  await fetch("http://localhost:8080/logout", {
    method: "GET",
  })
    .then((res) => {
      const message = document.querySelector(".json");
      message.innerText = JSON.stringify(res);
    })
    .catch((err) => {
      const message = document.querySelector(".json");
      message.innerText = err;
    });
};

document.querySelector(".logout").addEventListener("click", handleLogout);
document.querySelector(".show-form").addEventListener("click", showForm);
