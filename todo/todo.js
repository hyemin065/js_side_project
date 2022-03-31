const form = document.querySelector(".todo_form");
const todoInput = document.querySelector(".todo_input");
const submitBtn = document.querySelector(".submit");
const content = document.querySelector(".content");
const clearBtn = document.querySelector(".clearAll");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

//todo 만들기
const createTodo = (e) => {
  e.preventDefault();

  const todoItem = document.createElement("div");
  const item = content.appendChild(todoItem);
  todoItem.id = Math.floor(Math.random() * 100);
  todoItem.classList.add("item");
  item.innerHTML = `
    <p class="todo_list_item">${todoInput.value}</p>
    <input type="text" class="edit_input" value="${todoInput.value}">
    <div class="contents_buttons">
      <button type="button" class="complete">완료</button>
      <button type="button" class="edit">수정</button>
      <button type="button" class="remove">삭제</button>
    </div>
      <div class="edit_buttons">
      <button type="button" class="confirm">확인</button>
      <button type="button" class="close">취소</button>
    </div>
  `;
  submitLocalStorage(todoInput.value, todoItem.id);
};

//todo 수정
const editTodoMode = (e) => {
  const items = e.target.closest(".item");
  const contentsBtn = items.querySelector(".contents_buttons");
  const editBtn = items.querySelector(".edit_buttons");
  const editInput = items.querySelector(".edit_input");
  const todoListItem = items.querySelector(".todo_list_item");

  if (e.target.className === "edit") {
    contentsBtn.style.display = "none";
    editBtn.style.display = "block";
    todoListItem.style.display = "none";
    editInput.style.display = "block";
  }

  if (e.target.className === "close") {
    contentsBtn.style.display = "block";
    editBtn.style.display = "none";
    todoListItem.style.display = "block";
    editInput.style.display = "none";
    editInput.value = todoListItem.innerText;
  }

  if (e.target.className === "confirm") {
    todoListItem.innerText = editInput.value;
    contentsBtn.style.display = "block";
    editBtn.style.display = "none";
    todoListItem.style.display = "block";
    editInput.style.display = "none";
    itemsArray.map((item) => {
      if (item.id == items.id) {
        item.text = editInput.value;
      } else {
        item.text;
      }
      return item.text;
    });
  }
};

//todo 지우기
const removeTodo = (e) => {
  const items = e.target.closest(".item");
  const editInput = items.querySelector(".edit_input");

  if (e.target.className === "remove") {
    items.remove();
    let idx = itemsArray.findIndex((item) => {
      return item.text == editInput.value;
    });
    itemsArray.splice(idx, 1);
  }
  localStorage.setItem("items", JSON.stringify(itemsArray));
};

//todo 완료
const completeTodo = (e) => {
  const items = e.target.closest(".item");
  const todoListItem = items.querySelector(".todo_list_item");
  if (e.target.className === "complete") {
    todoListItem.classList.toggle("red");
  }
};

//로컬스토리지에 저장
const submitLocalStorage = (text, id) => {
  itemsArray.push({ text: text, id: id });
  localStorage.setItem("items", JSON.stringify(itemsArray));

  todoInput.value = "";
};

//로컬 스토리지 비우기
const clearLocalStorage = () => {
  localStorage.clear();
  itemsArray = [];
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
};

const getTodo = () => {
  itemsArray.map((items) => {
    const todoItem = document.createElement("div");
    const item = content.appendChild(todoItem);
    todoItem.id = items.id;
    todoItem.classList.add("item");
    item.innerHTML = `
    <p class="todo_list_item">${items.text}</p>
    <input type="text" class="edit_input" value="${items.text}">
    <div class="contents_buttons">
      <button type="button" class="complete">완료</button>
      <button type="button" class="edit">수정</button>
      <button type="button" class="remove">삭제</button>
    </div>
      <div class="edit_buttons">
      <button type="button" class="confirm">확인</button>
      <button type="button" class="close">취소</button>
    </div>
  `;
  });
};

const init = () => {
  document.addEventListener("DOMContentLoaded", getTodo);
  submitBtn.addEventListener("click", createTodo);
  clearBtn.addEventListener("click", clearLocalStorage);
  content.addEventListener("click", editTodoMode);
  content.addEventListener("click", removeTodo);
  content.addEventListener("click", completeTodo);
};

init();
