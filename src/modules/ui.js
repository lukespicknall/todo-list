// import newTask from './to-do';
// import newProject from './project';

import newTask from './to-do';
// import displayTasks from './display';

// CREATE MAIN HTML DIVS
const taskList = [];
const content = document.getElementById('content');
// LOAD HANDLES UI
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

  // CREATE ADDTASK BUTTON
  const addTask = document.createElement('button');
  addTask.id = 'add-task';
  addTask.textContent = '+';
  sideBar.appendChild(addTask);

  // EIF THAT ESTABLISHES AND AHNDLES MOST OF THE UI
  const handlers = (() => {
    // ADD OVERLAY TO DOM BEFORE addBtn EVENT SO TRANSITION WORKS ON BLUR/FORM
    const taskOverlay = document.createElement('div');
    taskOverlay.id = 'task-overlay';
    content.appendChild(taskOverlay);

    // CREATE REMOVE BLUR FUNCTION
    const removeBlur = (a) => {
      a.classList.remove('blurred');
    };

    // CREATE TABLE ELEMENTS AND LOOP TASKLIST[] AND SEND EACH OBJS DATA TO TABLE FIELDS.
    // ADD EDITBTN FUNCTIONALITY
    const displayTasks = () => {
      taskTable.innerHTML = ''; // clears current taskTable to avoid repeats
      const taskHeader = document.createElement('thead');
      taskHeader.id = 'task-header';
      taskHeader.textContent = 'Tasks';
      taskTable.appendChild(taskHeader);
      // LOOP THROUGH taskList[]
      for (let i = 0; i < taskList.length; i += 1) {
        // CREATE NEW TASK ROW FOR OBJ IN taskList[i]
        const taskRow = document.createElement('tr');
        taskRow.className = 'task-row';
        taskRow.setAttribute('data-id', [i]); // row assigned data-id that is its posiition in taskLisy[]
        taskTable.appendChild(taskRow); // add that tr to taskTable in libTable

        // CREATE NEW TABLE CELLS FOR TASK DATA
        const taskCell = document.createElement('td');
        const notesCell = document.createElement('td');
        const dueCell = document.createElement('td');
        const priorityCell = document.createElement('td');

        // ASSIGN CELL CLASS NAMES
        taskCell.className = 'task-cell';
        notesCell.className = 'notes-cell';
        dueCell.className = 'due-cell';
        priorityCell.className = 'priority-cell';

        // ASSIGN CELL DATA FROM TASK DATA
        taskCell.textContent = taskList[i].task;
        notesCell.textContent = taskList[i].notes;
        dueCell.textContent = taskList[i].due;
        priorityCell.textContent = taskList[i].priority;

        // CREATE CELLS FOR UI BUTTONS ON ROW FOR TASK OBJ UPDATING
        const editCell = document.createElement('td'); //
        const deleteCell = document.createElement('td'); //
        const completeCell = document.createElement('td'); //

        // ASSIGN UI CELL CLASSNAMES
        editCell.className = 'edit-cell';
        deleteCell.className = 'delete-cell';
        completeCell.className = 'complete-cell'; //

        // CREATE UI BUTTONS FOR TASK UPDATES, ASSIGN CLASS, APPEND TO UI CELL
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

        // APPEND CELLS TO THE TASK TROW
        taskRow.appendChild(taskCell);
        taskRow.appendChild(notesCell);
        taskRow.appendChild(dueCell);
        taskRow.appendChild(priorityCell);
        taskRow.appendChild(editCell);
        taskRow.appendChild(deleteCell);
        taskRow.appendChild(completeCell);

        // ON CLICK, EDITBTN SETS EDITING STATE,
        // GRABS OBJECT DATA THROUGH DATA-ID REFERENCE ON ITS TASK ROW,
        // POPULATES A FORM CONTAINING THE OBJ'S DATA BY PASISNG THAT DATA TO DISPLAYFORM()
        editBtn.addEventListener('click', () => {
          const editing = true;
          const currentTask = taskRow.getAttribute('data-id');
          const editTitle = taskList[currentTask].task;
          const editNotes = taskList[currentTask].notes;
          const editDue = taskList[currentTask].due;
          const editPriority = taskList[currentTask].priority;
          displayForm(
            editing,
            editTitle,
            editNotes,
            editDue,
            editPriority,
            currentTask,
          );
        });
        taskDelete(deleteBtn);
        taskComplete(completeBtn);
      }
    };

    // FUCNCTIONALITY FOR COMPLETE BUTTON
    const taskComplete = (completeBtn) => {
      // IF ANY TASKS EXIST, ADD LISTENER
      if (taskList.length >= 1) {
        completeBtn.addEventListener('click', (e) => {
          // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
          const currentTask = e.target.closest('.task-row').dataset.id;
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKlIST[]
          taskList.splice(currentTask, 1);
          displayTasks();
          // do something nice like swipe a green check to say good job!
        });
      }
    };

    // FUNCTIONALITY FOR DELETE BUTTON
    const taskDelete = (deleteBtn) => {
      // IF ANY TASKS EXIST, ADD LISTENER
      if (taskList.length >= 1) {
        deleteBtn.addEventListener('click', (e) => {
          // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
          const currentTask = e.target.closest('.task-row').dataset.id;
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKlIST[]
          taskList.splice(currentTask, 1);
          displayTasks();
        });
      }
    };

    // DISPLAY FORM, USING ARGS PASSED FROM OBJ IF FORM LAUNCHED FORM EDIT BUTTON
    const displayForm = (a, b, c, d, f, g) => {
      // BLUR BACKGORUND
      pageBox.classList.add('blurred');

      // SET taskOverlay ID AND CREATE taskCard AND taskFrom
      taskOverlay.id = 'task-overlay-vis';
      const taskCard = document.createElement('div');
      taskCard.id = 'task-card';
      const taskForm = document.createElement('form');
      taskForm.id = 'task-form';
      taskForm.setAttribute('action', '');
      taskForm.setAttribute('method', 'post');

      // CREATE TITLE INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
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

      // CREATE DESCRIPTION INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
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

      // CREATE DUE INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
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

      // CREATE PRIORITY INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const priorityLabel = document.createElement('label');
      // priorityLabel.setAttribute('for', 'task-priority');
      priorityLabel.textContent = 'Priority';
      // CREATE BOX TO HOLD RADIO BUTTONS AND LABELS
      const taskPriorityBox = document.createElement('div');
      if (a === true) {
        taskPriorityBox.value = f;
      }

      // CREATE LOW PRIORITY RADIO BUTTON
      const lowLabel = document.createElement('label');
      lowLabel.setAttribute('for', 'low-priority');
      lowLabel.textContent = 'low';
      const lowPriority = document.createElement('input');
      lowPriority.id = 'low-priority';
      lowPriority.setAttribute('type', 'radio');
      lowPriority.setAttribute('name', 'task-priority');
      lowPriority.setAttribute('value', 'low');
      // CHECK LOW IF EDITING AND VALUE OF CURRENT OBJ IS LOW
      if (taskPriorityBox.value === 'low') {
        lowPriority.checked = true;
      }
      taskPriorityBox.appendChild(lowLabel);
      taskPriorityBox.appendChild(lowPriority);

      // CREATE MEDIUM PRIORITY RADIO BUTTON
      const mediumLabel = document.createElement('label');
      mediumLabel.setAttribute('for', 'medium-priority');
      mediumLabel.textContent = 'medium';
      const mediumPriority = document.createElement('input');
      mediumPriority.id = 'medium-priority';
      mediumPriority.setAttribute('type', 'radio');
      mediumPriority.setAttribute('name', 'task-priority');
      mediumPriority.setAttribute('value', 'medium');
      // CHECK MEDIUM IF EDITING AND VALUE OF CURRENT OBJ IS MEDIUM
      if (taskPriorityBox.value === 'medium') {
        mediumPriority.checked = true;
      }
      taskPriorityBox.appendChild(mediumLabel, mediumPriority);
      taskPriorityBox.appendChild(mediumPriority);

      // CREATE HIGH PRIORITY RADIO BUTTON
      const highLabel = document.createElement('label');
      highLabel.setAttribute('for', 'high-priority');
      highLabel.textContent = 'high';
      const highPriority = document.createElement('input');
      highPriority.id = 'high-priority';
      highPriority.setAttribute('type', 'radio');
      highPriority.setAttribute('name', 'task-priority');
      highPriority.setAttribute('value', 'high');
      // CHECK HIGH IF EDITING AND VALUE OF CURRENT OBJ IS HIGH
      if (taskPriorityBox.value === 'high') {
        highPriority.checked = true;
      }
      taskPriorityBox.appendChild(highLabel, highPriority);
      taskPriorityBox.appendChild(highPriority);

      // CREATE SUBMIT BUTTON, SELECT LABEL BASED ON EDITING STATE
      const submitLabel = document.createElement('label');
      submitLabel.setAttribute('for', 'task-submit');
      const taskSubmit = document.createElement('button');
      if (a === true) {
        taskSubmit.textContent = 'Update Task';
      } else {
        taskSubmit.textContent = 'Add Task';
      }
      taskSubmit.setAttribute('id', 'task-submit');
      taskSubmit.setAttribute('type', 'submit');
      taskSubmit.setAttribute('name', 'task-submit');

      // ADD TASK INPUTS TO FORM AND FORM TO PAGE
      taskForm.append(titleLabel, taskTitle);
      taskForm.append(descriptionLabel, taskDescription);
      taskForm.append(dueLabel, taskDue);
      taskForm.append(priorityLabel, taskPriorityBox);
      taskForm.append(submitLabel, taskSubmit);
      taskCard.appendChild(taskForm);
      taskOverlay.appendChild(taskCard);

      // SUBMIT FUNTIONALITY
      taskForm.addEventListener('submit', (e) => {
        // STOPS SUBMIT FROM SENDING DATA TO SEVER BY DEFAULT
        e.preventDefault();
        // PULL ALL RADIO INPUTS BY NAME INTO submitPriority[]
        const submitPriotiry = document.getElementsByName("task-priority");
        // LOOP THROUGH PRIORITY BUTTONS
        for (let i = 0; i < submitPriotiry.length; i += 1) {
          // IF ONE IS CHECKED, taskPriorityBox IS ASSIGNED THAT VALUE
          if (submitPriotiry[i].checked === true) {
            const priority = submitPriotiry[i].value;
            taskPriorityBox.value = priority;
          }
        }

        // IF EDITING AN ESTABLISHED TASK, UPDATE THAT OBJ'S (g's) VALUE
        if (a === true) {
          const currentPosition = g;
          taskList[currentPosition].task = taskTitle.value;
          taskList[currentPosition].notes = taskDescription.value;
          taskList[currentPosition].due = taskDue.value;
          taskList[currentPosition].priority = taskPriorityBox.value;
        // ELSE, CREAT A NEW OBJECT WITH THESE VALUES AND PUSH IT TO taskList[]
        } else {
          const taskObj = newTask(
            taskTitle.value,
            taskDescription.value,
            taskDue.value,
            taskPriorityBox.value
          );
          taskList.push(taskObj);
        }
        // ASSIGNS THE HIDDEN ID TO HIDE THE OVERLAY
        taskOverlay.setAttribute("id", "task-overlay");
        // REMOVES THE FORM CARD FROM THE OVERLAY
        taskOverlay.removeChild(taskCard);
        // REMOVES BLUE FROM BACKGROUND
        removeBlur(pageBox);
        // PUTS TASK OBJECT DATA INTO DOM TABLE
        displayTasks();
        console.log(taskList);
      });
      return taskCard;
    };

    // CREATE NEW TASK FORM HANDLER
    addTask.addEventListener('click', () => {
      displayForm();
    });

    const clickout = (() => {
      // PUTS A CLICK LISTENER ON OVERLAY BACKGROUND FOR CLICKOUT
      taskOverlay.addEventListener('mousedown', (e) => {
        const card = document.getElementById('task-card');
        // MAKE clickSpot = tTHE TARGET EVENT
        const clickSpot = e.target;
        // IF CLICK HAPPENED ON taskOverlay, I.E OUTSIDE THE FORM
        if (clickSpot.id === 'task-overlay-vis') {
          // SET OVERLAY TO HIDDEN ID
          taskOverlay.id = 'task-overlay';
          // REMOVE BLUR
          removeBlur(pageBox);
          // REMOVE CARD FROM OVERLAY
          taskOverlay.removeChild(card);
        }
      });
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
