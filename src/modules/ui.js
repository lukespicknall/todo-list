// import newTask from './to-do';
// import newProject from './project';

import newTask from './to-do';

// CREATE MAIN HTML DIVS
const taskList = [];
const tBody = document.createElement("tbody");
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

      // SUMBIT FORM/CREATE OBJ/PUSH OBJ TO ARRAY/DISPLAY ARRAY VIALOOP
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
        // makes form dissapear on submit
        removeBlur(pageBox);
        displayTasks();

        // const taskDisplay = document.createElement('div');
        // taskDisplay.textContent = JSON.stringify(taskObj);
        // main.appendChild(taskDisplay);
      });
    });

    const displayTasks = () => {
      tBody.innerHTML = ''; // clears current tbody to avoid repeats
      for (let i = 0; i < taskList.length; i += 1) {
        // loop throu taskList[]
        const row = document.createElement('tr'); // create new tr for new Task
        row.className = 'table-row';
        tBody.appendChild(row); // add that tr to tbody in libTable
        const taskCell = document.createElement('td'); //
        const notesCell = document.createElement('td'); //
        const dueCell = document.createElement('td'); // create new cells for Task data
        const priorityCell = document.createElement('td'); //
        const completeCell = document.createElement('td'); //
        dueCell.className = 'due-cell'; //
        priorityCell.className = 'priority-cell'; // give class names to table cells
        completeCell.className = 'complete-cell'; //
        taskCell.textContent = taskList[i].task; //
        notesCell.textContent = taskList[i].notes; // assign object value to cell content
        dueCell.textContent = taskList[i].due; //
        row.appendChild(taskCell); //
        row.appendChild(notesCell); // add those cells to the new row
        row.appendChild(dueCell); //
        main.appendChild(tBody);
      }
    };

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
