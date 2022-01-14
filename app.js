let form = document.querySelector('.form')
let tasklist = document.querySelector('.task-items')
let del_btn = document.querySelector('.button2')
let input_text = document.querySelector('.input_text')


// load all eventlisters
loadEventListeners()


function loadEventListeners() {
    // get already saved task from local storage
    document.addEventListener('DOMContentLoaded', getToDo)
        // add task
    form.addEventListener('submit', addTask)
        // delete specific task on click
    tasklist.addEventListener('click', delTask)
        // delete all task
    del_btn.addEventListener('click', delAllTask)
}

function getToDo() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        let li = document.createElement('li');
        // add class
        li.className = "items";
        // create text node 
        li.appendChild(document.createTextNode(todo));
        // add link so users can click on task
        let link = document.createElement('a')
            // add className
        link.className = 'single-delete-item'
            // add icon html
        link.innerHTML = "<button class='delete'>Remove</button>"
            // to append new to do list task
        li.appendChild(link)
            // to append li to parent ul
        tasklist.appendChild(li)
        console.log(li)
    });

}

function addTask(param) {
    if (input_text.value == '') {
        alert('Add a Task')
    } else {
        // create list item
        let li = document.createElement('li');
        // add class
        li.className = "items";
        // create text node 
        li.appendChild(document.createTextNode(input_text.value));
        // add link so users can click on task
        let link = document.createElement('a')
            // add className
        link.className = 'single-delete-item'
            // add icon html
        link.innerHTML = "<button class='delete'>Remove</button>"
            // to append new to do list task
        li.appendChild(link)
            // to append li to parent ul
        tasklist.appendChild(li)
        console.log(li)
    }
    storeToDoInStorage(input_text.value)
    input_text.value = '';
    param.preventDefault();
}


function delTask(param) {
    if (param.target.parentElement.classList.contains('single-delete-item')) {
        if (confirm('Do you want to delete this task')) {
            param.target.parentElement.parentElement.remove()
            removeToDoFromLocalStorage(param.target.parentElement.parentElement)
        }
    }
}

function delAllTask() {
    if (confirm('Do you want delete all taks')) {
        tasklist.innerHTML = ''
        clearTaskFromStorage()
    }
}

function storeToDoInStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function removeToDoFromLocalStorage(todoItem) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log('parsing')
    }
    todos.forEach(function(todo, index) {

        if (todoItem.textContent === todo + 'Remove') {
            console.log('same content')
            todos.splice(index, 1);
        }
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}

function clearTaskFromStorage() {
    localStorage.clear()
}