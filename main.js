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

//GRATITUDE references
const inputGratitude = document.querySelector(".gratitude-input");
const gratitudeList = document.querySelector(".gratitude-list");
let gratitudeData = [];
if (localStorage.getItem("gratitude-data"))
  gratitudeData = JSON.parse(localStorage.getItem("gratitude-data"));

//TODO references
const todoContainer = document.querySelector(".todo-container");
let todoData = {};
if (localStorage.getItem("todo-data"))
  todoData = JSON.parse(localStorage.getItem("todo-data"));
const todoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".todo-input");

//GOAL references
const goalInput = document.querySelector(".goal-input");
const goalStatement = document.querySelector(".goal-statement");
let goalData = "";
if (localStorage.getItem("goal-Data"))
  goalData = localStorage.getItem("goal-data");

//JOURNAL references
const entryDate = document.querySelector(".entry-date");
const entryText = document.querySelector(".entry-text");
const entryButton = document.querySelector(".entry-button");
let entry;

//MONTHLY DATA OBJECT
let monthlyData = {
  _habitData: {},
  _dailyData: {},
};

if (localStorage.getItem("monthly-data"))
  monthlyData = JSON.parse(localStorage.getItem("monthly-data"));

if (localStorage.getItem("entry-data"))
  entry = localStorage.getItem("entry-data");

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
let DATE = new Date();
let date = DATE.getDate();
let month = months[DATE.getMonth()];
let numDays = setNumDays();
monthHeader.innerHTML = month;

function checkDate(date) {
  if (!localStorage.getItem("date")) localStorage.setItem("date", date);
  else {
    if (date !== Number(localStorage.getItem("date"))) {
      //SAVE REMINDERS DATA AND JOURNAL ENTRY
      monthlyData._dailyData[localStorage.getItem("date")] = {
        _gratitudeData: gratitudeData,
        _todoData: todoData,
        _goal: goalData,
        _journalEntry: entry,
      };

      localStorage.setItem("monthly-data", JSON.stringify(monthlyData));

      localStorage.setItem("date", date);

      //CLEAR DAILY REMINDERS
      localStorage.setItem("todo-data", "");
      localStorage.setItem("gratitude-data", "");
      localStorage.setItem("entry-data", "");

      gratitudeData = [];
      todoData = {};
    }
  }
}

function checkMonth(month) {
  if (!localStorage.getItem("month")) localStorage.setItem("month", month);
  else {
    if (month !== localStorage.getItem("month")) {
      //SAVE DATA OF THE WHOLE MONTH
      monthlyData._month = localStorage.getItem("month");
      monthlyData._habitData = habitData;
      localStorage.setItem("monthly-data", JSON.stringify(monthlyData));

      //CLEAR HABIT LIST
      for (const key in habitData) {
        habitData[key] = [];
      }

      localStorage.setItem("month", month);
      console.log("Month Changed");
    }
  }
  saveHabitData();
}

function setNumDays() {
  //sets up # of dates per month
  if (DATE.getMonth() < 5 && DATE.getMonth() % 2 == 0) {
    return 31;
  } else {
    return 30;
  }
}

//HABIT TRACKER

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

//GRATITUDE LIST

function addGratitude() {
  if (inputGratitude.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");
    gratitudeList.appendChild(li);
    p.innerHTML = inputGratitude.value;
    gratitudeData.push(inputGratitude.value);
    li.appendChild(p);
  }
  inputGratitude.value = "";
  saveGratitudeData();
}

function saveGratitudeData() {
  localStorage.setItem("gratitude-data", JSON.stringify(gratitudeData));
}

function loadGratitudeData() {
  if (gratitudeData) {
    gratitudeData.forEach((gratitude) => {
      let li = document.createElement("li");
      let p = document.createElement("p");
      gratitudeList.appendChild(li);
      p.innerHTML = gratitude;
      li.appendChild(p);
      saveGratitudeData();
    });
  }
}
// TODO LIST

function addTodo() {
  if (inputTodo.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let p = document.createElement("p");
    todoList.appendChild(li);
    p.innerHTML = inputTodo.value;
    todoData[inputTodo.value] = false;
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
    let li = e.target.closest("li");
    let node = Array.from(li.closest("ul").children);
    let index = node.indexOf(li);
    if (e.target.tagName === "P") {
      e.target.classList.toggle("checked");
      todoData[Object.keys(todoData)[index]] =
        !todoData[Object.keys(todoData)[index]];
      console.log(todoData[Object.keys(todoData)[index]]);
    } else if (e.target.tagName === "SPAN") {
      //REMOVES FROM STORED DATA
      delete todoData[Object.keys(todoData)[index]];
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
    for (todo in todoData) {
      let li = document.createElement("li");
      let p = document.createElement("p");
      todoList.appendChild(li);
      p.innerHTML = todo;
      li.appendChild(p);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
      saveTodoData();
      //LOADS TODO CHECKS FOR APPROPRIATE TASKS
      if (todoData[todo]) p.classList.add("checked");
    }
  }
}

//GOAL

function setGoal() {
  console.log("goal changed");
  goalStatement.innerHTML = goalInput.value;
  localStorage.setItem("goal-data", goalInput.value);
  goalInput.value = "";
}

function loadGoalData() {
  goalStatement.innerHTML = localStorage.getItem("goal-data");
}

//JOURNAL ENTRY
entryText;

entryDate.innerHTML = month + " " + DATE.getDate() + ", " + DATE.getFullYear();

function submitEntry() {
  localStorage.setItem("entry-data", entryText.value);
}

function loadEntryData() {
  entryText.value = entry;
}

//INITIAL FUNCTIONS

function loadData() {
  if (localStorage.getItem("habit-data")) loadHabitData();
  if (localStorage.getItem("todo-data")) loadTodoData();
  if (localStorage.getItem("entry-data")) loadEntryData();
  if (localStorage.getItem("goal-data")) loadGoalData();
  if (localStorage.getItem("gratitude-data")) loadGratitudeData();
}

// INITIAL
checkDate(date);
checkMonth(month);
setHabitTableHeader(month);
loadData();
