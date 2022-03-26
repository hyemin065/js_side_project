const submitBtn = document.querySelector(".submit");
const todoInput = document.querySelector(".todo_input");
const content = document.querySelector(".content");

const insertList = (e) => {
  e.preventDefault();
  const todoItem = document.createElement("div");
  const item = content.appendChild(todoItem);
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

  localStorageTodo(todoInput.value);
};

const localStorageTodo = (text) => {
  console.log(text);
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
    console.log(items);
  } else {
    items = JSON.parse(localStorage.getItem("items"));
    console.log(items);
  }
  items.push(text);
  console.log(items);
  localStorage.setItem("items", JSON.stringify(items));
};

submitBtn.addEventListener("click", insertList);
