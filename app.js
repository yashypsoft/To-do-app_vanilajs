//Define Ui variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load All event listeners

loadEventListners();

//Load All event listeners

function loadEventListners(){
    //Add task event
    form.addEventListener('submit',addTask);
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a Task');
    }

    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text nodeand appendto li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>';
    // Append the link to li
    li.appendChild(link);

    //append li to ui
    taskList.appendChild(li);

    console.log(li);
    //clear input
    taskInput.value = '';

    e.preventDefault();    
}
