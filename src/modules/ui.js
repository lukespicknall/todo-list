// import newTask from './to-do';
import newProject from './project';

import newTask from './to-do';
// import displayTasks from './display';

// CREATE MAIN HTML DIVS
const projectList = [
  {
    title: 'My Projects',
    due: undefined,
    priotiy: 'low',
    tasks: [],
  },
];
let currentProject = projectList[0];

const getCurrent = (a) => {
  // if (projectList.length > 1) {
  currentProject = projectList[a];
  // }
};

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
  const projectTable = document.createElement('table');
  projectTable.id = 'project-table';
  sideBar.appendChild(projectTable);
  const head = document.createElement('div');
  head.id = 'head';
  const foot = document.createElement('div');
  foot.id = 'foot';
  pageBox.append(main, sideBar, head, foot);

  // CREATE addNew BUTTON
  const addBox = document.createElement('div');
  addBox.id = 'add-Box';
  const addNew = document.createElement('button');
  addNew.id = 'add-new';
  addNew.textContent = '+';
  addBox.appendChild(addNew);
  sideBar.appendChild(addBox);

  // EIF THAT ESTABLISHES AND HANDLES MOST OF THE UI
  const handlers = (() => {
    // ADD OVERLAY TO DOM BEFORE addBtn EVENT SO TRANSITION WORKS ON BLUR/FORM
    const formOverlay = document.createElement('div');
    formOverlay.id = 'form-overlay';
    content.appendChild(formOverlay);

    // CREATE REMOVE BLUR FUNCTION
    const removeBlur = (a) => {
      a.classList.remove('blurred');
    };
    const displayProjects = () => {
      projectTable.innerHTML = ''; // clears current projectTable to avoid repeats
      const projectHeader = document.createElement('thead');
      projectHeader.id = 'project-header';
      projectHeader.textContent = 'projects';
      projectTable.appendChild(projectHeader);
      // LOOP THROUGH projectList[]
      for (let i = 0; i < projectList.length; i += 1) {
        // CREATE NEW project ROW FOR OBJ IN projectList[i]
        const projectRow = document.createElement('tr');
        projectRow.className = 'project-row';
        projectRow.setAttribute('data-id', [i]); // row assigned data-id that is its posiition in projectLisy[]
        projectTable.appendChild(projectRow); // add that tr to projectTable in libTable

        // CREATE NEW TABLE CELLS FOR project DATA
        // const proectContainer = document.createElement('td');
        const projectCell = document.createElement('div');
        const dueCell = document.createElement('div');
        const priorityCell = document.createElement('div');

        // ASSIGN CELL CLASS NAMES
        projectCell.className = 'project-cell';
        dueCell.className = 'due-cell';
        priorityCell.className = 'priority-cell';

        // ASSIGN CELL DATA FROM project DATA
        projectCell.textContent = projectList[i].title;
        dueCell.textContent = projectList[i].due;
        priorityCell.textContent = projectList[i].priority;

        // CREATE CELLS FOR UI BUTTONS ON ROW FOR project OBJ UPDATING
        const editCell = document.createElement('div'); //
        const deleteCell = document.createElement('div'); //
        const completeCell = document.createElement('div'); //

        // ASSIGN UI CELL CLASSNAMES
        editCell.className = 'edit-cell';
        deleteCell.className = 'delete-cell';
        completeCell.className = 'complete-cell'; //

        // CREATE UI BUTTONS FOR project UPDATES, ASSIGN CLASS, APPEND TO UI CELL
        const projEditBtn = document.createElement('button');
        projEditBtn.className = 'edit-btn';
        projEditBtn.innerHTML = '<p>edit</p>';
        editCell.appendChild(projEditBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<p>delete</p>';
        deleteCell.appendChild(deleteBtn);
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.innerHTML = '<p>complete</p>';
        completeCell.appendChild(completeBtn);

        // APPEND CELLS TO THE project TROW
        projectRow.appendChild(projectCell);
        projectRow.appendChild(dueCell);
        projectRow.appendChild(priorityCell);
        projectRow.appendChild(editCell);
        projectRow.appendChild(deleteCell);
        projectRow.appendChild(completeCell);

        // ON CLICK, projEDITBTN SETS EDITING STATE,
        // GRABS OBJECT DATA THROUGH DATA-ID REFERENCE ON ITS project ROW,
        // POPULATES A FORM CONTAINING THE OBJ'S DATA BY PASISNG THAT DATA TO DISPLAYFORM()
        projEditBtn.addEventListener('click', () => {
          const editing = true;
          const currentProjectEdit = projectRow.getAttribute('data-id');
          const editTitle = projectList[currentProjectEdit].title;
          const editDue = projectList[currentProjectEdit].due;
          const editPriority = projectList[currentProjectEdit].priority;
          displayProjectForm(
            editing,
            editTitle,
            editDue,
            editPriority,
            currentProjectEdit,
          );
        });
        // projectDelete(deleteBtn);
        // projectComplete(completeBtn);
        projectRow.addEventListener('click', (e) => {
          const getProj = e.target;
          if (getProj.tagName === 'DIV') {
            const currentProjectDisplay = getProj.parentNode.getAttribute('data-id');
            getCurrent(currentProjectDisplay);
            console.log(getProj.tagName);
            displayTasks(currentProjectDisplay);
          }
        });
        // displayTasks(i);
      }
      // const selectProject = document.getElementsByClassName('project-row');
      // console.log(selectProject);
      // selectProject.addEventListener("click", (e) => {
      //   const getProj = e.target;
      //   console.log(getProj)
      // const currentProjectDisplay = getProj.parentNode.getAttribute("data-id");
      // displayTasks(currentProjectDisplay);
      // console.log(currentProjectDisplay);
      // currentProject = projectList[currentProjectDisplay];
      // return currentProject;
      // });
    };
    displayProjects();
    // CREATE TABLE ELEMENTS AND LOOP TASKLIST[] AND SEND EACH OBJS DATA TO TABLE FIELDS.
    // ADD EDITBTN FUNCTIONALITY
    const displayTasks = (a) => {
      console.log(a);
      taskTable.innerHTML = ''; // clears current taskTable to avoid repeats
      const taskHeader = document.createElement('thead');
      taskHeader.id = 'task-header';
      taskHeader.textContent = projectList[a].title;
      taskTable.appendChild(taskHeader);
      // LOOP THROUGH taskList[]
      for (let i = 0; i < projectList[a].tasks.length; i += 1) {
        // CREATE NEW TASK ROW FOR OBJ IN projectList[0].tasks[i]
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
        taskCell.textContent = projectList[a].tasks[i].task;
        notesCell.textContent = projectList[a].tasks[i].notes;
        dueCell.textContent = projectList[a].tasks[i].due;
        priorityCell.textContent = projectList[a].tasks[i].priority;

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
        // if (b === 'task') {
        //   taskRow.appendChild(notesCell);
        // }
        taskRow.appendChild(dueCell);
        taskRow.appendChild(priorityCell);
        taskRow.appendChild(editCell);
        taskRow.appendChild(deleteCell);
        taskRow.appendChild(completeCell);

        // ON CLICK, EDITBTN SETS EDITING STATE,
        // GRABS OBJECT DATA THROUGH DATA-ID REFERENCE ON ITS TASK ROW,
        // POPULATES A FORM CONTAINING THE OBJ'S DATA BY PASISNG THAT DATA TO DISPLAYFORM()
        editBtn.addEventListener('click', () => {
          console.log(projectList[a]);
          const editing = true;
          const currentTask = taskRow.getAttribute('data-id');
          const editTitle = projectList[a].tasks[currentTask].task;
          const editNotes = projectList[a].tasks[currentTask].notes;
          const editDue = projectList[a].tasks[currentTask].due;
          const editPriority = projectList[a].tasks[currentTask].priority;
          displayForm(
            editing,
            editTitle,
            editNotes,
            editDue,
            editPriority,
            currentTask,
          );
        });
        taskDelete(deleteBtn, a);
        taskComplete(completeBtn, a);
      }
    };
    // FUCNCTIONALITY FOR COMPLETE BUTTON
    const taskComplete = (completeBtn, a) => {
      // IF ANY TASKS EXIST, ADD LISTENER
      if (projectList[a].tasks.length >= 1) {
        completeBtn.addEventListener('click', (e) => {
          // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
          const currentTask = e.target.closest('.task-row').dataset.id;
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  currentProject.tasks[]
          projectList[a].tasks.splice(currentTask, 1);
          displayTasks(a);
          // do something nice like swipe a green check to say good job!
        });
      }
    };

    // FUNCTIONALITY FOR DELETE BUTTON
    const taskDelete = (deleteBtn, a) => {
      // IF ANY TASKS EXIST, ADD LISTENER
      if (projectList[a].tasks.length >= 1) {
        deleteBtn.addEventListener('click', (e) => {
          // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
          const currentTask = e.target.closest('.task-row').dataset.id;
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKlIST[]
          projectList[a].tasks.splice(currentTask, 1);
          displayTasks(a);
        });
      }
    };

    // DISPLAY FORM, USING ARGS PASSED FROM OBJ IF FORM LAUNCHED FORM EDIT BUTTON
    const displayProjectForm = (a, b, c, d, f) => {
      // BLUR BACKGORUND
      pageBox.classList.add('blurred');

      // SET formOverlay ID AND CREATE taskCard AND taskFrom
      formOverlay.id = 'form-overlay-vis';
      const projectCard = document.createElement('div');
      projectCard.id = 'form-card';
      const projectForm = document.createElement('form');
      projectForm.id = 'form-form';
      projectForm.setAttribute('action', '');
      projectForm.setAttribute('method', 'post');

      // CREATE TITLE INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ

      const titleLabel = document.createElement('label');
      titleLabel.setAttribute('for', 'project-title');
      titleLabel.textContent = 'Title';
      const projectTitle = document.createElement('input');
      if (a === true) {
        projectTitle.value = b;
      }
      projectTitle.setAttribute('type', 'text');
      projectTitle.setAttribute('id', 'from-title');
      projectTitle.setAttribute('placeholder', 'project title . . .');
      projectTitle.setAttribute('name', 'project-title');

      // CREATE DUE INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const dueLabel = document.createElement('label');
      dueLabel.setAttribute('for', 'project-due');
      dueLabel.textContent = 'Due date';
      const projectDue = document.createElement('input');
      if (a === true) {
        projectDue.value = c;
      }
      projectDue.setAttribute('id', 'form-due');
      projectDue.setAttribute('type', 'date');
      projectDue.setAttribute('placeholder', 'project due . . .');
      projectDue.setAttribute('name', 'project-due');

      // CREATE PRIORITY INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const priorityLabel = document.createElement('label');
      // priorityLabel.setAttribute('for', 'project-priority');
      priorityLabel.textContent = 'Priority';
      // CREATE BOX TO HOLD RADIO BUTTONS AND LABELS
      const projectPriorityBox = document.createElement('div');
      if (a === true) {
        projectPriorityBox.value = d;
      }

      // CREATE LOW PRIORITY RADIO BUTTON
      const lowLabel = document.createElement('label');
      lowLabel.setAttribute('for', 'low-priority');
      lowLabel.textContent = 'low';
      const lowPriority = document.createElement('input');
      lowPriority.id = 'low-priority';
      lowPriority.setAttribute('type', 'radio');
      lowPriority.setAttribute('name', 'project-priority');
      lowPriority.setAttribute('value', 'low');
      // CHECK LOW IF EDITING AND VALUE OF CURRENT OBJ IS LOW
      if (projectPriorityBox.value === 'low') {
        lowPriority.checked = true;
      }
      projectPriorityBox.appendChild(lowLabel);
      projectPriorityBox.appendChild(lowPriority);

      // CREATE MEDIUM PRIORITY RADIO BUTTON
      const mediumLabel = document.createElement('label');
      mediumLabel.setAttribute('for', 'medium-priority');
      mediumLabel.textContent = 'medium';
      const mediumPriority = document.createElement('input');
      mediumPriority.id = 'medium-priority';
      mediumPriority.setAttribute('type', 'radio');
      mediumPriority.setAttribute('name', 'project-priority');
      mediumPriority.setAttribute('value', 'medium');
      // CHECK MEDIUM IF EDITING AND VALUE OF CURRENT OBJ IS MEDIUM
      if (projectPriorityBox.value === 'medium') {
        mediumPriority.checked = true;
      }
      projectPriorityBox.appendChild(mediumLabel, mediumPriority);
      projectPriorityBox.appendChild(mediumPriority);

      // CREATE HIGH PRIORITY RADIO BUTTON
      const highLabel = document.createElement('label');
      highLabel.setAttribute('for', 'high-priority');
      highLabel.textContent = 'high';
      const highPriority = document.createElement('input');
      highPriority.id = 'high-priority';
      highPriority.setAttribute('type', 'radio');
      highPriority.setAttribute('name', 'project-priority');
      highPriority.setAttribute('value', 'high');
      // CHECK HIGH IF EDITING AND VALUE OF CURRENT OBJ IS HIGH
      if (projectPriorityBox.value === 'high') {
        highPriority.checked = true;
      }
      projectPriorityBox.appendChild(highLabel, highPriority);
      projectPriorityBox.appendChild(highPriority);

      // CREATE SUBMIT BUTTON, SELECT LABEL BASED ON EDITING STATE
      const submitLabel = document.createElement('label');
      submitLabel.setAttribute('for', 'project-submit');
      const projectSubmit = document.createElement('button');
      if (a === true) {
        projectSubmit.textContent = 'Update project';
      } else {
        projectSubmit.textContent = 'Add project';
      }
      projectSubmit.setAttribute('id', 'form-submit');
      projectSubmit.setAttribute('type', 'submit');
      projectSubmit.setAttribute('name', 'project-submit');

      // ADD project INPUTS TO FORM AND FORM TO PAGE
      projectForm.append(titleLabel, projectTitle);
      projectForm.append(dueLabel, projectDue);
      projectForm.append(priorityLabel, projectPriorityBox);
      projectForm.append(submitLabel, projectSubmit);
      projectCard.appendChild(projectForm);
      formOverlay.appendChild(projectCard);

      // SUBMIT FUNCTIONALITY
      projectForm.addEventListener('submit', (e) => {
        // STOPS SUBMIT FROM SENDING DATA TO SEVER BY DEFAULT
        e.preventDefault();
        const currentPosition = f;
        // PULL ALL RADIO INPUTS BY NAME INTO submitPriority[]
        const submitPriotiry = document.getElementsByName('project-priority');
        // LOOP THROUGH PRIORITY BUTTONS
        for (let i = 0; i < submitPriotiry.length; i += 1) {
          // IF ONE IS CHECKED, projectPriorityBox IS ASSIGNED THAT VALUE
          if (submitPriotiry[i].checked === true) {
            const priority = submitPriotiry[i].value;
            projectPriorityBox.value = priority;
          }
        }

        // IF EDITING AN ESTABLISHED project, UPDATE THAT OBJ'S (g's) VALUE
        if (a === true) {
          projectList[currentPosition].title = projectTitle.value;
          projectList[currentPosition].due = projectDue.value;
          projectList[currentPosition].priority = projectPriorityBox.value;
          displayTasks(currentPosition);
        // ELSE, CREAT A NEW OBJECT WITH THESE VALUES AND PUSH IT TO projectList[]
        } else {
          const projectObj = newProject(
            projectTitle.value,
            projectDue.value,
            projectPriorityBox.value,
          );
          projectList.push(projectObj);
        }
        // ASSIGNS THE HIDDEN ID TO HIDE THE OVERLAY
        formOverlay.setAttribute('id', 'form-overlay');
        // REMOVES THE FORM CARD FROM THE OVERLAY
        formOverlay.removeChild(projectCard);
        // REMOVES BLUE FROM BACKGROUND
        removeBlur(pageBox);
        // PUTS project OBJECT DATA INTO DOM TABLE
        displayProjects();
        displayTasks(currentPosition);
        console.log(currentPosition);
      });
      return projectCard;
    };

    // DISPLAY FORM, USING ARGS PASSED FROM OBJ IF FORM LAUNCHED FORM EDIT BUTTON
    const displayForm = (a, b, c, d, f, g) => {
      // BLUR BACKGORUND
      // if (addNew.hasChildNodes()) {
      //   const selectBox = document.getElementById('select-box');
      //   selectBox.remove();
      // }

      pageBox.classList.add('blurred');

      // SET formOverlay ID AND CREATE taskCard AND taskFrom
      formOverlay.id = 'form-overlay-vis';
      const taskCard = document.createElement('div');
      taskCard.id = 'form-card';
      const taskForm = document.createElement('form');
      taskForm.id = 'form-form';
      taskForm.setAttribute('action', '');
      taskForm.setAttribute('method', 'post');
      // ------------------------------------------------------------
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
      taskTitle.setAttribute('id', 'form-title');
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
      taskDescription.setAttribute('id', 'form-description');
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
      taskDue.setAttribute('id', 'form-due');
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
      formOverlay.appendChild(taskCard);

      // SUBMIT FUNCTIONALITY
      taskForm.addEventListener('submit', (e) => {
        // STOPS SUBMIT FROM SENDING DATA TO SEVER BY DEFAULT
        e.preventDefault();
        // PULL ALL RADIO INPUTS BY NAME INTO submitPriority[]
        const submitPriotiry = document.getElementsByName('task-priority');
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
          projectList[g].tasks[currentPosition].task = taskTitle.value;
          projectList[g].tasks[currentPosition].notes = taskDescription.value;
          projectList[g].tasks[currentPosition].due = taskDue.value;
          projectList[g].tasks[currentPosition].priority = taskPriorityBox.value;
          // ELSE, CREAT A NEW OBJECT WITH THESE VALUES AND PUSH IT TO projectList[g].tasks[]
        } else {
          const taskObj = newTask(
            taskTitle.value,
            taskDescription.value,
            taskDue.value,
            taskPriorityBox.value,
          );
          currentProject.tasks.push(taskObj);
        }
        // ASSIGNS THE HIDDEN ID TO HIDE THE OVERLAY
        formOverlay.setAttribute('id', 'form-overlay');
        // REMOVES THE FORM CARD FROM THE OVERLAY
        formOverlay.removeChild(taskCard);
        // REMOVES BLUE FROM BACKGROUND
        removeBlur(pageBox);
        // PUTS TASK OBJECT DATA INTO DOM TABLE
        displayTasks(projectList.indexOf(currentProject));
        // console.log(projectList.indexOf(currentProject));
      });
      return taskCard;
    };
    let selecting = null;
    // CREATE NEW TASK FORM HANDLER
    addNew.addEventListener('click', () => {
      if (selecting === true) { return; }
      selecting = true;

      const selectBox = document.createElement('div');
      selectBox.id = 'select-box';
      const projectSelect = document.createElement('button');
      projectSelect.textContent = 'New Project';
      projectSelect.id = 'project-select';
      const taskSelect = document.createElement('button');
      taskSelect.textContent = 'New Task';
      projectSelect.id = 'task-select';
      selectBox.appendChild(projectSelect);
      selectBox.appendChild(taskSelect);
      addBox.appendChild(selectBox);
      taskSelect.addEventListener('click', () => {
        selectBox.remove();
        selecting = false;
        displayForm();
      });
      projectSelect.addEventListener('click', () => {
        selecting = false;
        selectBox.remove();
        displayProjectForm();
      });
    });

    const clickout = (() => {
      // PUTS A CLICK LISTENER ON OVERLAY BACKGROUND FOR CLICKOUT
      formOverlay.addEventListener('mousedown', (e) => {
        const card = document.getElementById('form-card');
        // MAKE clickSpot = tTHE TARGET EVENT
        const clickSpot = e.target;
        // IF CLICK HAPPENED ON formOverlay, I.E OUTSIDE THE FORM
        if (clickSpot.id === 'form-overlay-vis') {
          // SET OVERLAY TO HIDDEN ID
          formOverlay.id = 'form-overlay';
          // REMOVE BLUR
          removeBlur(pageBox);
          // REMOVE CARD FROM OVERLAY
          formOverlay.removeChild(card);
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
