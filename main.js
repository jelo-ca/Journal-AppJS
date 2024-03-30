// HABIT references
const monthHeader = document.querySelector(".month-header");
const habitTable = document.querySelector(".habit-table");
const habitDate = document.querySelector(".habit-date");
const habit = document.querySelectorAll(".habit");
const habitAmount = habit.length;
const habitInput = document.querySelector(".habit-input");
let habitCheckbox = document.querySelectorAll(".habit-checkbox");
let habitData = {};
habitData = JSON.parse(localStorage.getItem("habit-data"));

//Todo references
let todoContainer = document.querySelector(".todo-container");
let todoData = [];
if (localStorage.getItem("todo-data"))
  todoData = JSON.parse(localStorage.getItem("todo-data"));
const todoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".todo-input");

//JOURNAL references
const entryDate = document.querySelector(".entry-date");

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

//Date references
let date = new Date();
let day = date.getDay();
let month = months[date.getMonth()];
let numDays = setNumDays();
monthHeader.innerHTML = month;

function checkDay(day) {
  if (!localStorage.getItem("day")) localStorage.setItem("day", day);
  else {
    if (day !== Number(localStorage.getItem("day"))) {
      localStorage.setItem("day", day);
      //SAVE REMINDERS

      //CLEAR DAILY REMINDERS
      localStorage.setItem("todo-data", "");
    }
  }
}

function checkMonth(month) {
  if (!localStorage.getItem("month")) localStorage.setItem("month", month);
  else {
    if (month !== localStorage.getItem("month")) {
      //CLEAR HABIT LIST
      for (const key in habitData) {
        habitData[key] = [];
      }
      //SAVE DATA OF THE WHOLE MONTH
      localStorage.setItem("month", month);
      console.log("Month Changed");
    }
  }
  saveHabitData();
}

function setNumDays() {
  //sets up # of dates per month
  if (date.getMonth() < 5 && date.getMonth() % 2 == 0) {
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

function addHabit() {
  if (habitInput.value === "") {
    alert("You must write something");
  } else {
    //creates the habit row with user input;
    habitData[habitInput.value] = [];
    let newHabit = habitTable.insertRow();
    //adds habitName
    let p = document.createElement("P");
    p.innerHTML = habitInput.value;
    p.classList.add("habit");
    p.addEventListener("click", (e) => deleteHabit(e));

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
  for (const key in habitData) {
    let habitCell = habitTable.insertRow();
    let p = document.createElement("P");
    p.innerHTML = key;
    p.classList.add("habit");
    p.addEventListener("click", (e) => deleteHabit(e));
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

function deleteHabit(e) {
  e.target.parentElement.remove();
  delete habitData[e.target.innerHTML];
  saveHabitData();
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
      // let span = document.createElement("span");
      // span.innerHTML = "\u00d7";      //MARKS X on habit
      // e.target.appendChild(span);

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

// TODO-LIST

function addTodo() {
  if (inputTodo.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");
    todoList.appendChild(li);
    p.innerHTML = inputTodo.value;
    todoData.push(inputTodo.value);
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
      //REMOVES FROM STORED DATA
      let li = e.target.closest("li");
      let node = Array.from(li.closest("ul").children);
      let index = node.indexOf(li);
      todoData.splice(index, 1);
      //REMOVES FROM PAGE
      e.target.parentElement.remove();
    }
    saveTodoData();
  },
  false
);

function saveTodoData() {
  localStorage.setItem("todo-data", JSON.stringify(todoData));
}

function loadTodoData() {
  if (todoData) {
    todoData.forEach((todo) => {
      let li = document.createElement("li");
      let p = document.createElement("p");
      todoList.appendChild(li);
      p.innerHTML = todo;
      li.appendChild(p);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
      saveTodoData();
    });
  }
}

function loadData() {
  if (localStorage.getItem("todo-data")) loadTodoData();
  if (localStorage.getItem("habit-data")) loadHabitData();
}

// JOURNAL
entryDate.innerHTML = month + " " + date.getDate() + ", " + date.getFullYear();

// INITIAL
checkDay(day);
checkMonth(month);
setHabitTableHeader(month);
loadData();
