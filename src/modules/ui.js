// import newTask from './to-do';
// import newProject from './project';

import newTask from './to-do';
// import displayTasks from './display';

// CREATE MAIN HTML DIVS
const taskList = [];
const content = document.getElementById('content');
const load = () => {
  const pageBox = document.createElement('div');
  pageBox.id = 'page-box';
  const main = document.createElement('div');
  main.id = 'main';
  const taskTable = document.createElement('table');
  taskTable.id = 'task-table';
  main.appendChild(taskTable);
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

    const tBody = document.createElement('tbody');

    const displayTasks = () => {
      tBody.innerHTML = ''; // clears current tbody to avoid repeats
      const taskHeader = document.createElement('thead');
      taskHeader.id = 'task-header';
      taskHeader.textContent = 'Tasks';
      tBody.appendChild(taskHeader);
      for (let i = 0; i < taskList.length; i += 1) {
        // loop through taskList[]
        const taskRow = document.createElement('tr'); // create new tr for new Task
        taskRow.className = 'task-row';
        taskRow.setAttribute('data', [i]);
        tBody.appendChild(taskRow); // add that tr to tbody in libTable

        const taskCell = document.createElement('td'); //
        const notesCell = document.createElement('td'); //
        const dueCell = document.createElement('td'); // create new cells for Task data
        const priorityCell = document.createElement('td'); //

        taskCell.className = 'task-cell';
        notesCell.className = 'notes-cell';
        dueCell.className = 'due-cell'; //
        priorityCell.className = 'priority-cell'; // give class names to table cells

        taskCell.textContent = taskList[i].task; //
        notesCell.textContent = taskList[i].notes; // assign object value to cell content
        dueCell.textContent = taskList[i].due; //
        priorityCell.textContent = taskList[i].priority;

        const editCell = document.createElement('td'); //
        const deleteCell = document.createElement('td'); //
        const completeCell = document.createElement('td'); //

        editCell.className = 'edit-cell';
        deleteCell.className = 'delete-cell';
        completeCell.className = 'complete-cell'; //

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<p>edit</p>';
        editCell.appendChild(editBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<p>delete</p>';
        deleteCell.appendChild(deleteBtn);
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.innerHTML = '<p>complete</p>';
        completeCell.appendChild(completeBtn);

        taskRow.appendChild(taskCell); //
        taskRow.appendChild(notesCell); // add those cells to the new taskRow
        taskRow.appendChild(dueCell); //
        taskRow.appendChild(priorityCell);
        taskRow.appendChild(editCell); //
        taskRow.appendChild(deleteCell); //
        taskRow.appendChild(completeCell); //

        taskTable.appendChild(tBody);

        // const edit = (() => {
        // const rowEdit = document.querySelectorAll('edit-btn');
        editBtn.addEventListener('click', () => {
          const editing = true;
          const currentTask = taskRow.getAttribute('data');
          const editTitle = taskList[currentTask].task;
          const editNotes = taskList[currentTask].notes;
          const editDue = taskList[currentTask].due;
          const editPriority = taskList[currentTask].priority;
          displayForm(editing, editTitle, editNotes, editDue, editPriority);
        });
        // })();
      }
    };

    const displayForm = (a, b, c, d, f) => {
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
      if (a === true) {
        taskTitle.value = b;
      }
      taskTitle.setAttribute('type', 'text');
      taskTitle.setAttribute('id', 'task-title');
      taskTitle.setAttribute('placeholder', 'Task title . . .');
      taskTitle.setAttribute('name', 'task-title');

      const descriptionLabel = document.createElement('label');
      descriptionLabel.setAttribute('for', 'task-description');
      descriptionLabel.textContent = 'Description';
      const taskDescription = document.createElement('input');
      if (a === true) {
        taskDescription.value = c;
      }
      taskDescription.setAttribute('id', 'task-description');
      taskDescription.setAttribute('type', 'text');
      taskDescription.setAttribute('placeholder', 'Task description . . .');
      taskDescription.setAttribute('name', 'task-description');

      const dueLabel = document.createElement('label');
      dueLabel.setAttribute('for', 'task-due');
      dueLabel.textContent = 'Due date';
      const taskDue = document.createElement('input');
      if (a === true) {
        taskDue.value = d;
      }
      taskDue.setAttribute('id', 'task-due');
      taskDue.setAttribute('type', 'date');
      taskDue.setAttribute('placeholder', 'Task due . . .');
      taskDue.setAttribute('name', 'task-due');

      const priorityLabel = document.createElement('label');
      priorityLabel.setAttribute('for', 'task-priority');
      priorityLabel.textContent = 'Priority';
      const taskPriority = document.createElement('input');
      if (a === true) {
        taskPriority.value = f;
      }
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
        taskList.push(taskObj);
        // sends data to new task
        taskOverlay.setAttribute('id', 'task-overlay'); // adds hidden class
        taskOverlay.removeChild(taskCard);
        // makes form dissapear on submit
        removeBlur(pageBox);
        // puts task object data into DOM table
        displayTasks();
      });
      return taskCard;
    };

    // SUMBIT FORM/CREATE OBJ/PUSH OBJ TO ARRAY/DISPLAY ARRAY VIALOOP

    // CREATE NEW TASK FORM HANDLER
    addTask.addEventListener('click', () => {
      // BLUR BACKGROUND
      displayForm();
    });

    const clickout = (() => {
      // click listener on taskOverlay
      taskOverlay.addEventListener('click', (e) => {
        const card = document.getElementById('task-card');
        // make clickSpot = the event target
        const clickSpot = e.target;
        // if click happened on taskOverlay, i.e. outisde of the task
        if (clickSpot.id === 'task-overlay-vis') {
          taskOverlay.id = 'task-overlay';
          removeBlur(pageBox);
          taskOverlay.removeChild(card);
        }
      });
      // }
    })();
  })();

  content.appendChild(pageBox);
};

export default load;

// // puts Task{} data from taskList[] into libTable// MAKE THIS PRIORITY SELECTOR
//     // Read Checkbox - - -
//     const readCheck = document.createElement('input'); // create an input element
//     readCheck.setAttribute('type', 'checkbox'); // make it a checkbox
//     readCheck.setAttribute('data-id', [i]); // assign data-id that = object's array index
//     readCheck.className = 'read-check'; // give it a class name
//     if (taskList[i].read === 'no') {
//       // if not read
//       readCell.appendChild(readCheck); // add the default unchecked box to the cell
//     } else if (taskList[i].read === 'yes') {
//       // if read
//       readCheck.checked = 'true'; // make the checkbox checked
//       readCell.appendChild(readCheck); // add the checked box to the readCell
//     }
//     row.appendChild(readCell); // add readCell to row

// MAKE THIS COMPLETE CHECKBOX
//     // Delete Button
//     const deleteBtn = document.createElement('button'); // create a button
//     const deleteImg = document.createElement('img'); // create and img element
//     deleteBtn.className = 'delete-btn'; // give button a class
//     deleteImg.src = 'images/trash-can-outline.png'; // set img source
//     deleteImg.className = 'delete-img'; // give img element a class
//     deleteImg.setAttribute('data-id', [i]); // assign data-id that = object's array index
//     deleteBtn.appendChild(deleteImg); // add image to button
//     deleteCell.appendChild(deleteBtn); // add button to cell
//     row.appendChild(deleteCell); // add cell to row
//   }
// }
