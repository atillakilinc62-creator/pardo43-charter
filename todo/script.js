// ---- Supabase ----
// anon key herkese açıktır (frontend için tasarlanmıştır), gizli değildir.
const SUPABASE_URL = "https://pdayfmklodldezpqkkzf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYXlmbWtsb2RsZGV6cHFra3pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDU0MzcsImV4cCI6MjA5NjA4MTQzN30.hoKC_be5uTmnB3X0uqlBrjP13nZ7DPFotYawCGprzN0";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Durum (state) ----
let todos = [];
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
function getFiltered() {
  let result;
  if (filter === "active") result = todos.filter((t) => !t.done);
  else if (filter === "done") result = todos.filter((t) => t.done);
  else result = todos.slice();

  // Yapılacağı tarihe göre eskiden yeniye sırala (tarihsizler en sona,
  // kendi aralarında en son eklenen üstte)
  return result.sort((a, b) => {
    if (!a.due && !b.due)
      return (b.inserted_at || "").localeCompare(a.inserted_at || "");
    if (!a.due) return 1;
    if (!b.due) return -1;
    return a.due.localeCompare(b.due); // ISO tarih: küçük (erken) önce
  });
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
    check.addEventListener("change", () => toggle(todo.id, check.checked));

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

// ---- Veri işlemleri (Supabase REST) ----
async function load() {
  countEl.textContent = "Yükleniyor…";
  const { data, error } = await db.from("todos").select("*");
  if (error) return fail("Yüklenemedi", error);
  todos = data || [];
  render();
}

async function addTodo(text, due) {
  const { error } = await db.from("todos").insert({ text, due: due || null });
  if (error) return fail("Eklenemedi", error);
  await load();
}

async function toggle(id, done) {
  const { error } = await db.from("todos").update({ done }).eq("id", id);
  if (error) return fail("Güncellenemedi", error);
  await load();
}

async function remove(id) {
  const { error } = await db.from("todos").delete().eq("id", id);
  if (error) return fail("Silinemedi", error);
  await load();
}

async function clearDone() {
  const { error } = await db.from("todos").delete().eq("done", true);
  if (error) return fail("Silinemedi", error);
  await load();
}

function fail(msg, error) {
  console.error(msg, error);
  countEl.textContent = "⚠️ " + msg;
}

// ---- Olaylar ----
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  const due = dateInput.value;
  dateInput.value = "";
  input.focus();
  await addTodo(text, due);
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
load();
