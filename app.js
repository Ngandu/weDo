const todoModal = document.querySelector("#modal");
const todoAddButton = document.querySelector(".addButton");
const modalCover = document.querySelector(".cover");
const addTodo = document.querySelector(".addTodo");

// Data
let todos = [];

// Funstions

const hideForm = ()=>{
  todoModal.classList.remove("active");
  modalCover.classList.remove("active");

}

todoAddButton.addEventListener("click", () => {
  todoModal.classList.add("active");
  modalCover.classList.add("active");
});

modalCover.addEventListener("click", () => {
  hideForm();
});


// Add Todo

addTodo.addEventListener("click", ()=>{
  event.preventDefault();
  let form = document.querySelector('#addForm');
  let title = document.querySelector('.newTitle').value;
  let date = document.querySelector('.newDate').value;
  if(title.length > 3 && date.length > 5){
    // create an element
    let newTd = {"title": title, "date": date, "isComplete": false};
    todos.push(newTd);
  }

  form.reset();

  console.log('todos: ',todos);

  // Hide form
  hideForm();

})
