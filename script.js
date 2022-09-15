'use strict'

// start here
const form = document.querySelector('#form')
const input = document.querySelector('.input')
const todosUL = document.querySelector('.todos')

// check local storage first
const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
  todos.forEach(todo => createTodo(todo))
}

form.addEventListener('submit', e => {
  e.preventDefault()

  createTodo()
})

function createTodo(todo) {
  let todoText = input.value

  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    const newTodo = document.createElement('li')
    if (todo && todo.completed) {
      newTodo.classList.add('completed')
    }

    newTodo.innerText = todoText

    newTodo.addEventListener('click', () => {
      newTodo.classList.toggle('completed')
      updateLS()
    })

    newTodo.addEventListener('contextmenu', e => {
      e.preventDefault()

      newTodo.remove()
      updateLS()
    })

    todosUL.appendChild(newTodo)

    input.value = ''

    updateLS()
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li')

  const todos = []

  todosEl.forEach(todo => {
    todos.push({
      text: todo.innerText,
      completed: todo.classList.contains('completed'),
    })
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}
