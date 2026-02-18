const openButtons = document.querySelectorAll(".openModal");
const closeButtons = document.querySelectorAll(".closeModal");
const modals = document.querySelectorAll(".modal");

openButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modals[index].classList.add("open");
  });
});

closeButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modals[index].classList.remove("open");
  });
});
