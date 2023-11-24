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


//function which deletes, star, and mark todo items as completed

function updateTodo(e){
    const item = e.target;

    //if the user deletes the item
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }

    //if the user marks the todo item as completed
    if(item.classList[0] === "complete-btn"){

        const todo = item.parentElement;
         if (todo.classList.contains("completed")) {
            if(todo.classList.contains("important")){
                todo.classList.remove("completed");
                todoList.insertBefore(todo, todoList.children[0]);
            }
            countCompletedTodo -= 1;
            
            // If the todo item is marked as completed, and there are multiple completed items
            if (document.querySelectorAll('.todo.completed').length > 1) {
                // Move the completed item to the top of completed items
                const completedItems = [...document.querySelectorAll('.todo.completed')];
                const firstCompletedItem = completedItems[0];
                todo.classList.remove("completed");
                todoList.insertBefore(todo, firstCompletedItem);
            } else{
                todo.classList.remove("completed");
            }
        } else {
            countCompletedTodo += 1;
            // If the todo item is not marked as completed, mark it as completed and move it to the bottom
            todo.classList.add("completed");
            todoList.appendChild(todo);
        }
    }

    //If the user stars the todo
    if(item.classList[0] === "star-btn"){
        
        const todo = item.parentElement;
        const starButton = item.parentElement.children[0];
        const star = item.querySelector(".fa-star");
        
        //if the user clicks the star when the item is starred; the star is removed
        if(todo.classList.contains("important")){
            //making sure that the completed items aren't allowed to access this feature
            if(!todo.classList.contains("completed")){
                star.style.color = "black";
                todo.style.background = "white";
                starButton.style.background = "white";
                todo.classList.remove("important");
                todoList.insertBefore(todo,todoList.children[[...document.querySelectorAll('.todo')].length - countCompletedTodo]);
            }

        } else{
            //making sure that the completed items aren't allowed to access this feature
            if(!todo.classList.contains("completed")){
                todo.classList.add("important");
                star.style.color = "#47e6ff";
                starButton.style.background = "#0bd484";
                todo.style.background = "#0bd484";
                
                todoList.insertBefore(todo, todoList.children[0]);
            }
        }
    }
}