const showForm = (e) => {
  e.preventDefault();
  const profileForm = document.querySelector(".profile-form");
  profileForm.classList.toggle("show");
};

document.querySelector(".show-form").addEventListener("click", showForm);
