const todoModal = document.querySelector("#modal");
const todoAddButton = document.querySelector(".addButton");
const modalCover = document.querySelector(".cover");
const addTodo = document.querySelector(".addTodo");
const listView = document.querySelector(".todo_list");

// Data
let todos = [
  {date: "2022-08-25", isComplete: true, title: "Boom"},
  {date: "2022-08-16", isComplete: false, title: "Scrutny"}
];

// Funstions

// Hide the form
const hideForm = ()=>{
  todoModal.classList.remove("active");
  modalCover.classList.remove("active");

}

// Update Task to complete
const complete = (i)=>{

  // let td = todos[i];
  todos[i].isComplete = !todos[i].isComplete;
  refreshList();
  // console.table(td);
}

// Render the list on the screen
const renderList = ()=>{

  for(i in todos){
    let td = todos[i];

    let template = `<div class="listItem ${td.isComplete? 'complete': null}">
        <p>
            ${td.title}<br>
            <small>${td.date}</small>
        </p>
        <span onClick="complete(${i})"></span>
    </div>`;

    listView.insertAdjacentHTML('beforeend', template);

  }
}

// refresh List
const refreshList = () =>{
  // remove all children
  listView.innerHTML = '';
  // re-render the list
  renderList();
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
  if(title.length > 1 && date.length > 5){
    // create an element
    let newTd = {"title": title, "date": date, "isComplete": false};
    todos.push(newTd);
  }else{
    alert('Could not add todo, please ensure entries are correct.');
    return
  }

  form.reset();

  console.log('todos: ',todos);

  // Refresh List
  refreshList();
  // Hide form
  hideForm();


})

// Start the App
  renderList();
const initApp = ()=>{
}
