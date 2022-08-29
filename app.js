const todoModal = document.querySelector("#modal");
const todoAddButton = document.querySelector(".addButton");
const modalCover = document.querySelector(".cover");
const addTodo = document.querySelector(".addTodo");
const listView = document.querySelector(".todo_list");
const menuButton = document.querySelector(".menuButton");
const deleteButton = document.querySelector(".deleteButton");
let menuOpen = false;

// Data
// let todos = [
//   {date: "2022-08-25", isComplete: true, title: "Boom"},
//   {date: "2022-08-16", isComplete: false, title: "Scrutny"}
// ];


/*    ----- UI -----   */

menuButton.addEventListener('click', ()=>{
  if(!menuOpen){
    todoAddButton.classList.add("move");
    deleteButton.classList.add("move");
    document.querySelector(".fa-bars").classList.add("hide");
    document.querySelector(".fa-close").classList.remove("hide");
    menuOpen = !menuOpen;
  }else if(menuOpen){
    todoAddButton.classList.remove("move");
    deleteButton.classList.remove("move");
    document.querySelector(".fa-bars").classList.remove("hide");
    document.querySelector(".fa-close").classList.add("hide");
    menuOpen = !menuOpen;
  }
})

// Date

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let now = new Date();

let month = months[now.getMonth()];
let today = now.getDate();
let year = now.getFullYear();
let dayOfWeek = now.getDay();

document.querySelector('.date').innerHTML = today;
document.querySelector('.month').innerHTML = month;
document.querySelector('.year').innerHTML = year;
document.querySelector('.today_txt > p').innerHTML = weekday[dayOfWeek];

console.log(month);

let todos = [];

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

  // Check whether todos has items
  if(todos.length == 0){

    let template = `<div class="intMessage">

                        <h3>Nothing to do here</h3>
                        <p>You an create your list.</p>

                    </div>`;
    listView.insertAdjacentHTML('beforeend', template);
    return
  }

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

const initApp = async ()=>{

  // Check if there is data in the localstorage
  let localData = await localStorage.getItem("weDoData");
  console.log("localData: ",localData);

  let data = JSON.parse(localData);
  console.log("Data: ",data);

  if(data.length > 0){
    todos = data;
  }

  // Render the list on the screen
    renderList();
}



// Start the App
initApp();


window.addEventListener('beforeunload', function (e) {
    // Load the array in localstorage
    let data = JSON.stringify(todos);
    localStorage.setItem("weDoData", data);
    e.preventDefault();
    e.returnValue = '';
});
