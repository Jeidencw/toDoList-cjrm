const formAdd = document.querySelector('.form__add')
const ul = document.querySelector('.lista')
const inputSearch = document.querySelector('.input__search')
const formSearch = document.querySelector('.form__search')

const addTask = event => {
    const inputValue = event.target.addTask.value

    ul.innerHTML += `
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

    event.target.reset()
}

const editTask  = editTaskInput => {
    const spanText = editTaskInput.textContent
    
    const inputEdit = document.createElement('input')
    inputEdit.type = 'text'
    inputEdit.className = 'edit__input'
    inputEdit.value = spanText

    editTaskInput.replaceWith(inputEdit)

    inputEdit.addEventListener('keypress', event => {
        if(event.key === 'Enter'){
            changeEditedTask()
        }
    })
    
    inputEdit.focus()
     
    const changeEditedTask = () => {
        editTaskInput.textContent = inputEdit.value

        inputEdit.replaceWith(editTaskInput) 
    }
} 


const search = event => {
    const inputSearchValue = event.target.value
    const allLi = Array.from(ul.children)

    const filteredTask = allLi.filter(task => task.textContent.includes(inputSearchValue))
    const filterdTaskNot = allLi.filter(task => !task.textContent.includes(inputSearchValue))


    filterdTaskNot.forEach(task => task.classList.add('hidden'))
    filteredTask.forEach(task => task.classList.remove('hidden'))
}


ul.addEventListener('click', event => {
    const clickedElement = event.target
    const trash = clickedElement.dataset.trash
    const edit = clickedElement.dataset.edit

    const deleteTaskInput = document.querySelector(`[data-todo = "${trash}"]`)
    const editTaskInput = document.querySelector(`[data-todo = "${edit}"] .span__task`)

    if(trash){
        deleteTaskInput.remove()
    }

    if(edit){
        editTask(editTaskInput)
    }
})

formAdd.addEventListener('submit', event => {
    event.preventDefault()
    addTask(event)
})

formSearch.addEventListener('submit', event => event.preventDefault())

formSearch.addEventListener('input', event => search(event))


