const taskArea = document.querySelector('.tasks')

const addButton = document.querySelector('.add')

taskArea.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        const task = e.target.closest('.task');
        if (task) task.remove();
    }
});

addButton.addEventListener('click', () => {
    const newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.setAttribute('draggable', true)
    newTask.innerHTML = `
            <input type="text" class="content">
            <button class="remove"></button>
    `
    taskArea.appendChild(newTask)
    addDragDrop(newTask)
})

function sort(isInc) {
    const tasks = Array.from(document.querySelectorAll('.tasks .task'))

    tasks.sort((a, b) => {
        const aValue = a.querySelector('.content').value
        const bValue = b.querySelector('.content').value
        return isInc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    })

    taskArea.innerHTML = ''
    tasks.forEach(task => taskArea.appendChild(task))
}


let isInc = false
const sortButton = document.querySelector('.sort')

sortButton.addEventListener('click', () => {
    sortButton.classList.add('active')
    if (!isInc) {
        sortButton.classList.replace('dec', 'inc')
    }
    else sortButton.classList.replace('inc', 'dec')
    isInc = !isInc
    sort(isInc)
})

let draggedTask = null
function addDragDrop(task) {
    task.addEventListener('dragstart', ()=>{
        sortButton.classList.remove('active')
        draggedTask = task
        setTimeout(() => {
            task.style.display = 'none'
        }, 0);
    })

    task.addEventListener('dragend', ()=>{
        task.style.display = ''
        draggedTask = null
    })

    task.addEventListener('dragover', (e)=>{
        e.preventDefault()
        const draggingAbove = e.clientY < task.getBoundingClientRect().top + task.offsetHeight / 2;
        if (draggingAbove) {
            taskArea.insertBefore(draggedTask, task);
        } else if (task.nextSibling) {
            taskArea.insertBefore(draggedTask, task.nextSibling);
        } else {
            taskArea.appendChild(draggedTask);
        }
    })
}

addDragDrop(document.querySelector('.tasks .task'))