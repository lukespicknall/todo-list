// import newTask from './to-do';
// import newProject from './project';

import newTask from './to-do';

// CREATE MAIN HTML DIVS
const content = document.getElementById('content');
const load = () => {
  const main = document.createElement('div');
  main.id = 'main';
  const sideBar = document.createElement('div');
  sideBar.id = 'side-bar';
  const head = document.createElement('div');
  head.id = 'head';
  const foot = document.createElement('div');
  foot.id = 'foot';

  const addTask = document.createElement('button');
  addTask.id = 'add-task';
  addTask.textContent = '+';
  sideBar.appendChild(addTask);

  const handlers = (() => {
    // CREATE NEW TASK FORM
    addTask.addEventListener('click', () => {
      const taskOverlay = document.createElement('div');
      taskOverlay.id = 'task-overlay-vis';
      const taskCard = document.createElement('div');
      taskCard.id = 'task-card';
      const taskForm = document.createElement('form');
      taskForm.setAttribute('action', '');
      taskForm.setAttribute('method', 'post');

      const titleLabel = document.createElement('label');
      titleLabel.setAttribute('for', 'task-title');
      const taskTitle = document.createElement('input');
      taskTitle.setAttribute('type', 'text');
      taskTitle.setAttribute('id', 'task-title');
      taskTitle.setAttribute('placeholder', 'Task title . . .');
      taskTitle.setAttribute('name', 'task-title');

      const descriptionLabel = document.createElement('label');
      descriptionLabel.setAttribute('for', 'task-description');
      const taskDescription = document.createElement('input');
      taskDescription.setAttribute('id', 'task-description');
      taskDescription.setAttribute('type', 'text');
      taskDescription.setAttribute('placeholder', 'Task description . . .');
      taskDescription.setAttribute('name', 'task-description');

      const dueLabel = document.createElement('label');
      dueLabel.setAttribute('for', 'task-due');
      const taskDue = document.createElement('input');
      taskDue.setAttribute('id', 'task-due');
      taskDue.setAttribute('type', 'date');
      taskDue.setAttribute('placeholder', 'Task due . . .');
      taskDue.setAttribute('name', 'task-due');

      const priorityLabel = document.createElement('label');
      priorityLabel.setAttribute('for', 'task-priority');
      const taskPriority = document.createElement('input');
      taskPriority.setAttribute('id', 'task-priority');
      taskPriority.setAttribute('type', 'date');
      taskPriority.setAttribute('placeholder', 'Task priority . . .');
      taskPriority.setAttribute('name', 'task-priority');

      const submitLabel = document.createElement('label');
      submitLabel.setAttribute('for', 'task-submit');
      const taskSubmit = document.createElement('input');
      taskSubmit.setAttribute('id', 'task-submit');
      taskSubmit.setAttribute('type', 'submit');
      taskSubmit.setAttribute('placeholder', 'Task submit . . .');
      taskSubmit.setAttribute('name', 'task-submit');

      // ADD TASK INPUTS TO FROM AND FORM TO PAGE
      taskForm.append(titleLabel, taskTitle);
      taskForm.append(descriptionLabel, taskDescription);
      taskForm.append(dueLabel, taskDue);
      taskForm.append(priorityLabel, taskPriority);
      taskForm.append(submitLabel, taskSubmit);
      taskCard.appendChild(taskForm);
      taskOverlay.appendChild(taskCard);
      content.appendChild(taskOverlay);

      taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // stops sumbit from sending data to server by default
        const taskObj = newTask(
          taskTitle.value,
          taskDescription.value,
          taskDue.value,
          taskPriority.value,
        );
        // sends data to new task
        taskOverlay.classList.remove('task-overlay-vis'); // removes visible class
        taskOverlay.setAttribute('id', 'task-overlay'); // adds hidden class
        // makes form dissapear on submit
        // addBtn.style.zIndex = '0';
        // bring addBtn to nuetral z plane
        // sideForm.reset();
        // reset the form
        const taskDisplay = document.createElement('div');
        taskDisplay.textContent = JSON.stringify(taskObj);
        main.appendChild(taskDisplay);
      });
    });
  })();

  content.append(main, sideBar, head, foot);
};

export default load;

// content.appendChild(sideBar);
// const clean = newTask('clean up', 'clean the whole house', '06/11', 'high');
// const taskDisplay = document.createElement('div');
// taskDisplay.textContent = JSON.stringify(clean);
// main.appendChild(taskDisplay);
