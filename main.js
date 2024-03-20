let todoList = document.querySelector(".todo-container");
const todoTemplate = document.querySelector(".todo-template");
const todoAddButton = document.querySelector(".add-todo");
const todoDeleteButton = document.querySelector(".todo-delete");

let todos = getTodos();

function getTodos() {
  const val = localStorage.getItem("todo") || "[]";

  return JSON.parse(val);
}

function setTodos(todos) {
  const todoJson = JSON.stringify(todos);

  localStorage.setItem("todo", todoJson);
}

function updateTodo(todo, key, val) {
  todo[key] = val;

  setTodos(todos);
  refreshList;
}

function addTodo() {
  todos.unshift({
    description: "",
    completed: false,
  });

  setTodos(todos);
  refreshList();
}

function deleteTodo(key) {
  todos.splice(key, 1);
  setTodos(todos);
  refreshList();
}

function refreshList() {
  todoList.innerHTML = "";

  for (const todo of todos) {
    let itemElement = todoTemplate.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector(".todo-item");
    const checkInput = itemElement.querySelector(".todo-complete");

    descriptionInput.value = todo.description;
    checkInput.checked = todo.completed;

    todoList.append(itemElement);
  }
}

// JUST TO CLEAR WHILE MAKING deleteTodo()
localStorage.clear();

todoAddButton.add;
todoAddButton.addEventListener("click", () => addTodo());
todoDeleteButton.addEventListener("click", () => deleteTodo(1));
refreshList();
