

const TodoForm = document.querySelector("form");
const TodoInput = document.getElementById("todo-input");
const TodoListUl = document.getElementById("todo-list");
let allTodos = getTodos();
updateTodoList();

TodoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = TodoInput.value.trim();

    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        TodoInput.value = "";
    }
}

function updateTodoList() {
    TodoListUl.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        TodoListUl.appendChild(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = `todo-${todoIndex}`;
    const todoli = document.createElement("li");
    todoli.className = "todo";
    todoli.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? "checked" : ""}>
        <label for="${todoId}" class="custom-checkbox">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                width="24px" fill="#e8eaed">
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todo.text}
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
            </svg>
        </button>
    `;
    const deleteButton = todoli.querySelector(".delete-button");
    deleteButton.addEventListener("click", function () {
        deleteTodoItem(todoIndex);
    });
    const checkbox = todoli.querySelector("input");
    checkbox.addEventListener("change", function () {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    return todoli;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, index) => index !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}

function getTodos() {
    const todos = localStorage.getItem("todos");
    return JSON.parse(todos) || [];
}
