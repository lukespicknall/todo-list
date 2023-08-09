// import newTask from './to-do';
// import newProject from './project';

import newTask from './to-do';

// CREATE MAIN HTML DIVS
const content = document.getElementById('content');
const load = () => {
  const pageBox = document.createElement('div');
  pageBox.id = 'page-box';
  const main = document.createElement('div');
  main.id = 'main';
  const sideBar = document.createElement('div');
  sideBar.id = 'side-bar';
  const head = document.createElement('div');
  head.id = 'head';
  const foot = document.createElement('div');
  foot.id = 'foot';
  pageBox.append(main, sideBar, head, foot);

  const addTask = document.createElement('button');
  addTask.id = 'add-task';
  addTask.textContent = '+';
  sideBar.appendChild(addTask);

  const handlers = (() => {
    // ADD OVERLAY TO DOM BEFORE addBtn EVENT SO TRANSITION WORKS
    const taskOverlay = document.createElement('div');
    taskOverlay.id = 'task-overlay';
    content.appendChild(taskOverlay);

    // REMOVE BACKGROUND BLUR
    const removeBlur = (a) => {
      a.classList.remove('blurred');
    };

    // CREATE NEW TASK FORM HANDLER
    addTask.addEventListener('click', () => {
      // BLUR BACKGROUND
      pageBox.classList.add('blurred');

      // const taskOverlay = document.createElement('div');
      taskOverlay.id = 'task-overlay-vis';
      const taskCard = document.createElement('div');
      taskCard.id = 'task-card';
      const taskForm = document.createElement('form');
      taskForm.id = 'task-form';
      taskForm.setAttribute('action', '');
      taskForm.setAttribute('method', 'post');

      const titleLabel = document.createElement('label');
      titleLabel.setAttribute('for', 'task-title');
      titleLabel.textContent = 'Title';
      const taskTitle = document.createElement('input');
      taskTitle.setAttribute('type', 'text');
      taskTitle.setAttribute('id', 'task-title');
      taskTitle.setAttribute('placeholder', 'Task title . . .');
      taskTitle.setAttribute('name', 'task-title');

      const descriptionLabel = document.createElement('label');
      descriptionLabel.setAttribute('for', 'task-description');
      descriptionLabel.textContent = 'Description';
      const taskDescription = document.createElement('input');
      taskDescription.setAttribute('id', 'task-description');
      taskDescription.setAttribute('type', 'text');
      taskDescription.setAttribute('placeholder', 'Task description . . .');
      taskDescription.setAttribute('name', 'task-description');

      const dueLabel = document.createElement('label');
      dueLabel.setAttribute('for', 'task-due');
      dueLabel.textContent = 'Due date';
      const taskDue = document.createElement('input');
      taskDue.setAttribute('id', 'task-due');
      taskDue.setAttribute('type', 'date');
      taskDue.setAttribute('placeholder', 'Task due . . .');
      taskDue.setAttribute('name', 'task-due');

      const priorityLabel = document.createElement('label');
      priorityLabel.setAttribute('for', 'task-priority');
      priorityLabel.textContent = 'Priority';
      const taskPriority = document.createElement('input');
      taskPriority.setAttribute('id', 'task-priority');
      taskPriority.setAttribute('type', 'radio');
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

      taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // stops sumbit from sending data to server by default
        const taskObj = newTask(
          taskTitle.value,
          taskDescription.value,
          taskDue.value,
          taskPriority.value,
        );
        // sends data to new task
        taskOverlay.setAttribute('id', 'task-overlay'); // adds hidden class
        // makes form dissapear on submit
        // sideForm.reset();
        // reset the form
        removeBlur(pageBox);
        const taskDisplay = document.createElement('div');
        taskDisplay.textContent = JSON.stringify(taskObj);
        main.appendChild(taskDisplay);
      });
    });

    const clickout = (() => {
      // click listener on taskOverlay
      taskOverlay.addEventListener('click', (e) => {
        // make clickSpot = the event target
        const clickSpot = e.target;
        // if click happened on taskOverlay, i.e. outisde of the task
        if (clickSpot.id === 'task-overlay-vis') {
          taskOverlay.id = 'task-overlay';
          removeBlur(pageBox);
        }
      });
      // }
    })();
  })();

  content.appendChild(pageBox);
};

export default load;
