import axios from "axios";
import { fetchData, logOut } from "./utils/getInfo";
import "../todo.css";

const token = localStorage.getItem("token");
const apiUrl = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

var userInformation = {};
window.addEventListener("load", (e) => {
  const checkToken = localStorage.getItem("token");
  if (!checkToken) {
    window.location.replace(window.location.origin + "/index.html");
  }
});
const check = async () => {
  const result = await fetchData();
  userInformation = result.data;
  console.log("Hey " + userInformation.name);
};
check();
// All declarations and initializations
var btn = document.querySelector(".drpdown");
var btnLogout = document.querySelector("#logout");
const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#progress-count");
const doneCount = document.querySelector("#done-count");
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const todoList = document.querySelector("#todo-list");
const progressList = document.querySelector("#progress-list");
const doneList = document.querySelector("#done-list");
const statusSection = document.querySelector("#status-section");
const infoBox = document.querySelector(".info");
const taskDescription = document.querySelector(".task-description");
const taskState = document.querySelector("#taskState");
const reminderDate = document.querySelector("#reminder-date");
const submitBtn = document.querySelector(".submitBtn");
// Event listener on whole document for click
// document.addEventListener("click", () => {
//     if (statusSection.classList.contains("blur")) {
//         statusSection.classList.remove("blur");
//         infoBox.style.display = "none";
//     }
// });

// Dropdown for logout

btn.addEventListener("click", () => {
  if (btnLogout.style.visibility === "visible")
    btnLogout.style.visibility = "hidden";
  else btnLogout.style.visibility = "visible";
});

// To update TODO count, Progress count and Done count when a task is dragged to another list

setInterval(() => {
  todoCount.textContent = todoList.childElementCount;
  progressCount.textContent = progressList.childElementCount;
  doneCount.textContent = doneList.childElementCount;
}, 100);

// Drag and drop behaviour

draggables.forEach((draggable) => {
  // Adding a blur effect on whole section when we click on any task for its details
  draggable.addEventListener("click", (e) => {
    if (statusSection.classList.contains("blur")) {
      statusSection.classList.remove("blur");
      infoBox.style.display = "none";
    } else {
      statusSection.classList += " blur";
      infoBox.style.display = "block";
      if (e.target.classList.contains("todo-list-items")) {
        infoBox.style.background = "maroon";
        infoBox.style.color = "white";
      } else if (e.target.classList.contains("progress-list-items")) {
        infoBox.style.background = "rgb(235, 235, 4)";
        infoBox.style.color = "black";
      } else {
        infoBox.style.background = "green";
        infoBox.style.color = "white";
      }
    }
  });

  draggable.addEventListener("dragstart", () => {
    setTimeout(() => {
      draggable.classList.add("hide");
    }, 0);
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("hide");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // In the below line we have used the fact that when an element starts dragging, we have added a class to it i.e. hide class and this class in only present in the element which is being dragged.
    const currentDraggable = document.querySelector(".hide");
    // Here, we are checking if the container in which we are dropping, contains container class or not beacuse container class is only present in the divs which contain all the items i.e. todo, progress or done at a particular time
    if (e.target.classList.contains("container")) {
      e.target.append(currentDraggable);
    }
  });

  container.addEventListener("drop", (e) => {
    const currentDraggable = document.querySelector(".hide");
    if (e.target.classList.contains("container")) {
      const targetID = e.target.id;
      currentDraggable.classList = "draggable " + targetID + "-items";
    }
  });
});

/* 5/11/20 */
submitBtn.addEventListener("click", (e) => {
  let val, des, date;
  e.preventDefault();
  des = taskDescription.value;
  if (document.getElementById("taskState1").checked) {
    val = document.getElementById("taskState1").value;
  } else if (document.getElementById("taskState2").checked) {
    val = document.getElementById("taskState2").value;
  } else if (document.getElementById("taskState3").checked) {
    val = document.getElementById("taskState3").value;
  }
  date = formattingDate(reminderDate.value);

  if (val === "notComplete") {
    postTask(des, 0, date);
  } else if (val === "inProgress") {
    postTask(des, 1, date);
  } else if (val === "completed") {
    postTask(des, 2, date);
  }

  insertHtml(des, val);
  clearFields();
});

function formattingDate(date) {
  let arr = date.split("-");
  return `${arr[1]}-${arr[2]}-${arr[0]}`;
}

function insertHtml(des, val) {
  let html;
  if (val === "notCompleted") {
    html = `<div
            class="draggable todo-list-items"
            id="todo-item-1"
            draggable="true"
          >
            ${des}
          </div>`;
  } else if (val === "inProgress") {
    html = `<div
            class="draggable progress-list-items"
            id="progress-item-1"
            draggable="true"
          >
            ${des}
          </div>`;
  } else if (val === "completed") {
    html = `<div
            class="draggable done-list-items"
            id="done-item-1"
            draggable="true"
          >
            ${des}
          </div>`;
  }

  if (html.includes("todo-list-items")) {
    todoList.insertAdjacentHTML("beforeend", html);
  } else if (html.includes("progress-list-items")) {
    progressList.insertAdjacentHTML("beforeend", html);
  } else if (html.includes("done-list-items")) {
    doneList.insertAdjacentHTML("beforeend", html);
  }
}

function clearFields() {
  taskDescription.value = "";
  reminderDate.value = "";
  document.getElementById("taskState1").checked = true;
}

//POST Request

const postTask = async (des, val, date) => {
  try {
    const res = await axios.post(apiUrl + "/tasks", {
      description: des,
      dueDate: date,
      taskState: val,
    });
  } catch {
    console.log("Error Occured!");
  }
};
