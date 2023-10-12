const formAdd = document.querySelector('.form__add');
const ulToDo = document.querySelector('.lista');
const allCheckbox = document.querySelectorAll('.check__input');
const formSearch = document.querySelector('.form__search')
const inputSearch = document.querySelector('.input__search')
const editIcons = Array.from(document.querySelectorAll('.edit__icon'))

const createTask = inputAddValue =>{
    return `
            <li class="lista__li" data-todo=${inputAddValue}>
                <div class="text">
                    <input type="checkbox" class="check__input">
                    <span class="span__task">${inputAddValue}</span>
                </div>
                <div class="icons">
                    <i class="far fa-edit" data-edit=${inputAddValue}></i>
                    <i class="far fa-trash-alt" data-trash=${inputAddValue}></i>
                </div>
            </li>
        `
}

const addTask = event => {
    event.preventDefault();
    const inputAddValue = event.target.addTask.value;

    if (inputAddValue.length) {
        ulToDo.innerHTML += createTask(inputAddValue);

        event.target.reset();
    }
}

const toggleCheckbox = event => {
    const taskItem = event.target.parentElement
    const checkbox = event.target;

    if (checkbox.checked) {
        taskItem.classList.add('check')
        checkbox.setAttribute("checked", "checked")
    } else {
        taskItem.classList.remove('check')
        checkbox.removeAttribute("checked")
    }
}

const ulControler = event => {
    const clickedElement = event.target
    const trashValue = clickedElement.dataset.trash
    const iditValeu = clickedElement.dataset.edit

    toggleCheckbox(event)

    if(trashValue){
        const taskToRemove = document.querySelector(`[data-todo = "${trashValue}"]`)
        taskToRemove.remove()
    }

    if(iditValeu){
        const taskToEdit = document.querySelector(`[data-todo = "${iditValeu}"]`)
        editInput(taskToEdit)
    }
}

const editInput = taskToEdit => {
    const spanTask = taskToEdit.querySelector('.span__task')
    const currentTaskText = spanTask.textContent;

    const inputEdit = document.createElement('input')
    inputEdit.type = 'text'
    inputEdit.className = 'edit__input';
    inputEdit.value = currentTaskText

    spanTask.parentNode.replaceChild(inputEdit, spanTask)

    inputEdit.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            taskToEdit.remove();
            ulToDo.innerHTML += createTask(inputEdit.value);
        }
    })
    inputEdit.focus()
}

const search = event => {
    const inputSearchValue = event.target.value
    const allTasks = Array.from(ulToDo.children)

    const filterdTask = allTasks.filter(task => task.textContent.includes(inputSearchValue))
    const filterdTaskNot = allTasks.filter(task => !task.textContent.includes(inputSearchValue))

    filterdTaskNot.forEach(task => {
        task.classList.add('hidden')
    })
    filterdTask.forEach(task => {
        task.classList.remove('hidden')
    })
}

inputSearch.addEventListener('input', event => search(event))
formSearch.addEventListener('submit', event => event.preventDefault())
ulToDo.addEventListener('click', event => ulControler(event))
formAdd.addEventListener('submit', event => addTask(event));