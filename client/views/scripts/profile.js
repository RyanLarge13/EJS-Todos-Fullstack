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
      res.json();
    })
    .then((content) => {
      const message = document.querySelector(".json");
      message.innerText = content;
    });
};

document.querySelector(".logout", handleLogout);
document.querySelector(".show-form").addEventListener("click", showForm);
