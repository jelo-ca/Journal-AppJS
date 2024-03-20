// HABIT TRACKER
const monthHeader = document.querySelector(".month-header");
const habitTable = document.querySelector(".habit-table");
const habitDate = document.querySelector(".habit-date");
const habit = document.querySelectorAll(".habit");
const habitAmount = habit.length;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
let month = date.getMonth();
monthHeader.innerHTML = months[month];

function setHabitTable(month) {
  let numDays;
  //sets up # of dates per month
  if (month < 5 && month % 2 == 0) {
    numDays = 31;
  } else {
    numDays = 30;
  }

  for (let i = 0; i < numDays; i++) {
    //Header Dates
    const th = document.createElement("th");
    th.innerHTML = i + 1;
    habitDate.appendChild(th);

    //Habit cells
    for (let i = 0; i < habitAmount; i++) {
      const td = document.createElement("td");
      td.innerHTML = "x";
      habit[i].insertCell();
    }
  }
}

setHabitTable(month);

// TODO-LIST

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
