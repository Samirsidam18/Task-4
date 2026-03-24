let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
  let input = document.getElementById("taskInput");
  if(input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks(){
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if(filter === "active") return !task.completed;
    if(filter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;
    if(task.completed) span.classList.add("completed");

    span.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.background = "red";

    delBtn.onclick = () => {
      tasks.splice(index,1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });

  updateStats();
}

function updateStats(){
  document.getElementById("total").textContent = tasks.length;
  document.getElementById("active").textContent = tasks.filter(t=>!t.completed).length;
  document.getElementById("completed").textContent = tasks.filter(t=>t.completed).length;
}

function setFilter(type){
  filter = type;

  document.querySelectorAll(".filters button").forEach(btn=>btn.classList.remove("active"));
  event.target.classList.add("active");

  renderTasks();
}

function clearCompleted(){
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

renderTasks();
