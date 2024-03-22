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
      let checkbox = habit[i].insertCell();
      checkbox.classList.add("habit-checkbox");
    }
  }
}

setHabitTable(month);

const habitCheckbox = document.querySelectorAll(".habit-checkbox");

for (let i = 0; i < habitCheckbox.length; i++) {
  habitCheckbox[i].addEventListener(
    "click",
    function () {
      this.classList.toggle("checked");
      console.log(i);
      let span = document.createElement("span");
      if (this.children.length === 0) {
        span.innerHTML = "\u00d7";
        this.appendChild(span);
      } else {
        this.innerHTML = "";
      }
      saveData();
    },
    false
  );
}

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
  localStorage.setItem("habit-data", habitTable.innerHTML);
}

function loadData() {
  todoList.innerHTML = localStorage.getItem("todo-data");
  // habitTable.innerHTML = localStorage.getItem("habit-data");
}

loadData();

// JOURNAL
const entryDate = document.querySelector(".entry-date");

entryDate.innerHTML =
  months[month] + " " + date.getDay() + ", " + date.getFullYear();
