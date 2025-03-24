var todoInput = document.getElementById('todo-input');
var addBtn = document.getElementById('add-btn');
var todoList = document.getElementById('todo-list');
var allFilter = document.getElementById('all-filter');
var completeFilter = document.getElementById('complete-filter');
var uncompleteFilter = document.getElementById('uncomplete-filter');
var deleteAllBtn = document.getElementById('delete-all');

var todos = [];

function saveTodos() {
    localStorage.setItem('myTodos', JSON.stringify(todos));
}

function loadTodos() {
    var savedTodos = localStorage.getItem('myTodos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        showTodos();
    }
}

function addTodo() {
    var todoText = todoInput.value.trim();

    if (todoText == '') {
        alert('Please enter a todo!');
        return;
    }

    var todo = {
        text: todoText,
        completed: false
    };

    todos.push(todo);

    todoInput.value = '';

    saveTodos();
    showTodos();
}

function showTodos() {
    todoList.innerHTML = '';

    todos.forEach(function (todo, index) {
        var li = document.createElement('li');
        li.className = 'todo-item';

        if (todo.completed) {
            li.classList.add('completed');
        }

        var span = document.createElement('span');
        span.textContent = todo.text;

        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = function () {
            todos.splice(index, 1);
            saveTodos();
            showTodos();
        };

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onchange = function () {
            todo.completed = !todo.completed;
            saveTodos();
            showTodos();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

function filterTodos(type) {
    allFilter.classList.remove('active');
    completeFilter.classList.remove('active');
    uncompleteFilter.classList.remove('active');

    todoList.innerHTML = '';

    todos.forEach(function (todo) {
        if (type === 'all') {
            showTodos();
            allFilter.classList.add('active');
        } else if (type === 'complete' && todo.completed) {
            addFilteredTodoToList(todo);
            completeFilter.classList.add('active');
        } else if (type === 'uncomplete' && !todo.completed) {
            addFilteredTodoToList(todo);
            uncompleteFilter.classList.add('active');
        }
    });
}

function addFilteredTodoToList(todo) {
    var li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    var span = document.createElement('span');
    span.textContent = todo.text;

    li.appendChild(span);
    todoList.appendChild(li);
}

function deleteAllTodos() {
    var confirmDelete = confirm('Are you sure you want to delete all todos?');

    if (confirmDelete) {
        todos = [];
        saveTodos();
        showTodos();
    }
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
allFilter.addEventListener('click', function () {
    filterTodos('all');
});
completeFilter.addEventListener('click', function () {
    filterTodos('complete');
});
uncompleteFilter.addEventListener('click', function () {
    filterTodos('uncomplete');
});
deleteAllBtn.addEventListener('click', deleteAllTodos);

loadTodos();