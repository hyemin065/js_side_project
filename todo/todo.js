const form = document.querySelector(".todo_form");
const todoInput = document.querySelector(".todo_input");
const submitBtn = document.querySelector(".submit");
const content = document.querySelector(".content");
const clearBtn = document.querySelector(".clearAll");

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

console.log(itemsArray);
localStorage.setItem("items", JSON.stringify(itemsArray));

//todo 만들기
const createTodo = (text) => {
  console.log(text);
  const todoItem = document.createElement("div");
  const item = content.appendChild(todoItem);
  todoItem.classList.add("item");
  item.innerHTML = `
  <p class="todo_list_item">${text}</p>
  <input type="text" class="edit_input" value="${text}">
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
  }
};

//todo 지우기
const removeTodo = (e) => {
  const items = e.target.closest(".item");
  if (e.target.className === "remove") {
    items.remove();
  }
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
const submitLocalStorage = (e) => {
  e.preventDefault();
  itemsArray.push(todoInput.value);
  console.log(itemsArray);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  console.log(localStorage.getItem("items"));
  createTodo(todoInput.value);
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

const init = () => {
  itemsArray.forEach((item) => {
    console.log(item);
    createTodo(item);
  });
  clearBtn.addEventListener("click", clearLocalStorage);
  form.addEventListener("submit", submitLocalStorage);
  submitBtn.addEventListener("click", createTodo);
  content.addEventListener("click", editTodoMode);
  content.addEventListener("click", removeTodo);
  content.addEventListener("click", completeTodo);
};

init();
