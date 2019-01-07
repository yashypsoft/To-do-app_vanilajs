//Define Ui variable

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const delitem = document.querySelector('.delete-item');

//Load All event listeners

loadEventListners();

//Load All event listeners

function loadEventListners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task
    taskList.addEventListener('click',removeItem);
    //clear task
    clearBtn.addEventListener('click',clearTask);
    //filter task
    filter.addEventListener('keyup',filterTask);
}

//get TAsk From LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
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
    });

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
    //create text node and append to li
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

    //store in localstorage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';

    e.preventDefault();    
}

//store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks')=== null)
    {
        tasks =[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Item
function removeItem(e) {
       if (e.target.parentElement.className === 'delete-item secondary-content') {
           if(confirm('Are You Sure?')){
        e.target.parentElement.parentElement.remove();

        //Remove task from LS
               removeTaskFromLocalStorage(e.target.parentElement.parentElement);
           }
    }
    
}

//Remove from Ls
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//cleartask

function clearTask(e) {
    // taskList.innerHTML = '';
    // e.preventDefault();

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        
    }
    // clear from LS
    clearTaskFromLocalStorage();

}
// clear task from Ls
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

//filter task
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
            
        }
        else
        {
            task.style.display = 'none';
        }
    });
}


