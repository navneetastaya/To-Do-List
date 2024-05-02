document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from local storage when the page loads
    var savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      savedTasks.forEach(function (task) {
        addTaskToList(task.text, task.completed);
      });
    }
  });

  // Function to add a new task to the list
  function addTaskToList(taskText, completed) {
    var listItem = document.createElement("li");
    listItem.className = "task-item";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.onchange = function () {
      taskTextNode.classList.toggle("completed", this.checked);
      saveTasks();
    };

    var taskTextNode = document.createElement("span");
    taskTextNode.className = "task-text";
    taskTextNode.textContent = taskText;
    if (completed) {
      taskTextNode.classList.add("completed");
    }

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.onclick = function () {
      listItem.remove();
      saveTasks();
    };

    listItem.appendChild(checkbox);
    listItem.appendChild(taskTextNode);
    listItem.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(listItem);
  }

  // Function to add a new task
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
      addTaskToList(taskText, false);
      taskInput.value = "";
      saveTasks();
    }
  }

  // Function to save tasks to local storage
  function saveTasks() {
    var tasks = [];
    var taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach(function (taskItem) {
      tasks.push({
        text: taskItem.querySelector(".task-text").textContent,
        completed: taskItem.querySelector("input[type='checkbox']").checked,
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    // Check if the input field is empty
    if (taskText === "") {
      alert("Please enter a task before adding!");
      return; // Exit the function if the input field is empty
    }

    // If input field is not empty, proceed to add task
    addTaskToList(taskText, false);
    taskInput.value = "";
    saveTasks();
  }