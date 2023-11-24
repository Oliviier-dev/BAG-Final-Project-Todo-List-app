//selecting the elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const starButton = document.querySelector(".star-btn");
const todoList = document.querySelector(".todo-list");
const title = document.getElementById("title");



let userName = localStorage.getItem('userName');

// If userName is not available in local storage or is an empty string, prompt the user for their name
if (!userName) {
  userName = prompt("Please enter your name:") || "";

  // Save the entered userName in local storage
  localStorage.setItem('userName', userName);
}

// If userName is an empty string after the prompt, continue prompting until a name is entered
while (userName.trim() === "") {
  userName = prompt("Please enter your name:") || "";
  localStorage.setItem('userName', userName);
}

title.textContent = `${userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}'s Todo List`;


//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);


//function addTodo which adds a new todo
function addTodo(e){

    e.preventDefault();

    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    //Save to local
    saveLocalTodos(todoInput.value);

    //creating new todo item
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //star button
    const starButton = document.createElement("button");
    starButton.innerHTML = `<i class="fas fa-star"></i>`;
    starButton.classList.add("star-btn");
    todoDiv.insertBefore(starButton, todoDiv.children[0]);

    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //insert the whole div before other todos
    todoList.insertBefore(todoDiv, todoList.children[0]);
}