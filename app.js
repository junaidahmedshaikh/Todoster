const searchSection = document.querySelector(".searchSection");
const addTaskBtn = document.querySelector(".addTaskBtn");
const todoListSection = document.querySelector("#todoListSection");
const userInput = todoListSection.querySelectorAll(".userInput");

// Date Function Section
const localDate = new Date();
const currentDate = localDate.toDateString();
const currentDateDisplay = document.querySelector(".currentDateDisplay");
currentDateDisplay.innerHTML = currentDate;

let listArray = [];
const monthsName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const todoProgress = `<i class="fa-solid fa-circle-dot"> </i> Task In Progress`
// This is main function
function todoMaker(e) {
  e.preventDefault();

  const userInput = document.querySelector(".userInput").value;

  if (userInput == "") return;

  const todoList = {
    name: userInput,
    id: Date.now(),
  };

  listArray.push(todoList);
  e.currentTarget.reset();

  todoListSection.dispatchEvent(new CustomEvent("todoListUpdated"));
}

// function setTimeOutForDate (){

//
//   }
// This Function Create Todo List
function displayTodoItem() {
  let todoMonth = monthsName[localDate.getMonth()];
  let todoDate = localDate.getDate();
  const todoCreatedDate = `${todoDate} ${todoMonth}`;
  let todoHour = localDate.getHours().toString();
  let todoMin = localDate.getMinutes().toString();
  const todoCreatedTime = `${todoHour}:${todoMin}`;


  

  const htmlOfTodoItem = listArray.map(
    (todoList) => `  
    <div class="todoList">
    
      <div class="todoInfo">
        <input class="userInput" type="checkbox">
        <span class="todoTask">${todoList.name}</span>
        <button  value="${todoList.id}"  class="fa-solid fa-xmark todoRemovedBtn"></button>
      </div>
       
      <div class="todoDescription">
        <span class="todoProgress"> ${todoProgress} </span>
        <span class="todoDate"> <i class="fa-solid fa-calendar-days"></i> ${todoCreatedDate}</span>
        <span class="todoTime"> <i class="fa-solid fa-clock"></i> ${todoCreatedTime} </span>
      </div>
    </div>`
  );
  todoListSection.innerHTML = htmlOfTodoItem;

 
}

function copyDataIntoLocalStorage() {
  localStorage.setItem("TodoList", JSON.stringify(listArray));
}

function restorDataFromLocalStorage() {
  const restoredData = JSON.parse(localStorage.getItem("TodoList"));

  if (restoredData.length) {
    restoredData.forEach((rData) => listArray.push(rData));
    todoListSection.dispatchEvent(new CustomEvent("todoListUpdated"));
  }
}

function deleteTodoList(e) {
  if (e.target.matches("button")) {
    filterAndUpdatedDeleteList(parseInt(e.target.value));
    // console.log(e.target.value);
  }
}

function filterAndUpdatedDeleteList(id) {
  listArray = listArray.filter((todoList) => todoList.id !== id);
  todoListSection.dispatchEvent(new CustomEvent("todoListUpdated"));
}

function checkTask (e){
  if (e.target.matches("input")){
    
    if(e.target.checked === true){
    //  console.log(e.target)
      let nodeListOfTodo = document.querySelector(".todoProgress")
      nodeListOfTodo.innerHTML =`<i class="fa-solid fa-circle-dot"> </i>  Task Is Completed`
      nodeListOfTodo.classList.add("todoCompleted")
      
    } else {
      let demo = document.querySelector(".todoProgress")
      demo.innerHTML = todoProgress;
      demo.classList.remove("todoCompleted")
    }
  }
  
}

searchSection.addEventListener("submit", todoMaker);
todoListSection.addEventListener("todoListUpdated", displayTodoItem);
todoListSection.addEventListener("todoListUpdated", copyDataIntoLocalStorage);
todoListSection.addEventListener("click", deleteTodoList);
todoListSection.addEventListener("click", checkTask)

restorDataFromLocalStorage();
