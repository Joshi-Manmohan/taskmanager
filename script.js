// Variables
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = []; // Task list ko store karne ke liye

// Task add karne ki function
function addTask(taskText) {
  const task = {
    id: Date.now(),   // Unique id ke liye
    text: taskText,
    completed: false, // Initially task incomplete hoga
  };
  tasks.push(task);  // Task ko array mein add kar lo
  renderTasks();    // Phir se task list ko render karo
  taskInput.value = "";  // Input field ko clear kar do
}

// Task ko complete ya incomplete karna
function toggleTaskCompletion(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;  // Task ka status toggle karo
  renderTasks();
}

// Task delete karna
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);  // Task ko array se remove karo
  renderTasks();
}

// Task render (display) karne ki function
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  // Filter karke tasks ko display karna (Active, Completed, ya All)
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTaskCompletion(${task.id})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Event listeners (buttons ko interact karne ke liye)
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);  // Jab user add task pe click kare
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);  // Enter key dabane par bhi task add ho jayega
    }
  }
});

// Filter buttons par click hone par filter lagana
filterButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;  // Jo filter button dabaya gaya uska value
    renderTasks(filter);  // Filter laga kar tasks ko render karo
  });
});
