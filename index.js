// Variables & Arrays
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// DOM Elements
const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Event: Add task
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();

    // Conditionals
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Objects (Optional)
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasksToLocalStorage();
    taskInput.value = "";
    renderTasks();
});

// Function: Render tasks (Loops + DOM Manipulation)
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task";
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(${task.id})">✓</button>
                <button onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Function: Toggle complete status
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });

    saveTasksToLocalStorage();
    renderTasks();
}

// Function: Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage();
    renderTasks();
}

// Function: Save tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial render
renderTasks();
