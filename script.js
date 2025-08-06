let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.innerText = task.text;

    // ✅ Button
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✅";
    completeBtn.title = "Mark as complete";
    completeBtn.onclick = () => toggleComplete(index);

    // ❌ Button
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.title = "Delete task";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(completeBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

document.getElementById("task-form").addEventListener("submit", addTask);
renderTasks();
