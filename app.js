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