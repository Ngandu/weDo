const todoModal = document.querySelector("#modal");
const todoAddButton = document.querySelector(".addButton");
const modalCover = document.querySelector(".cover");

todoAddButton.addEventListener("click", () => {
  todoModal.classList.add("active");
  modalCover.classList.add("active");
});

modalCover.addEventListener("click", () => {
  todoModal.classList.remove("active");
  modalCover.classList.remove("active");
});
