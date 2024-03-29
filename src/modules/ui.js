import newProject from './project';

import newTask from './to-do';

// CREATE MAIN HTML DIVS

// SET AN INTIAL DEFAULT PROJECT TO DISPLAY
const projectList = [];
const myProject = {
  title: 'My Project',
  due: undefined,
  priority: 'low',
  tasks: [],
  complete: [],
};

// SET DEAULT PROJECT AS CURRENT
let currentProject = projectList[0];

// UPDATE CURRENT
const setCurrent = (a) => {
  currentProject = projectList[a];
};

// if locastorage exists, projectList = a
const loadFromStorage = (a) => {
  if (!(a === null)) {
    for (let i = 0; i < a.length; i += 1) {
      projectList.push(a[i]);
    }
    setCurrent(0);
  } else if (a === null) {
    projectList.push(myProject);
    setCurrent(0);
  }
};
// projectStorage RETRIEVES projectList[] DATA STORED IN localStorage
// JSON.parse takes the array saved as text and
// converts it back to an array retaining is values and objects
const projectStorage = JSON.parse(localStorage.getItem('projectList'));
// loadFromStorage updates projectList[] with stored data, if any exists
loadFromStorage(projectStorage);

let projectOptionsSelecting = false;

const updateProjectSelecting = (a) => {
  projectOptionsSelecting = a;
};

const content = document.getElementById('content');
// LOAD HANDLES UI
const load = () => {
  const pageBox = document.createElement('div');
  pageBox.id = 'page-box';

  const main = document.createElement('div');
  main.id = 'main';

  const taskTableHolder = document.createElement('div');
  taskTableHolder.id = 'task-table-holder';
  const taskTable = document.createElement('table');
  taskTable.id = 'task-table';
  taskTableHolder.appendChild(taskTable);
  // NEW CODE TO CREATE A COMPLETE TABLE UNDER THE TASK TABLE TO HOLD COMPLETED TASKS
  // const completeTableHolder = document.createElement('div');
  // completeTableHolder.id = 'complete-table-holder';
  const completeTable = document.createElement('table');
  completeTable.id = 'complete-table';
  taskTableHolder.appendChild(completeTable);
  main.appendChild(taskTableHolder);

  const sideBar = document.createElement('div');
  sideBar.id = 'side-bar';

  const projectTableHolder = document.createElement('div');
  projectTableHolder.id = 'project-table-holder';
  const projectTable = document.createElement('table');
  projectTable.id = 'project-table';
  projectTableHolder.appendChild(projectTable);
  sideBar.appendChild(projectTableHolder);

  // HEAD AND ITS CONTENT - AN ICON AND SOME TEXT
  const head = document.createElement('div');
  head.id = 'head';
  // A CONTAINER
  const headHolder = document.createElement('div');
  headHolder.setAttribute('id', 'head-holder');
  // THE ICON FROM FontAwesome
  const headIcon = document.createElement('i');
  headIcon.classList.add('fa-solid', 'fa-list-check', 'head-icon');
  // SOME TEXT
  const headText = document.createElement('div');
  headText.setAttribute('id', 'head-text');
  headText.textContent = 'to do';
  // APPEND IT ALL
  headHolder.appendChild(headIcon);
  headHolder.appendChild(headText);
  head.appendChild(headHolder);

  // FOOT AND ITS CONTENT - AN ICON W/ LINK AND SOME TEXT
  const foot = document.createElement('div');
  foot.id = 'foot';
  // A CONTAINER
  const footHolder = document.createElement('div');
  footHolder.setAttribute('id', 'foot-holder');
  // A CONTAINER FOR THE ICON THAT IS THE <a> LINK TO REPO
  const footIconHolder = document.createElement('a');
  footIconHolder.href = 'https://github.com/lukespicknall/todo-list';
  footIconHolder.setAttribute('target', '_blank');
  // THE ICON FROM FontAwesome
  const footGitIcon = document.createElement('i');
  footGitIcon.classList.add('fa-brands', 'fa-github', 'foot-icon');
  // SOME TEXT
  const footText = document.createElement('div');
  footText.setAttribute('id', 'foot-text');
  footText.textContent = '2023 Luke Spicknall';
  // APPEND IT ALL TO FOOT
  footIconHolder.appendChild(footGitIcon);
  footHolder.appendChild(footIconHolder);
  footHolder.appendChild(footText);
  foot.appendChild(footHolder);

  pageBox.append(main, sideBar, head, foot);

  // CREATE addNew BUTTON
  const addBox = document.createElement('div');
  addBox.id = 'add-box';
  addBox.setAttribute('title', 'Add a new project or task');
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

    // PROJECT DISPLAY LOGIC
    const displayProjects = () => {
      if (projectList.length === 0) {
        // CREAT NEW addINstructions DIV
        const setAddInstrux = document.createElement('div');
        // ASSSIGN IT SAME ID AS USED IN displayTasks() FOR SIMILAR STYLING
        setAddInstrux.setAttribute('id', 'add-instructions');
        // ADD IT TO THE SAME SPOT IN taskTableHolder
        taskTableHolder.appendChild(setAddInstrux);
        // SET NEW addInstructions DIV TEXT
        setAddInstrux.textContent = 'click the + button to add a project';
      }
      // THE ACTUAL FUNCTION BELOW
      projectTable.innerHTML = ''; // clears current projectTable to avoid repeats
      const projectHeader = document.createElement('thead');
      projectHeader.id = 'project-header';
      projectHeader.textContent = 'Projects';
      projectTable.appendChild(projectHeader);
      // LOOP THROUGH projectList[]
      for (let i = 0; i < projectList.length; i += 1) {
        // CREATE NEW project ROW FOR OBJ IN projectList[i]
        const projectRow = document.createElement('div');
        projectRow.className = 'project-row';
        projectRow.setAttribute('data-id', [i]); // row assigned data-id that is its posiition in projectList[]
        projectTable.appendChild(projectRow); // add that tr to projectTable in libTable

        // CREATE NEW TABLE CELLS FOR project DATA
        const projectTitleCell = document.createElement('div');
        const projectDueCell = document.createElement('div');
        const projectPriorityCell = document.createElement('div');

        // ASSIGN CELL CLASS NAMES
        projectTitleCell.className = 'project-title-cell';
        projectDueCell.className = 'project-due-cell';
        projectPriorityCell.className = 'project-priority-cell';

        // ASSIGN CELL DATA FROM project DATA
        projectTitleCell.textContent = projectList[i].title;
        projectDueCell.textContent = projectList[i].due;
        // IF PROJECT HAS NO due DATA, SET PLACEHOLDER TEXT/STYLE
        if (projectList[i].due === undefined || projectList[i].due === '') {
          projectDueCell.textContent = 'no due date';
          projectDueCell.classList.add('project-dueless');
        }
        projectPriorityCell.textContent = projectList[i].priority;
        // IF PROJECT HAS NO priority DATA SET PLACEHOLDER TEXT/STYLE
        if (projectList[i].priority === undefined) {
          projectPriorityCell.textContent = 'no priority';
          projectPriorityCell.classList.add('project-priorityless');
        }
        // APPLY PRIORITY CLASS
        if (projectPriorityCell.textContent === 'low') {
          projectPriorityCell.classList.add('project-low');
        } else if (projectPriorityCell.textContent === 'medium') {
          projectPriorityCell.classList.add('project-medium');
        } else if (projectPriorityCell.textContent === 'high') {
          projectPriorityCell.classList.add('project-high');
        }

        // CREATE OPTIONS CONTAINER DIV
        const projectOptions = document.createElement('div');
        projectOptions.classList.add('project-options');
        projectOptions.setAttribute('data-id', [i]);
        projectOptions.setAttribute('title', 'Project options');
        // PULL font-awesome MENU ICON
        const projectOptionsIcon = document.createElement('i');
        projectOptionsIcon.classList.add(
          'fa',
          'fa-solid',
          'fa-ellipsis-vertical',
        );
        projectOptions.appendChild(projectOptionsIcon);
        // CREATE POPOUT CONTAINER FOR OPTIONS BUTTONS
        const projectOptionsBox = document.createElement('div');
        projectOptionsBox.classList.add('project-options-box');
        projectOptionsBox.setAttribute('data-id', [i]);
        // WHEN MENU CLICKED, DETERMINE IF AN OPTIONSBOX IS ALREADY PRESENT
        // IF TRUE, SET SELECTING STATE TO TRUE, APPEND A BOX TO THIS OPTIONS DIV TO SEE OPTIONS
        // SET CURRENT PROJECT TO THIS PROJECT AND DISPLAY THE TASKS OF THIS PROJECT
        projectOptions.addEventListener('mouseup', () => {
          if (projectOptions.children.length < 2) {
            updateProjectSelecting(true);
            projectOptions.appendChild(projectOptionsBox);
            setCurrent(i);
            displayTasks(i);
          }
        });

        // CREATE CELLS FOR UI BUTTONS ON ROW FOR project OBJ UPDATING
        const projectEditCell = document.createElement('div'); //
        const projectDeleteCell = document.createElement('div'); //
        const projectCompleteCell = document.createElement('div'); //

        // ASSIGN UI CELL CLASSNAMES
        projectEditCell.className = 'project-edit-cell';
        projectDeleteCell.className = 'project-delete-cell';
        projectCompleteCell.className = 'project-complete-cell'; //

        // CREATE UI BUTTONS FOR project UPDATES, ASSIGN CLASS,
        // APPEND fontAwesome ICONS TO BUTTONS, APPEND BUTTON TO UI CELL
        const projEditBtn = document.createElement('button');
        projEditBtn.className = 'project-edit-btn';
        projEditBtn.innerHTML = 'edit';
        const projEditIcon = document.createElement('i');
        projEditIcon.classList.add(
          'fa',
          'fa-proj-opt',
          'fa-regular',
          'fa-pen-to-square',
        );
        projEditBtn.appendChild(projEditIcon);
        projectEditCell.appendChild(projEditBtn);
        const projDeleteBtn = document.createElement('button');
        projDeleteBtn.className = 'project-delete-btn';
        projDeleteBtn.innerHTML = 'delete';
        const projDeleteIcon = document.createElement('i');
        projDeleteIcon.classList.add(
          'fa',
          'fa-proj-opt',
          'fa-regular',
          'fa-trash-can',
        );
        projDeleteBtn.appendChild(projDeleteIcon);
        projectDeleteCell.appendChild(projDeleteBtn);
        const projCompleteBtn = document.createElement('button');
        projCompleteBtn.className = 'project-complete-btn';
        projCompleteBtn.innerHTML = 'complete';
        const projCompleteIcon = document.createElement('i');
        projCompleteIcon.classList.add(
          'fa',
          'fa-proj-opt',
          'fa-regular',
          'fa-square-check',
        );
        projCompleteBtn.appendChild(projCompleteIcon);
        projectCompleteCell.appendChild(projCompleteBtn);

        projectOptionsBox.append(
          projectEditCell,
          projectDeleteCell,
          projectCompleteCell,
        );

        // APPEND CELLS TO THE project TROW
        projectRow.appendChild(projectTitleCell);
        projectRow.appendChild(projectDueCell);
        projectRow.appendChild(projectPriorityCell);
        projectRow.appendChild(projectOptions);

        // ON CLICK, projEditBtn SETS EDITING STATE,
        // GRABS OBJECT DATA THROUGH DATA-ID REFERENCE ON ITS project ROW,
        // POPULATES A FORM CONTAINING THE OBJ'S DATA BY PASISNG THAT DATA TO displayForm()
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

        // CALL THE DELETE AND COMPLETE FUNCTIONS PASSING THIER BUTTONS AS ARGS
        projectDelete(projDeleteBtn);
        projectComplete(projCompleteBtn);

        // ROW LISTENER THAT SETS THE CLICKED PROJECT AS CURRENT AND DISPLAYS ITS TASKS
        projectRow.addEventListener('click', (e) => {
          const getProj = e.target;
          if (getProj.className === 'project-row') {
            const currentProjectDisplay = getProj.getAttribute('data-id');
            setCurrent(currentProjectDisplay);
            displayTasks(currentProjectDisplay);
          } else if (getProj.tagName === 'DIV') {
            const currentProjectDisplay = getProj.parentNode.getAttribute('data-id');
            setCurrent(currentProjectDisplay);
            displayTasks(currentProjectDisplay);
          }
        });
      }
    };

    //  **  LOGIC TO COMPLETE AND DELETE PROJECTS AND ALTER DISPLAYS **  //
    const projectComplete = (projCompleteBtn) => {
      projCompleteBtn.addEventListener('click', (e) => {
        updateProjectSelecting(false);
        // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
        const currentComplete = e.target.closest('.project-row').dataset.id;
        // IF MORE THAN 1 PROJ AND DELETING 1st PROJ, SHOW NEXT PROJ IN []
        // THIS WAS WEIRD - I COULDNT US currentDelete === 0 IT HAD TO BE < 1 ???
        if (projectList.length > 1 && currentComplete < 1) {
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKIST[]
          projectList.splice(currentComplete, 1);
          // RUNS FUNCTIONS WITH THAT ARRAT POSITION AARGUMENT
          setCurrent(currentComplete);
          displayProjects();
          displayTasks(currentComplete);
          // IF MORE THAN 1 PROJ, SHOW PROJ IN CURRENT POSITION -1
        } else if (projectList.length > 1) {
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKlIST[]
          projectList.splice(currentComplete, 1);
          // SET A POSITION OF 1 BEHIND CURRENT ARRAY POSITION
          const positionAfterCcurrentComplete = currentComplete - 1;
          // RUNS FUNCTIONS WITH THAT ARRAT POSITION AARGUMENT
          setCurrent(positionAfterCcurrentComplete);
          displayProjects();
          displayTasks(positionAfterCcurrentComplete);
          // IF THERE IS 1 PROJ AND IT HAS TASKS, ADD A addInstrux DIV BACK TO HOLD TEXT
          // BEACAUSE WHEN A TASK IS PRESENT, addInstrux DIV IS REMOVED UP IN displayTasks
        } else if (
          projectList.length === 1
          && projectList[currentComplete].tasks.length > 0
        ) {
          // CREAT NEW addINstructions DIV
          const setAddInstrux = document.createElement('div');
          // ASSSIGN IT SAME ID AS USED IN displayTasks() FOR SIMILAR STYLING
          setAddInstrux.setAttribute('id', 'add-instructions');
          // ADD IT TO THE SAME SPOT IN taskTableHolder
          taskTableHolder.appendChild(setAddInstrux);
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  projectList[]
          projectList.splice(currentComplete, 1);
          // SET NEW addInstructions DIV TEXT
          setAddInstrux.textContent = 'click the + button to add a project';
          // NO NEED FOR ARGUMENTS AS USER HAS JUST CcurrentCompleteD THE ONLY REMAINING PROJECT
          displayProjects();
          displayTasks();
          // IF USER IS DELETING THE ONLY REMAINING PROJECT, AND IT HAS NO TASKS
        } else if (projectList.length === 1) {
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  currentProject.tasks[]
          projectList.splice(currentComplete, 1);
          // GRABS THE EXISTING addInstructions AS NO TASKS HAVE REMOVED IT
          const addProjInstrux = document.getElementById('add-instructions');
          // APPLIES APPRORIATE TEXT
          addProjInstrux.textContent = 'click the + button to add a project';
          // NO NEED FOR ARGUMENTS AS USER HAS JUST CcurrentCompleteD THE ONLY REMAINING PROJECT
          displayProjects();
          displayTasks();
        }
        localStorage.setItem('projectList', JSON.stringify(projectList));
      });
    };

    const projectDelete = (projDeleteBtn) => {
      projDeleteBtn.addEventListener('click', (e) => {
        updateProjectSelecting(false);
        // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
        const currentDelete = e.target.closest('.project-row').dataset.id;
        // IF MORE THAN 1 PROJ AND DELETING 1st PROJ, SHOW NEXT PROJ IN []
        // THIS WAS WEIRD - I COULDNT US currentDelete === 0 IT HAD TO BE < 1 ???
        if (projectList.length > 1 && currentDelete < 1) {
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKIST[]
          projectList.splice(currentDelete, 1);
          // RUNS FUNCTIONS WITH THAT ARRAT POSITION AARGUMENT
          setCurrent(currentDelete);
          displayProjects();
          displayTasks(currentDelete);
          // IF MORE THAN 1 PROJ, SHOW PROJ IN CURRENT POSITION -1
        } else if (projectList.length > 1) {
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  projectList[]
          projectList.splice(currentDelete, 1);
          // SET A POSITION OF 1 BEHIND CURRENT ARRAY POSITION - I DONT FULLY UNDERSTAND WHY
          const positionAfterDelete = currentDelete - 1;
          // RUNS FUNCTIONS WITH THAT ARRAT POSITION AARGUMENT
          setCurrent(positionAfterDelete);
          displayProjects();
          displayTasks(positionAfterDelete);
          // IF THERE IS 1 PROJ AND IT HAS TASKS, ADD A addInstrux DIV BACK TO HOLD TEXT
          // BEACAUSE WHEN A TASK IS PRESENT, addInstrux DIV IS REMOVED UP IN displayTasks
        } else if (
          projectList.length === 1
          && projectList[currentDelete].tasks.length > 0
        ) {
          // CREAT NEW addINstructions DIV
          const setAddInstrux = document.createElement('div');
          // ASSSIGN IT SAME ID AS USED IN displayTasks() FOR SIMILAR STYLING
          setAddInstrux.setAttribute('id', 'add-instructions');
          // ADD IT TO THE SAME SPOT IN taskTableHolder
          taskTableHolder.appendChild(setAddInstrux);
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  projectList[]
          projectList.splice(currentDelete, 1);
          // SET NEW addInstructions DIV TEXT
          setAddInstrux.textContent = 'click the + button to add a project';
          // NO NEED FOR ARGUMENTS AS USER HAS JUST DELETED THE ONLY REMAINING PROJECT
          displayProjects();
          displayTasks();
          // IF USER IS DELETING THE ONLY REMAINING PROJECT, AND IT HAS NO TASKS
        } else if (projectList.length === 1) {
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  currentProject.tasks[]
          projectList.splice(currentDelete, 1);
          // GRABS THE EXISTING addInstructions AS NO TASKS HAVE REMOVED IT
          const addProjInstrux = document.getElementById('add-instructions');
          // APPLIES APPRORIATE TEXT
          addProjInstrux.textContent = 'click the + button to add a project';
          // NO NEED FOR ARGUMENTS AS USER HAS JUST DELETED THE ONLY REMAINING PROJECT
          displayProjects();
          displayTasks();
        }
        localStorage.setItem('projectList', JSON.stringify(projectList));
      });
    };
    // RUN displayProjects(), EMPTY IF NO STORAGE EXISTS
    if (projectStorage === null) {
      displayProjects(0);
    } else {
      displayProjects();
    }

    // CREATE TABLE ELEMENTS AND LOOP projectList[] AND SEND EACH OBJS DATA TO TABLE FIELDS.
    // LOGIC TO DETERMINE WHEN addInstrux GET ADDED OR REMOVED BASED ON TASK PRESENCE
    // ADD EDITBTN LOGIC
    const displayTasks = (a) => {
      // IF - SO IT DOESNT TRY TO PULL PROJ DATA IS NONE EXISTS BECUZ LAST ONE WAS DELETE/COMPLETED
      if (projectList.length <= 0) {
        taskTable.innerHTML = '';
        completeTable.innerHTML = '';
      } else {
        // THE ACTUAL DISPLAY TASKS CODE
        // clears current taskTable to avoid repeats
        taskTable.innerHTML = '';
        const taskHeader = document.createElement('thead');
        taskHeader.id = 'task-header';
        taskHeader.textContent = projectList[a].title;
        taskTable.appendChild(taskHeader);
        const addIntructions = document.createElement('div');
        addIntructions.setAttribute('id', 'add-instructions');
        if (
          projectList[a].tasks.length === 0
          && projectList[a].complete.length > 0
        ) {
          const noOpenTask = document.createElement('div');
          noOpenTask.setAttribute('id', 'no-open-task');
          noOpenTask.innerHTML = 'no open tasks! click the + button to add one.';
          taskTable.appendChild(noOpenTask);
        }

        // NEW CODE TO CREATE completeTable
        completeTable.innerHTML = '';
        const completeHeader = document.createElement('thead');
        completeHeader.id = 'complete-header';
        if (projectList[a].complete.length === 0) {
          completeHeader.textContent = '';
        } else {
          completeHeader.textContent = 'completed';
        }
        completeTable.appendChild(completeHeader);
        //  **  ADD/REMOVE INSTRUCTIONS LOGIC  **  //
        if (taskTableHolder.children.length > 3) {
          return;
        }
        // TO UPDATE INSTRUX W/ PROJECT TITLE WHEN CLICKING AROUND ON PROJECTS
        // IF >= 1 PROJ, CURRENT PROJ HAS NO TASKS, THE INSTRUX ARE CURRENTLY SHOWING FORM PREV PROJ
        // GRAB ELEMENTS FROM DOM, REMOVE CURRENT INSTRUX, CHANGE TEXT, ADD NEW INSTRUX
        if (
          projectList.length >= 1
          && currentProject.tasks.length === 0
          && currentProject.complete.length === 0
          && taskTableHolder.children.length > 2
        ) {
          const instructionsRemove = document.getElementById('add-instructions');
          const tabletest = document.getElementById('task-table-holder');
          tabletest.removeChild(instructionsRemove);
          addIntructions.textContent = `click the + button to add a task to ${currentProject.title}.`;
          taskTableHolder.appendChild(addIntructions);
        }
        // FOR INITIAL LOAD AND DELETING LAST TASK IN PROJ,
        // IF PROJECT HAS NO TASKS, PUT TITLE IN TEXT AND SHOW INSTRUX
        // THIS ADD INSTRUX ON LOAD AND WHEN ALL TASKS ARE DELETED FROM PROJ
        if (
          currentProject.tasks.length === 0
          && currentProject.complete.length === 0
        ) {
          addIntructions.textContent = `click the + button to add a task to ${currentProject.title}.`;
          taskTableHolder.appendChild(addIntructions);
          // IF PROJ HAS TASKS, AND INTRUX ARE SHOWING, REMOVE INSTRUX
          // THIS BASICALLY GETS RID OF INSTRUX DIV WHEN FIRST TASK IS ADDED, AND ONLY THEN
        } else if (
          (currentProject.tasks.length >= 1
            || currentProject.complete.length >= 1)
            && taskTableHolder.children.length > 2
        ) {
          const instructionsRemove = document.getElementById('add-instructions');
          const tabletest = document.getElementById('task-table-holder');
          tabletest.removeChild(instructionsRemove);
        }

        // LOOP THROUGH projectList[]
        for (let i = 0; i < projectList[a].tasks.length; i += 1) {
          // CREATE NEW TASK ROW FOR OBJ IN projectList[a].tasks[i]
          const taskRow = document.createElement('tr');
          taskRow.className = 'task-row';
          taskRow.setAttribute('data-id', [i]); // row assigned data-id that is its posiition in taskLisy[]
          taskTable.appendChild(taskRow); // add that tr to taskTable in libTable

          // CREATE NEW TABLE CELLS FOR TASK DATA
          const taskCell = document.createElement('div');
          const notesCell = document.createElement('div');
          const dueCell = document.createElement('div');
          const priorityCell = document.createElement('div');

          // ASSIGN CELL CLASS NAMES
          taskCell.className = 'task-cell';
          notesCell.className = 'notes-cell';
          dueCell.className = 'due-cell';
          priorityCell.className = 'priority-cell';

          // GIVE notesCell A TITLE LABEL SO YOU CAN SEE IT EXPANDED IF LONG
          notesCell.setAttribute('title', `${projectList[a].tasks[i].notes}`);

          // ASSIGN CELL DATA FROM TASK DATA
          taskCell.textContent = projectList[a].tasks[i].task;
          notesCell.textContent = projectList[a].tasks[i].notes;
          dueCell.textContent = projectList[a].tasks[i].due;
          if (
            projectList[a].tasks[i].due === undefined
            || projectList[a].tasks[i].due === ''
          ) {
            dueCell.textContent = 'no due date';
            dueCell.classList.add('task-dueless');
          }
          priorityCell.textContent = projectList[a].tasks[i].priority;
          // IF PROJECT HAS NO priority DATA SET PLACEHOLDER TEXT/STYLE
          if (projectList[a].tasks[i].priority === undefined) {
            priorityCell.textContent = 'no priority';
            priorityCell.classList.add('task-priorityless');
          }
          if (priorityCell.textContent === 'low') {
            priorityCell.classList.add('task-low');
          } else if (priorityCell.textContent === 'medium') {
            priorityCell.classList.add('task-medium');
          } else if (priorityCell.textContent === 'high') {
            priorityCell.classList.add('task-high');
          }

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
          editBtn.innerHTML = 'edit';
          const taskEditIcon = document.createElement('i');
          taskEditIcon.classList.add('fa', 'fa-regular', 'fa-pen-to-square');
          editBtn.appendChild(taskEditIcon);
          editCell.appendChild(editBtn);
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.innerHTML = 'delete';
          const taskDeleteIcon = document.createElement('i');
          taskDeleteIcon.classList.add('fa', 'fa-regular', 'fa-trash-can');
          deleteBtn.appendChild(taskDeleteIcon);
          deleteCell.appendChild(deleteBtn);
          const completeBtn = document.createElement('button');
          completeBtn.className = 'complete-btn';
          completeBtn.innerHTML = 'complete';
          const taskCompleteIcon = document.createElement('i');
          taskCompleteIcon.classList.add('fa', 'fa-regular', 'fa-square-check');
          completeBtn.appendChild(taskCompleteIcon);
          completeCell.appendChild(completeBtn);
          const taskOptions = document.createElement('div');
          taskOptions.classList.add('task-options');
          taskOptions.appendChild(editCell);
          taskOptions.appendChild(deleteCell);
          taskOptions.appendChild(completeCell);

          // APPEND CELLS TO THE TASK TROW
          taskRow.appendChild(taskCell);
          taskRow.appendChild(notesCell);
          taskRow.appendChild(dueCell);
          taskRow.appendChild(priorityCell);
          taskRow.appendChild(taskOptions);

          // ON CLICK, EDITBTN SETS EDITING STATE,
          // GRABS OBJECT DATA THROUGH DATA-ID REFERENCE ON ITS TASK ROW,
          // POPULATES A FORM CONTAINING THE OBJ'S DATA BY PASISNG THAT DATA TO displayForm()
          editBtn.addEventListener('click', () => {
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

        for (let i = 0; i < projectList[a].complete.length; i += 1) {
          // CREATE NEW TASK ROW FOR OBJ IN projectList[a].complete[i]
          const completeTaskRow = document.createElement('tr');
          completeTaskRow.className = 'complete-task-row';
          completeTaskRow.setAttribute('data-id', [i]); // row assigned data-id that is its posiition in taskLisy[]
          completeTable.appendChild(completeTaskRow); // add that tr to taskTable in libTable

          // CREATE NEW TABLE CELLS FOR TASK DATA
          const completeTaskCell = document.createElement('div');
          const completeNotesCell = document.createElement('div');
          const completeDueCell = document.createElement('div');
          const completePriorityCell = document.createElement('div');

          // ASSIGN CELL CLASS NAMES
          completeTaskCell.className = 'complete-task-cell';
          completeNotesCell.className = 'complete-notes-cell';
          completeDueCell.className = 'complete-due-cell';
          completePriorityCell.className = 'complete-priority-cell';

          // GIVE completeNotesCell A TITLE LABEL SO YOU CAN SEE IT EXPANDED IF LONG
          completeNotesCell.setAttribute('title', `${projectList[a].complete[i].notes}`);

          // ASSIGN CELL DATA FROM TASK DATA
          completeTaskCell.textContent = projectList[a].complete[i].task;
          completeNotesCell.textContent = projectList[a].complete[i].notes;
          completeDueCell.textContent = projectList[a].complete[i].due;
          if (
            projectList[a].complete[i].due === undefined
            || projectList[a].complete[i].due === ''
          ) {
            completeDueCell.textContent = 'no due date';
            completeDueCell.classList.add('task-dueless');
          }
          completePriorityCell.textContent = projectList[a].complete[i].priority;
          // IF PROJECT HAS NO priority DATA SET PLACEHOLDER TEXT/STYLE
          if (projectList[a].complete[i].priority === undefined) {
            completePriorityCell.textContent = 'no priority';
            completePriorityCell.classList.add('task-priorityless');
          }
          if (completePriorityCell.textContent === 'low') {
            completePriorityCell.classList.add('task-low');
          } else if (completePriorityCell.textContent === 'medium') {
            completePriorityCell.classList.add('task-medium');
          } else if (completePriorityCell.textContent === 'high') {
            completePriorityCell.classList.add('task-high');
          }

          // CREATE CELLS FOR UI BUTTONS ON ROW FOR TASK OBJ UPDATING
          const restoreCell = document.createElement('td'); //
          const completeDeleteCell = document.createElement('td'); //

          // ASSIGN UI CELL CLASSNAMES
          restoreCell.className = 'restore-cell';
          completeDeleteCell.className = 'delete-cell';

          // CREATE UI BUTTONS FOR TASK UPDATES, ASSIGN CLASS, APPEND TO UI CELL
          const restoreBtn = document.createElement('button');
          restoreBtn.className = 'restore-btn';
          restoreBtn.innerHTML = 'restore';
          restoreBtn.title = 'Make task active';
          const taskRestoreIcon = document.createElement('i');
          taskRestoreIcon.classList.add('fa', 'fa-regular', 'fa-pen-to-square');
          restoreBtn.appendChild(taskRestoreIcon);
          restoreCell.appendChild(restoreBtn);
          const completeDeleteBtn = document.createElement('button');
          completeDeleteBtn.className = 'complete-delete-btn';
          completeDeleteBtn.innerHTML = 'delete';
          const taskDeleteIcon = document.createElement('i');
          taskDeleteIcon.classList.add('fa', 'fa-regular', 'fa-trash-can');
          completeDeleteBtn.appendChild(taskDeleteIcon);
          completeDeleteCell.appendChild(completeDeleteBtn);
          const completeTaskOptions = document.createElement('div');
          completeTaskOptions.classList.add('complete-task-options');
          completeTaskOptions.appendChild(restoreCell);
          completeTaskOptions.appendChild(completeDeleteCell);

          // APPEND CELLS TO THE TASK TROW
          completeTaskRow.appendChild(completeTaskCell);
          completeTaskRow.appendChild(completeNotesCell);
          completeTaskRow.appendChild(completeDueCell);
          completeTaskRow.appendChild(completePriorityCell);
          completeTaskRow.appendChild(completeTaskOptions);

          taskDelete(completeDeleteBtn, a);
          taskRestore(restoreBtn, a);
        }
      }
    };

    // LOGIC FOR TASK COMPLETE BUTTON
    const taskComplete = (completeBtn, a) => {
      // IF ANY TASKS EXIST, ADD LISTENER
      if (projectList[a].tasks.length >= 1) {
        completeBtn.addEventListener('click', (e) => {
          // GRABS THE DATA-ID FROM CLOSEST complete-task-row DOM ELEMENT (IT'S PARENT)
          const currentTask = e.target.closest('.task-row').dataset.id;
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  currentProject.tasks[]
          const completeContainer = projectList[a].tasks.splice(currentTask, 1);
          // ADDS TASK TO BEGINNING OF complete[]
          projectList[a].complete.unshift(...completeContainer);
          // projectList[a].tasks[currentTask].complete = true;
          displayTasks(a);
        });
        localStorage.setItem('projectList', JSON.stringify(projectList));
      }
    };

    // LOGIC FOR TASK DELETE BUTTON
    const taskDelete = (deleteBtn, a) => {
      // IF ANY TASKS EXIST, ADD LISTENER
      if (projectList[a].tasks.length >= 1) {
        deleteBtn.addEventListener('click', (e) => {
          if (e.target.className === 'delete-btn') {
            // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
            const currentTask = e.target.closest('.task-row').dataset.id;
            // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKlIST[]
            projectList[a].tasks.splice(currentTask, 1);
            displayTasks(a);
            localStorage.setItem('projectList', JSON.stringify(projectList));
          }
        });
      } if (projectList[a].complete.length >= 1) {
        deleteBtn.addEventListener('click', (e) => {
          if (e.target.className === 'complete-delete-btn') {
          // GRABS THE DATA-ID FROM CLOSEST task-row DOM ELEMENT (IT'S PARENT)
            const currentTask = e.target.closest('.complete-task-row').dataset.id;
            // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  TASKlIST[]
            projectList[a].complete.splice(currentTask, 1);
            displayTasks(a);
            localStorage.setItem('projectList', JSON.stringify(projectList));
          }
        });
      }
    };

    // LOGIC FOR TASK RestoreBUTTON
    const taskRestore = (restoreBtn, a) => {
      // IF ANY TASKS EXIST IN complete, ADD LISTENER
      if (projectList[a].complete.length >= 1) {
        restoreBtn.addEventListener('click', (e) => {
          // GRABS THE DATA-ID FROM CLOSEST restored-task-row DOM ELEMENT (IT'S PARENT)
          const currentTask = e.target.closest('.complete-task-row').dataset.id;
          // REMOVES THAT DATA-ID'S EQUIVILENT[i] POSITION IN  currentProject.complete[]
          const restoreContainer = projectList[a].complete.splice(currentTask, 1);
          // ADDS TASK TO BEGINNING OF tasks[]
          projectList[a].tasks.unshift(...restoreContainer);
          // projectList[a].tasks[currentTask].complete = true;
          displayTasks(a);
        });
        localStorage.setItem('projectList', JSON.stringify(projectList));
      }
    };
    displayTasks(0);

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
      projectTitle.setAttribute('id', 'project-title');
      projectTitle.setAttribute('placeholder', 'project title . . .');
      projectTitle.setAttribute('name', 'project-title');
      projectTitle.setAttribute('maxlength', '20');
      projectTitle.setAttribute('required', 'required');

      // CREATE DUE INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const dueLabel = document.createElement('label');
      dueLabel.setAttribute('for', 'project-due');
      dueLabel.textContent = 'Due date';
      const projectDue = document.createElement('input');
      if (a === true) {
        projectDue.value = c;
      }
      projectDue.setAttribute('id', 'project-due');
      projectDue.setAttribute('type', 'date');
      projectDue.setAttribute('placeholder', 'project due . . .');
      projectDue.setAttribute('name', 'project-due');

      // CREATE PRIORITY INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const priorityLabel = document.createElement('div');
      // priorityLabel.setAttribute('for', 'project-prioritybox');
      // priorityLabel.setAttribute('for', 'project-priority');
      priorityLabel.textContent = 'Priority';
      // CREATE BOX TO HOLD RADIO BUTTONS AND LABELS
      const projectPriorityBox = document.createElement('div');
      projectPriorityBox.setAttribute('id', 'project-priority-box');
      if (a === true) {
        projectPriorityBox.value = d;
      }

      // CREATE LOW PRIORITY RADIO BUTTON
      const lowLabel = document.createElement('label');
      lowLabel.setAttribute('for', 'project-low-priority');
      const lowLabelSpan = document.createElement('span');
      lowLabelSpan.setAttribute('id', 'project-low-span');
      lowLabelSpan.textContent = 'low';
      const lowPriority = document.createElement('input');
      lowPriority.id = 'project-low-priority';
      lowPriority.setAttribute('type', 'radio');
      lowPriority.setAttribute('name', 'project-priority');
      lowPriority.setAttribute('value', 'low');
      // CHECK LOW IF EDITING AND VALUE OF CURRENT OBJ IS LOW
      if (projectPriorityBox.value === 'low') {
        lowPriority.checked = true;
      }
      lowLabel.appendChild(lowPriority);
      lowLabel.appendChild(lowLabelSpan);
      projectPriorityBox.appendChild(lowLabel);

      // CREATE MEDIUM PRIORITY RADIO BUTTON
      const mediumLabel = document.createElement('label');
      mediumLabel.setAttribute('for', 'project-medium-priority');
      const mediumLabelSpan = document.createElement('span');
      mediumLabelSpan.setAttribute('id', 'project-medium-span');
      mediumLabelSpan.textContent = 'medium';
      const mediumPriority = document.createElement('input');
      mediumPriority.id = 'project-medium-priority';
      mediumPriority.setAttribute('type', 'radio');
      mediumPriority.setAttribute('name', 'project-priority');
      mediumPriority.setAttribute('value', 'medium');
      // CHECK MEDIUM IF EDITING AND VALUE OF CURRENT OBJ IS MEDIUM
      if (projectPriorityBox.value === 'medium') {
        mediumPriority.checked = true;
      }
      mediumLabel.appendChild(mediumPriority);
      mediumLabel.appendChild(mediumLabelSpan);
      projectPriorityBox.appendChild(mediumLabel);

      // CREATE HIGH PRIORITY RADIO BUTTON
      const highLabel = document.createElement('label');
      highLabel.setAttribute('for', 'project-high-priority');
      const highLabelSpan = document.createElement('span');
      highLabelSpan.setAttribute('id', 'project-high-span');
      highLabelSpan.textContent = 'high';
      const highPriority = document.createElement('input');
      highPriority.id = 'project-high-priority';
      highPriority.setAttribute('type', 'radio');
      highPriority.setAttribute('name', 'project-priority');
      highPriority.setAttribute('value', 'high');
      // CHECK HIGH IF EDITING AND VALUE OF CURRENT OBJ IS HIGH
      if (projectPriorityBox.value === 'high') {
        highPriority.checked = true;
      }
      highLabel.appendChild(highPriority);
      highLabel.appendChild(highLabelSpan);
      projectPriorityBox.appendChild(highLabel);

      // CREATE SUBMIT BUTTON, SELECT LABEL BASED ON EDITING STATE
      const submitLabel = document.createElement('label');
      submitLabel.setAttribute('for', 'project-submit');
      const projectSubmit = document.createElement('button');
      if (a === true) {
        projectSubmit.textContent = 'Update Project';
      } else {
        projectSubmit.textContent = 'Add Project';
      }
      projectSubmit.setAttribute('id', 'project-submit');
      projectSubmit.setAttribute('type', 'submit');
      projectSubmit.setAttribute('name', 'project-submit');

      // ADD project INPUTS TO FORM AND FORM TO PAGE
      projectForm.append(titleLabel, projectTitle);
      projectForm.append(dueLabel, projectDue);
      projectForm.append(priorityLabel, projectPriorityBox);
      projectForm.append(submitLabel, projectSubmit);
      projectCard.appendChild(projectForm);
      formOverlay.appendChild(projectCard);

      // SUBMIT LOGIC
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

        // IF EDITING AN ESTABLISHED project, UPDATE THAT OBJ'S (f's) VALUE
        if (a === true) {
          projectList[currentPosition].title = projectTitle.value;
          projectList[currentPosition].due = projectDue.value;
          projectList[currentPosition].priority = projectPriorityBox.value;
          setCurrent(currentPosition);
          displayTasks(currentPosition);
          // ELSE, CREAT A NEW OBJECT WITH THESE VALUES AND PUSH IT TO projectList[]
        } else {
          const projectObj = newProject(
            projectTitle.value,
            projectDue.value,
            projectPriorityBox.value,
          );
          projectList.push(projectObj);
          const position = projectList.length - 1;
          setCurrent(position);
          displayTasks(position);
        }
        // ASSIGNS THE HIDDEN ID TO HIDE THE OVERLAY
        formOverlay.setAttribute('id', 'form-overlay');
        // REMOVES THE FORM CARD FROM THE OVERLAY
        formOverlay.removeChild(projectCard);
        // REMOVES BLUE FROM BACKGROUND
        removeBlur(pageBox);
        // PUTS project OBJECT DATA INTO DOM TABLE
        displayProjects();
        localStorage.setItem('projectList', JSON.stringify(projectList));
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
      taskTitle.setAttribute('id', 'task-title');
      taskTitle.setAttribute('placeholder', 'Task title . . .');
      taskTitle.setAttribute('name', 'task-title');
      taskTitle.setAttribute('maxlength', '20');
      taskTitle.setAttribute('required', 'required');

      // CREATE DESCRIPTION INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const descriptionLabel = document.createElement('label');
      descriptionLabel.setAttribute('for', 'task-description');
      descriptionLabel.textContent = 'Description';
      // USE textarea HERE TO CREATE BIGGER/RESIZABLE TEXT BOX
      const taskDescription = document.createElement('textarea');
      if (a === true) {
        taskDescription.value = c;
      }
      taskDescription.setAttribute('id', 'task-description');
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
      const priorityLabel = document.createElement('p');
      // priorityLabel.setAttribute('for', 'task-priority');
      priorityLabel.textContent = 'Priority';
      // CREATE BOX TO HOLD RADIO BUTTONS AND LABELS
      const taskPriorityBox = document.createElement('div');
      taskPriorityBox.setAttribute('id', 'task-priority-box');
      if (a === true) {
        taskPriorityBox.value = f;
      }

      // CREATE LOW PRIORITY RADIO BUTTON
      const lowLabel = document.createElement('label');
      lowLabel.setAttribute('for', 'task-low-priority');
      const lowLabelSpan = document.createElement('span');
      lowLabelSpan.setAttribute('id', 'task-low-span');
      lowLabelSpan.textContent = 'low';
      const lowPriority = document.createElement('input');
      lowPriority.id = 'task-low-priority';
      lowPriority.setAttribute('type', 'radio');
      lowPriority.setAttribute('name', 'task-priority');
      lowPriority.setAttribute('value', 'low');
      // CHECK LOW IF EDITING AND VALUE OF CURRENT OBJ IS LOW
      if (taskPriorityBox.value === 'low') {
        lowPriority.checked = true;
      }
      lowLabel.appendChild(lowPriority);
      lowLabel.appendChild(lowLabelSpan);
      taskPriorityBox.appendChild(lowLabel);

      // CREATE MEDIUM PRIORITY RADIO BUTTON
      const mediumLabel = document.createElement('label');
      mediumLabel.setAttribute('for', 'task-medium-priority');
      const mediumLabelSpan = document.createElement('span');
      mediumLabelSpan.setAttribute('id', 'task-medium-span');
      mediumLabelSpan.textContent = 'medium';
      const mediumPriority = document.createElement('input');
      mediumPriority.id = 'task-medium-priority';
      mediumPriority.setAttribute('type', 'radio');
      mediumPriority.setAttribute('name', 'task-priority');
      mediumPriority.setAttribute('value', 'medium');
      // CHECK MEDIUM IF EDITING AND VALUE OF CURRENT OBJ IS MEDIUM
      if (taskPriorityBox.value === 'medium') {
        mediumPriority.checked = true;
      }
      mediumLabel.appendChild(mediumPriority);
      mediumLabel.appendChild(mediumLabelSpan);
      taskPriorityBox.appendChild(mediumLabel);

      // CREATE HIGH PRIORITY RADIO BUTTON
      const highLabel = document.createElement('label');
      highLabel.setAttribute('for', 'task-high-priority');
      const highLabelSpan = document.createElement('span');
      highLabelSpan.setAttribute('id', 'task-high-span');
      highLabelSpan.textContent = 'high';
      const highPriority = document.createElement('input');
      highPriority.id = 'task-high-priority';
      highPriority.setAttribute('type', 'radio');
      highPriority.setAttribute('name', 'task-priority');
      highPriority.setAttribute('value', 'high');
      // CHECK HIGH IF EDITING AND VALUE OF CURRENT OBJ IS HIGH
      if (taskPriorityBox.value === 'high') {
        highPriority.checked = true;
      }
      highLabel.appendChild(highPriority);
      highLabel.appendChild(highLabelSpan);
      taskPriorityBox.appendChild(highLabel);

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

      // ADD TASK INPUTS TO FORM AND FORM
      taskForm.append(titleLabel, taskTitle);
      taskForm.append(descriptionLabel, taskDescription);
      taskForm.append(dueLabel, taskDue);
      taskForm.append(priorityLabel, taskPriorityBox);
      taskForm.append(submitLabel, taskSubmit);
      taskCard.appendChild(taskForm);
      formOverlay.appendChild(taskCard);

      // SUBMIT LOGIC
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
          currentProject.tasks[currentPosition].task = taskTitle.value;
          currentProject.tasks[currentPosition].notes = taskDescription.value;
          currentProject.tasks[currentPosition].due = taskDue.value;
          currentProject.tasks[currentPosition].priority = taskPriorityBox.value;
          // ELSE, CREAT A NEW OBJECT WITH THESE VALUES AND PUSH IT TO projectList[g].tasks[]
        } else {
          const taskObj = newTask(
            taskTitle.value,
            taskDescription.value,
            taskDue.value,
            taskPriorityBox.value,
            false,
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
        // displayProjects IS CALLED HERE SIMPLY TO UPDATE projectList in a
        // way that local storage feels and also updates so wee keep our new tasks in storage
        displayProjects();
      });
      return taskCard;
    };

    // ESTABLISH VAR USED IN addNew LISTENER TO TELL IF THE POPOUT IS SHOWING
    let selecting;
    // EVENT LISTSNER ON + BUTTON W/ POPOUT TO ADD NEW TASK OR PROJECT
    addNew.addEventListener('click', () => {
      // formOverlay.id = "form-overlay-vis";
      // IF selectBox IS PRESENT, DONT MAKE MORE OF THEM ON CLICK
      if (selecting === true) {
        return;
      }
      // SELECTING STATE IS TRUE UPON CLICK
      selecting = true;

      // CREATE SELECT BUTTONS AND THEIR CONTAINER BOX
      const selectBox = document.createElement('div');
      selectBox.id = 'select-box';
      const projectSelect = document.createElement('button');
      projectSelect.textContent = 'New Project';
      projectSelect.id = 'project-select';
      projectSelect.setAttribute('title', 'Add a project');
      const taskSelect = document.createElement('button');
      taskSelect.textContent = 'New Task';
      taskSelect.id = 'task-select';
      taskSelect.setAttribute('title', 'Add a task');
      // IF NO PROJECTS EXIST, TASK BUTTON IS DISABLED
      if (projectList.length === 0) {
        taskSelect.setAttribute('disabled', 'disabled');
        taskSelect.setAttribute('title', 'Add a project first');
      }
      selectBox.appendChild(projectSelect);
      selectBox.appendChild(taskSelect);
      addNew.appendChild(selectBox);
      // LOGIC FOR CLICKING NEW TASK
      taskSelect.addEventListener('click', () => {
        // ONLY DO THIS IF THERE IS A PROJECT **MAYBE BE THIS IF SINCE ALREADY DISABLED ABOVE**
        if (projectList.length >= 1) {
          // REMOVE selectBox, SET SELECTING STATE TO FALSE, DISPLAY TASK FROM
          selectBox.remove();
          selecting = false;
          displayForm();
        }
      });
      // LOGIC FOR CLICKING NEW PROJECT
      projectSelect.addEventListener('click', () => {
        // IF NO PROJECTS, CLEAR taskTableHolder TO REMOVE addProjINstrux, ADD taskTable BACK
        if (projectList.length === 0) {
          taskTableHolder.innerHTML = '';
          taskTableHolder.appendChild(taskTable);
        }
        // REMOVE selectBox, SET SELECTING STATE TO FALSE, DISPLAY PROJECT FROM
        selectBox.remove();
        selecting = false;
        displayProjectForm();
      });
    });

    const clickout = (() => {
      // LOGIC FOR REMOVING selectBox WHEN CLICKING OUTSIDE OF IT
      // PUTS GLOBAL LISTNER THAT RUNS IF selectBox IS PRESENT
      // IF THE CLICK IS NOT ON THE BOX OR NEW TASK OR NEW PROJECT (ANYWHERE ELSE), REMOVE BOX
      content.addEventListener('mousedown', (e) => {
        if (projectOptionsSelecting === true) {
          const clickSpot = e.target;
          if (
            !(
              clickSpot.className === 'project-options-box'
              || clickSpot.className === 'project-edit-cell'
              || clickSpot.className === 'project-delete-cell'
              || clickSpot.className === 'project-complete-cell'
              || clickSpot.className === 'project-edit-btn'
              || clickSpot.className === 'project-delete-btn'
              || clickSpot.className === 'project-complete-btn'
            )
          ) {
            updateProjectSelecting(false);
            // GRAB ALL projectOptions INTO AN ARRAY
            const addRemove = document.querySelectorAll('.project-options');
            // GRAB THE CURRENTLY VISIBLE projectOptionsBox
            const selectRemove = document.querySelector('.project-options-box');
            // optionsPosition GETS THE DATA ID ASSIGNED TO THE VISIBLE BOX
            const optionsPosition = selectRemove.getAttribute('data-id');
            // PLUGS THAT POSITION INTO addRemove[] TO GET THE PROJECT W/ OPTIONS CURRENTLY VISIBLE
            const currentOptionButton = addRemove[optionsPosition];
            currentOptionButton.removeChild(selectRemove);
          } else if (clickSpot.className === 'project-options') {
            // const addRemove = document.querySelector('.task-options');
            // const selectRemove = document.querySelector('.task-options-box');
            // addRemove.removeChild(selectRemove);
            // projectOptionsSelecting = false;
          }
        }
        // CLICKOUT FOR addNew BOX
        if (selecting === true) {
          const clickSpot = e.target;
          if (
            !(
              clickSpot.id === 'select-box'
              || clickSpot.id === 'task-select'
              || clickSpot.id === 'project-select'
            )
          ) {
            const addRemove = document.getElementById('add-new');
            const selectRemove = document.getElementById('select-box');
            addRemove.removeChild(selectRemove);
            selecting = false;
          }
        }
      });

      // LOGIC TO REMOVE FORMS ON CLICKOUT - A SLIGHTLY DIFFERENT METHOD FROM ABOVE
      // PUTS A CLICK LISTENER ON OVERLAY BACKGROUND FOR CLICKOUT
      formOverlay.addEventListener('mousedown', (e) => {
        const card = document.getElementById('form-card');
        // MAKE clickSpot = THE TARGET EVENT
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
