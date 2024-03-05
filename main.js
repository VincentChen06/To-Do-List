//Selector
const task = document.querySelectorAll('.title');
const theList = document.querySelector("#toDo");
const theForm = document.querySelector("#newForm");
const theTitleInput = document.querySelector("#newTitleInput");
const theDescriptionInput = document.querySelector("#newDescriptionInput");
const theDueDateInput = document.querySelector("#newDueDateInput");

//Event listener for the form
theForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = theTitleInput.value;
  const description = theDescriptionInput.value;
  const dueDate = theDueDateInput.value;

  const taskDiv = createTaskElement(title, description, dueDate);
  theList.appendChild(taskDiv);
  buttonEventListeners(taskDiv); 

  taskDiv.querySelectorAll('.color-picker').forEach(colorInput => {
    colorInput.addEventListener('input', function () {
      const selectedColor = colorInput.value;
      taskDiv.style.backgroundColor = selectedColor;
    });
  });

  theTitleInput.value = '';
  theDescriptionInput.value = '';
  theDueDateInput.value = '';

});

//Task and initial
task.forEach((taskDiv) => {
  buttonEventListeners(taskDiv);

  const dueDateInput = document.createElement('span');
  dueDateInput.classList.add('due-date');
  dueDateInput.textContent = 'Due Date: 2024-02-29'; 
  taskDiv.querySelector('.description').appendChild(dueDateInput);

  taskDiv.querySelectorAll('.color-picker').forEach(colorInput => {
    colorInput.addEventListener('input', function () {
      const selectedColor = colorInput.value;
      taskDiv.style.backgroundColor = selectedColor;
    });
  });
});

//Create a new task div
function createTaskElement(title, description, dueDate) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('title');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('description');
  taskDiv.appendChild(contentDiv);

  const input = document.createElement('input');
  input.classList.add('text');
  input.type = 'text';
  input.value = title;
  input.setAttribute('readonly', 'readonly');
  contentDiv.appendChild(input);

  const descriptionInput = document.createElement('p');
  descriptionInput.textContent = description;
  contentDiv.appendChild(descriptionInput);

  const dueDateInput = document.createElement('span');
  dueDateInput.classList.add('due-date');
  dueDateInput.textContent = `Due Date: ${dueDate}`;
  contentDiv.appendChild(dueDateInput);

  const colorPicker = document.createElement('input');
  colorPicker.classList.add('color-picker');
  colorPicker.type = 'color';
  colorPicker.value = '#CBC3E3'; 

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const checkButton = createButton('check', 'fa-regular fa-square-check');
  const editButton = createButton('edit', 'fa-solid fa-pen-to-square');
  const trashButton = createButton('trash', 'fa-solid fa-trash');

  actionsDiv.appendChild(checkButton);
  actionsDiv.appendChild(editButton);
  actionsDiv.appendChild(trashButton);

  taskDiv.appendChild(actionsDiv);
  taskDiv.appendChild(colorPicker);

  return taskDiv;
}

//Create a button
function createButton(className, iconClass) {
  const button = document.createElement('button');
  button.classList.add(className);
  button.innerHTML = `<i class="${iconClass}"></i>`;
  return button;
}

//Event listeners for the buttons
function buttonEventListeners(taskDiv) {
  const checkButton = taskDiv.querySelector('.check');
  const editButton = taskDiv.querySelector('.edit');
  const trashButton = taskDiv.querySelector('.trash');

  checkButton.addEventListener('click', function () {
    toggleTaskDone(taskDiv, checkButton);
  });

  editButton.addEventListener('click', function () {
    toggleEditTask(taskDiv, editButton);
  });

  trashButton.addEventListener('click', function () {
    deleteTask(taskDiv);
  });
}

// Function to toggle task done status
function toggleTaskDone(taskDiv, checkButton) {
  if (checkButton.innerHTML == '<i class="fa-regular fa-square-check"></i>') {
        taskDiv.classList.toggle('done');
        checkButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        const doneSound = new Audio('firework.mp3'); 
        doneSound.play(); 
  } else {
        checkButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
        taskDiv.classList.toggle('done');
    }
}

//Toggle edit task
function toggleEditTask(taskDiv, editButton) {
  const input = taskDiv.querySelector('.text');
  const descriptionInput = taskDiv.querySelector('.description p');
  const dueDateLabel = taskDiv.querySelector('.due-date');


  if (editButton.innerHTML === '<i class="fa-solid fa-pen-to-square"></i>') {
    editButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
    input.removeAttribute('readonly');
    descriptionInput.contentEditable = true;
    dueDateLabel.contentEditable = true; 
    input.focus();
  } else {
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    input.setAttribute('readonly', 'readonly');
    descriptionInput.contentEditable = false;
    dueDateLabel.contentEditable = false; 

  }
}

//Toggle delete task
function deleteTask(taskDiv) {
  taskDiv.parentNode.removeChild(taskDiv);
}

//Add task to filter
const filterDropdown = document.getElementById('filter');
filterDropdown.addEventListener('click', filterTasks);

function filterTasks() {
  const selectedFilter = filterDropdown.value;
  const allTasks = document.querySelectorAll('.title');

  allTasks.forEach(taskDiv => {
      switch (selectedFilter) {
        case "all": 
          taskDiv.style.display = 'flex';
          break;
        case 'completed':
          if(taskDiv.classList.contains('done')) {
            taskDiv.style.display = 'flex';
          }
          else {
            taskDiv.style.display = 'none';
          } 
          break;
        case 'uncompleted':
          if(!taskDiv.classList.contains('done')) {
            taskDiv.style.display = 'flex';
          }
          else {
            taskDiv.style.display = 'none';
          } 
          break;
      }
  });
}

