// HABIT TRACKER
const monthHeader = document.querySelector(".month-header");
const habitTable = document.querySelector(".habit-table");
const habitDate = document.querySelector(".habit-date");
const habit = document.querySelectorAll(".habit");
const habitAmount = habit.length;

// localStorage.clear();

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

let date = new Date();
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
let checkboxArray = [];
let arr = ["amog", "us"];

for (let i = 0; i < habitCheckbox.length; i++) {
  habitCheckbox[i].addEventListener(
    "click",
    function () {
      this.classList.toggle("checked");
      updateCheckboxArray(i);
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

const habitInput = document.querySelector(".habit-input");

function addHabit() {
  if (habitInput.value === "") {
    alert("You must write something");
  } else {
    let tr = document.createElement("tr");
    tr.classList.add("habit");
    habitTable.appendChild(tr);
    let td = document.createElement("td");
    td.innerHTML = habitInput.value;
    tr.appendChild(td);
  }
  habitInput.value = "";
  saveData();
  loadCheckbox();
}

//updates array for localStorage saving later
function updateCheckboxArray(i) {
  const index = checkboxArray.indexOf(i);
  if (index > -1) {
    checkboxArray.splice(index, 1);
  } else {
    checkboxArray.push(i);
  }
  console.log(checkboxArray);
  console.log(arr);
}

//function to show saved habit data by toggling the saved indexes from localStorage
function loadCheckbox() {
  if (localStorage.getItem("habit-data")) {
    checkboxArray = localStorage.getItem("habit-data").split(",");
  }
  for (i = 0; i < checkboxArray.length; i++) {
    checkboxArray[i] = Number(checkboxArray[i]);
    console.log(habitCheckbox[checkboxArray[i]]);
    habitCheckbox[checkboxArray[i]].classList.toggle("checked");
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    habitCheckbox[checkboxArray[i]].appendChild(span);
  }
}

// TODO-LIST

let todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".todo-input");

function addTodo() {
  if (inputTodo.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputTodo.value;
    todoList.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputTodo.value = "";
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
  localStorage.setItem("habit-data", checkboxArray);
}

function loadData() {
  todoList.innerHTML = localStorage.getItem("todo-data");
  loadCheckbox();
}

loadData();

// JOURNAL
const entryDate = document.querySelector(".entry-date");

entryDate.innerHTML =
  months[month] + " " + date.getDate() + ", " + date.getFullYear();
