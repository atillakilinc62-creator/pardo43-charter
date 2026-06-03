// ---- Durum (state) ----
const STORAGE_KEY = "todos";
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let filter = "all"; // all | active | done

// ---- DOM ----
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const list = document.getElementById("todo-list");
const filters = document.getElementById("filters");
const countEl = document.getElementById("count");
const clearBtn = document.getElementById("clear-done");
const dateEl = document.getElementById("date");

// ---- Yardımcılar ----
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

function getFiltered() {
  let result;
  if (filter === "active") result = todos.filter((t) => !t.done);
  else if (filter === "done") result = todos.filter((t) => t.done);
  else result = todos.slice();

  // Yapılacağı tarihe göre eskiden yeniye sırala (tarihsizler en sona)
  return result.sort((a, b) => {
    if (!a.due && !b.due) return b.id - a.id; // ikisi de tarihsiz → en son eklenen önce
    if (!a.due) return 1;
    if (!b.due) return -1;
    return a.due.localeCompare(b.due); // ISO tarih: küçük (erken) önce
  });
}

// ---- Render ----
function render() {
  const items = getFiltered();
  list.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "todo-list__empty";
    empty.textContent =
      filter === "done"
        ? "Henüz tamamlanan görev yok."
        : filter === "active"
        ? "Aktif görev yok. 🎉"
        : "Liste boş. İlk görevini ekle!";
    list.appendChild(empty);
  }

  items.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " is-done" : "");
    li.dataset.id = todo.id;

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "todo-item__check";
    check.checked = todo.done;
    check.addEventListener("change", () => toggle(todo.id));

    const body = document.createElement("div");
    body.className = "todo-item__body";

    const text = document.createElement("span");
    text.className = "todo-item__text";
    text.textContent = todo.text;
    body.appendChild(text);

    if (todo.due) {
      const due = document.createElement("span");
      due.className = "todo-item__date";
      due.textContent = "📅 " + formatDate(todo.due);
      if (!todo.done && isToday(todo.due)) {
        due.classList.add("is-overdue");
        due.textContent += " (bugün)";
      } else if (!todo.done && isOverdue(todo.due)) {
        due.classList.add("is-overdue");
        due.textContent += " (gecikmiş)";
      }
      body.appendChild(due);
    }

    const del = document.createElement("button");
    del.className = "todo-item__delete";
    del.innerHTML = "&times;";
    del.title = "Sil";
    del.addEventListener("click", () => remove(todo.id));

    li.append(check, body, del);
    list.appendChild(li);
  });

  const remaining = todos.filter((t) => !t.done).length;
  countEl.textContent = `${remaining} görev kaldı`;
}

// ---- İşlemler ----
function addTodo(text, due) {
  todos.unshift({ id: Date.now(), text, due: due || null, done: false });
  save();
  render();
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isOverdue(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(iso + "T00:00:00") < today;
}

function isToday(iso) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(iso + "T00:00:00").getTime() === today.getTime();
}

function toggle(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save();
  render();
}

function remove(id) {
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

function clearDone() {
  todos = todos.filter((t) => !t.done);
  save();
  render();
}

// ---- Olaylar ----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text, dateInput.value);
  input.value = "";
  dateInput.value = "";
  input.focus();
});

filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filters__btn");
  if (!btn) return;
  filter = btn.dataset.filter;
  document
    .querySelectorAll(".filters__btn")
    .forEach((b) => b.classList.toggle("is-active", b === btn));
  render();
});

clearBtn.addEventListener("click", clearDone);

// ---- Tarih ----
dateEl.textContent = new Date().toLocaleDateString("tr-TR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// ---- Başlat ----
render();
