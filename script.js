// ۱. گرفتن عنصرها از HTML
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");

// ۲. آرایهای که همه کارها رو نگه میداره
let tasks = [];

// ۳. خواندن کارها از localStorage
function loadTasks() {
  const saved = localStorage.getItem("myTasks");

  if (saved) {
    tasks = JSON.parse(saved);
  }

  render();
}

// ۴. ذخیره کارها در localStorage
function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// ۵. کشیدن لیست روی صفحه
function render() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");

    if (task.done) {
      li.className = "done";
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // کلیک روی متن = تغییر وضعیت
    span.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      render();
    });

    // کلیک روی × = حذف
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      render();
    });
  });

  updateEmptyMsg();
}

// ۶. افزودن کار جدید
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("لطفاً یک کار بنویس!");
    return;
  }

  tasks.push({ text: text, done: false });

  saveTasks();
  render();

  taskInput.value = "";
}

// ۷. نمایش یا مخفی کردن پیام خالی
function updateEmptyMsg() {
  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}

// ۸. رویدادها
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// ۹. اجرای اولیه هنگام باز شدن صفحه
loadTasks();