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
let numDays = setNumDays();
monthHeader.innerHTML = months[month];

function setNumDays() {
  //sets up # of dates per month
  if (month < 5 && month % 2 == 0) {
    return 31;
  } else {
    return 30;
  }
}

function setHabitTableHeader(month) {
  for (let i = 0; i < numDays; i++) {
    //Header Dates
    const th = document.createElement("th");
    th.innerHTML = i + 1;
    habitDate.appendChild(th);
  }
}

const habitInput = document.querySelector(".habit-input");
let habitCheckbox = document.querySelectorAll(".habit-checkbox");
let habitData = {};

function addHabit() {
  if (habitInput.value === "") {
    alert("You must write something");
  } else {
    //creates the habit row with user input;
    habitData[habitInput.value] = [];
    let newHabit = habitTable.insertRow();
    let p = document.createElement("P");
    p.innerHTML = habitInput.value;
    p.classList.add("habit");
    newHabit.classList.add("habit-cell");
    newHabit.appendChild(p);
    createHabitCells(newHabit);
  }
  habitInput.value = "";
  saveHabitData();
}

//saves habitData to localStorage
function saveHabitData() {
  localStorage.setItem("habit-data", JSON.stringify(habitData));
}

function loadHabitData() {
  let data = localStorage.getItem("habit-data");
  habitData = JSON.parse(data);
  for (const key in habitData) {
    let habitCell = habitTable.insertRow();
    let p = document.createElement("P");
    p.innerHTML = key;
    p.classList.add("habit");
    habitCell.classList.add("habit-cell");
    habitCell.appendChild(p);
    createHabitCells(habitCell);
    //takes index numbers from habit-data and marks them as checked
    let row = Object.keys(habitData).indexOf(key);
    for (let index = 0; index < habitData[key].length; index++)
      habitTable.rows[row + 1].cells[habitData[key][index]].classList.toggle(
        "checked"
      );
  }
}

function createHabitCells(habitRow) {
  //creates the cells depending on the amount of days in current month
  for (let i = 0; i < numDays; i++) {
    let checkbox = habitRow.insertCell();
    checkbox.classList.add("habit-checkbox");
    //adds event listener to each cell
    checkbox.addEventListener("click", (e) => {
      e.target.classList.toggle("checked");

      //stores habit name and marked indexes using table
      let habitName = Object.keys(habitData);
      let index = e.target.cellIndex;
      let row = e.target.parentElement.rowIndex - 1;

      //adds index to habiData Dictionary if not there, else: delete the index in the library
      if (!habitData[habitName[row]].includes(index)) {
        habitData[habitName[row]].push(index);
      } else {
        habitData[habitName[row]].splice(
          habitData[habitName[row]].indexOf(index),
          1
        );
      }
      saveHabitData();
    });
  }
}

if (localStorage.getItem("habit-data")) loadHabitData();

//localStorage.clear();
// TODO-LIST

let todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".todo-input");

function addTodo() {
  if (inputTodo.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");
    todoList.appendChild(li);
    p.innerHTML = inputTodo.value;
    li.appendChild(p);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputTodo.value = "";
  saveTodoData();
}

todoList.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "P") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    saveTodoData();
  },
  false
);

function saveTodoData() {
  localStorage.setItem("todo-data", todoList.innerHTML);
  //localStorage.setItem("habit-data", checkboxArray);
}

function loadData() {
  todoList.innerHTML = localStorage.getItem("todo-data");
  //loadCheckbox();
}

// JOURNAL
const entryDate = document.querySelector(".entry-date");

entryDate.innerHTML =
  months[month] + " " + date.getDate() + ", " + date.getFullYear();

// INITIAL
setHabitTableHeader(month);
loadData();
