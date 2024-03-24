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
let numDays;
monthHeader.innerHTML = months[month];

function setHabitTableHeader(month) {
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
  }
}

let habitCheckbox = document.querySelectorAll(".habit-checkbox");
let habitData = {};

const habitInput = document.querySelector(".habit-input");

function addHabit() {
  if (habitInput.value === "") {
    alert("You must write something");
  } else {
    //creates the habit row with user input;
    habitData[habitInput.value] = [];
    newhabit = habitTable.insertRow();
    newhabit.innerHTML = habitInput.value;
    newhabit.classList.add("habit");
    //creates the cells depending on the amoutn of days in current month
    for (i = 0; i < numDays; i++) {
      let checkbox = newhabit.insertCell();
      checkbox.classList.add("habit-checkbox");
      checkbox.addEventListener("click", (e) => {
        e.target.classList.toggle("checked");

        //stores habit name and marked indexes using table
        let habitName = Object.keys(habitData);
        let index = e.target.cellIndex;
        let row = e.target.parentElement.rowIndex - 1;

        console.log(habitData[habitName[row]].includes(index));

        //adds index to habiData Dictionary if not there, else: delete the index in the library
        if (!habitData[habitName[row]].includes(index)) {
          habitData[habitName[row]].push(index);
        } else {
          habitData[habitName[row]].splice(
            habitData[habitName[row]].indexOf(index),
            1
          );
        }
        console.log(habitData);
      });
    }
  }
  habitInput.value = "";

  let habitName = Object.keys(habitData);
  console.log(habitData);
}

//updates array for localStorage saving later
// function updateCheckboxArray(i) {
//   const index = checkboxArray.indexOf(i);
//   if (index > -1) {
//     checkboxArray.splice(index, 1);
//   } else {
//     checkboxArray.push(i);
//   }
//   console.log(checkboxArray);
// }

//function to show saved habit data by toggling the saved indexes from localStorage
// function loadCheckbox() {
//   if (localStorage.getItem("habit-data")) {
//     checkboxArray = localStorage.getItem("habit-data").split(",");
//   }
//   for (i = 0; i < checkboxArray.length; i++) {
//     checkboxArray[i] = Number(checkboxArray[i]);
//     console.log(habitCheckbox[checkboxArray[i]]);
//     habitCheckbox[checkboxArray[i]].classList.toggle("checked");
//     let span = document.createElement("span");
//     span.innerHTML = "\u00d7";
//     habitCheckbox[checkboxArray[i]].appendChild(span);
//   }
// }

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
