let todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const inputField = document.querySelector(".todo-item");

function addTodo() {
  if (inputField.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputField.value;
    todoList.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputField.value = "";
  saveData();
}

todoList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    saveData();
  },
  false
);

function saveData() {
  localStorage.setItem("todo-data", todoList.innerHTML);
}

function showTasks() {
  todoList.innerHTML = localStorage.getItem("todo-data");
}

showTasks();
