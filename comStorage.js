const formAdd = document.querySelector('.form__add')
const ul = document.querySelector('.lista')
const formSearch = document.querySelector('.form__search')


const addTask = inputValue => {
    return `
        <li class="lista__li" data-todo="${inputValue}">
            <div class="text">
                <input type="checkbox" class="check__input">
                <span class="span__task">${inputValue}</span>
            </div>
            
            <div class="icons">
                <i class="far fa-edit edit__icon" data-edit="${inputValue}"></i>
                <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
            </div>
        </li>
    `
}

const toggleCheck = event => {
    const check = event.target.checked
    const taskItem = event.target.parentElement
    const checkbox = event.target

    if(check){
        taskItem.classList.add('check')
        checkbox.setAttribute("checked", "checked")
        saveData()

    }else{
        taskItem.classList.remove('check')
        checkbox.removeAttribute("checked")
        saveData()
    }
}

const saveData = () => {
    const lis = Array.from(document.querySelectorAll('li'))
    const taskAndChecked = lis.map(li => {
        const task = li.dataset.todo
        const checked = li.querySelector('.check__input').hasAttribute('checked')

        return { task, checked }
    })
    
    localStorage.setItem('tasks', JSON.stringify(taskAndChecked))
}

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'))

    if(tasks){
        tasks.forEach((task) => {
            ul.innerHTML += addTask(task.task)
    
            if(task.checked){
                const taskItem = ul.querySelector(`[data-todo="${task.task}"]`)
                const checkbox = taskItem.querySelector('.check__input')
                const li = taskItem.querySelector('.text')
                checkbox.setAttribute("checked", "checked")
                li.classList.add('check')
            }
        })
    }
}

const editTask = taskToEdit => {
    const taskText = taskToEdit.textContent
    const liDaTask = taskToEdit.parentNode.parentNode
    
    const inputEdit = document.createElement('input')
    inputEdit.type = 'text'
    inputEdit.className = 'edit__input'
    inputEdit.value = taskText

    taskToEdit.replaceWith(inputEdit)

    inputEdit.addEventListener('keypress', event => {
        if(event.key === 'Enter'){
            taskToEdit.textContent = inputEdit.value 

            inputEdit.replaceWith(taskToEdit)

            liDaTask.setAttribute('data-todo', taskToEdit.textContent)
            liDaTask.setAttribute('data-trash', taskToEdit.textContent)
            liDaTask.setAttribute('data-edit', taskToEdit.textContent)
            saveData()
        }
    })
}


const ulControler = event =>{
    const clickTrash = event.target.dataset.trash
    const clickEdit = event.target.dataset.edit
    const taskToDelete = document.querySelector(`[data-todo="${clickTrash}"]`)
    const taskToEdit = document.querySelector(`[data-todo="${clickEdit}"] .span__task`)


    toggleCheck(event)

    if(clickTrash){
        taskToDelete.remove()
        saveData()
    }

    if(clickEdit){
        editTask(taskToEdit);
    }
}

const formControler = event => {
    event.preventDefault()
    const inputValue = event.target.addTask.value

    if(inputValue){
        ul.innerHTML += addTask(inputValue)
    }

    event.target.reset()
    saveData()
}

const search = event => {
    const inputSearchValue = event.target.value.trim().toLowerCase()
    const allLi = Array.from(ul.children)

    const filteredTask = allLi.filter(task => task.textContent.toLowerCase().includes(inputSearchValue))
    const filteredTaskNot = allLi.filter(task => !task.textContent.toLowerCase().includes(inputSearchValue))

    filteredTask.forEach(task => task.classList.remove('hidden'))
    filteredTaskNot.forEach(task => task.classList.add('hidden'))
}

window.addEventListener('load', loadTasks) 
ul.addEventListener('click', ulControler)
formAdd.addEventListener('submit', formControler)
formSearch.addEventListener('input', search)

formSearch.addEventListener('submit', event => {
    event.preventDefault()
})