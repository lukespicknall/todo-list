// import newTask from './to-do';
import newProject from './project';

import newTask from './to-do';
// import displayTasks from './display';

// CREATE MAIN HTML DIVS

// SET AN INTIAL DEFAULT PROJECT TO DISPLAY
const projectList = [
  {
    title: 'My Project',
    due: undefined,
    priotiy: 'low',
    tasks: [],
  },
];

// SET DEAULT PROJECT AS CURRENT
let currentProject = projectList[0];

// UPDATE CURRENT
const setCurrent = (a) => {
  currentProject = projectList[a];
};

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
  main.appendChild(taskTableHolder);

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
  addBox.id = 'add-box';
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

    // let currentSelecting;

    // const updateCurrentSelecting = (a) => {
    //   currentSelecting = a;
    // };

    const displayProjects = () => {
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
        projectRow.setAttribute('data-id', [i]); // row assigned data-id that is its posiition in projectLisy[]
        projectTable.appendChild(projectRow); // add that tr to projectTable in libTable

        // CREATE NEW TABLE CELLS FOR project DATA
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

        const projectOptions = document.createElement('div');
        projectOptions.classList.add('project-options');
        projectOptions.setAttribute('data-id', [i]);
        const projectOptionsIcon = document.createElement('i');
        projectOptionsIcon.classList.add('fa', 'fa-solid', 'fa-ellipsis-vertical');
        projectOptions.appendChild(projectOptionsIcon);
        const projectOptionsBox = document.createElement('div');
        projectOptionsBox.classList.add('project-options-box');
        projectOptionsBox.setAttribute("data-id", [i]);
        projectOptions.appendChild(projectOptionsBox)
        // projectOptions.addEventListener('click', () => {
        //   optionsClickOut(projectOptions, projectOptionsBox,);
        // });

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
        const projDeleteBtn = document.createElement('button');
        projDeleteBtn.className = 'delete-btn';
        projDeleteBtn.innerHTML = '<p>delete</p>';
        deleteCell.appendChild(projDeleteBtn);
        const projCompleteBtn = document.createElement('button');
        projCompleteBtn.className = 'complete-btn';
        projCompleteBtn.innerHTML = '<p>complete</p>';
        completeCell.appendChild(projCompleteBtn);

        projectOptionsBox.append(editCell, deleteCell, completeCell);

        // APPEND CELLS TO THE project TROW
        projectRow.appendChild(projectCell);
        projectRow.appendChild(dueCell);
        projectRow.appendChild(priorityCell);
        projectRow.appendChild(projectOptions);
        // projectRow.appendChild(editCell);
        // projectRow.appendChild(deleteCell);
        // projectRow.appendChild(completeCell);

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
          if (getProj.tagName === 'DIV') {
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
          projectList.length === 1 && projectList[currentComplete].tasks.length > 0
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
      });
    };

    const projectDelete = (projDeleteBtn) => {
      projDeleteBtn.addEventListener('click', (e) => {
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
          projectList.length === 1 && projectList[currentDelete].tasks.length > 0
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
      });
    };
    // RUN displayProjects()
    displayProjects();

    // CREATE TABLE ELEMENTS AND LOOP projectList[] AND SEND EACH OBJS DATA TO TABLE FIELDS.
    // LOGIC TO DETERMINE WHEN addInstrux GET ADDED OR REMOVED BASED ON TASK PRESENCE
    // ADD EDITBTN LOGIC
    const displayTasks = (a) => {
      // IF - SO IT DOESNT TRY TO PULL PROJ DATA IS NONE EXISTS BECUZ LAST ONE WAS DELETE/COMPLETED
      if (projectList.length <= 0) {
        taskTable.innerHTML = '';
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

        //  **  ADD/REMOVE INSTRUCTIONS LOGIC  **  //
        if (taskTableHolder.children.length > 2) {
          return;
        }
        // IF > 1 PROJECT, THAT PROJECT HAS NO TASKS, AND THE INSTRUX ARE CURRENTLY SHOWING
        // GRAB ELEMENTS FROM DOM, REMOVE CURRENT INSTRUX, CHANGE TEXT, ADD NEW INSTRUX
        if (projectList.length >= 1 && currentProject.tasks.length === 0 && taskTableHolder.children.length > 1) {
          const instructionsRemove = document.getElementById('add-instructions');
          const tabletest = document.getElementById('task-table-holder');
          tabletest.removeChild(instructionsRemove);
          addIntructions.textContent = `click the + button to add a task to ${currentProject.title}.`;
          taskTableHolder.appendChild(addIntructions);
        }
        // FOR LOAD AND DELETES, IF PROJECT HAS NO TASKS, PUT TITLE IN TEXT AND SHOW INSTRUX
        // THIS ADD INSTRUX ON LOAD AND WHEN ALL TASKS ARE DELETED FROM PROJ
        if (currentProject.tasks.length === 0) {
          addIntructions.textContent = `click the + button to add a task to ${currentProject.title}.`;
          taskTableHolder.appendChild(addIntructions);
        // IF PROJ HAS TASKS, AND INTRUX ARE SHOWING, REMOVE INSTRUX
        // THIS BASICALLY GETS RID OF INSTRUX DIV WHEN FIRST TASK IS ADDED, AND ONLY THEN
        } else if (currentProject.tasks.length >= 1 && taskTableHolder.children.length > 1) {
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
          taskRow.appendChild(notesCell);
          taskRow.appendChild(dueCell);
          taskRow.appendChild(priorityCell);
          taskRow.appendChild(editCell);
          taskRow.appendChild(deleteCell);
          taskRow.appendChild(completeCell);

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
      }
    };

    displayTasks(0);
    // LOGIC FOR TASK COMPLETE BUTTON
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

    // LOGIC FOR DELETE BUTTON
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
      projectTitle.setAttribute('id', 'project-title');
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
      projectDue.setAttribute('id', 'project-due');
      projectDue.setAttribute('type', 'date');
      projectDue.setAttribute('placeholder', 'project due . . .');
      projectDue.setAttribute('name', 'project-due');

      // CREATE PRIORITY INPUT AND LABEL, SET ATTRIBUTES
      // IF FORM LAUNCHED FORM editBtn, POPULATE W/ ARG VALUE FORM OBJ
      const priorityLabel = document.createElement('p');
      // priorityLabel.setAttribute('for', 'project-prioritybox');
      // priorityLabel.setAttribute('for', 'project-priority');
      priorityLabel.textContent = 'Priority';
      // CREATE BOX TO HOLD RADIO BUTTONS AND LABELS
      const projectPriorityBox = document.createElement('div');
      // projectPriorityBox.setAttribute('id', 'project-prioritybox');
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
        // const tableTitle = document.getElementById('task-header');
        // tableTitle.textContent = projectTitle.value;
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
      const priorityLabel = document.createElement('p');
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
      });
      return taskCard;
    };

    //  CAN I DELETE THIS NULL ASSIGNMENT? WHY IS IT THERE?
    let selecting;
    // CREATE NEW TASK FORM HANDLER
    addNew.addEventListener('click', () => {
      // formOverlay.id = "form-overlay-vis";
      // IF selectBox IS PRESENT, DONT MAKE MORE OF THEM ON CLICK
      if (selecting === true) { return; }
      // SELECTING STATE IS TRUE UPON CLICK
      selecting = true;

      // CREATE SELECT BUTTONS AND THEIR CONTAINER BOX
      const selectBox = document.createElement('div');
      selectBox.id = 'select-box';
      const projectSelect = document.createElement('button');
      projectSelect.textContent = 'New Project';
      projectSelect.id = 'project-select';
      const taskSelect = document.createElement('button');
      taskSelect.textContent = 'New Task';
      taskSelect.id = 'task-select';
      // IF NO PROJECTS EXIST, TASK BUTTON IS DISABLED
      if (projectList.length === 0) {
        taskSelect.setAttribute('disabled', 'disabled');
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

    // const optionsClickOut = (() => {
    //   const optionsRemove = document.querySelectorAll(".project-options");
    //   const optionsBoxRemove = document.querySelectorAll(".project-options-box");
    //   optionsRemove.forEach((element) => {
    //     element.addEventListener('click', () => {
    //       if (projectOptionsSelecting === true) {
    //         // element.removeChild(optionsBoxRemove);
    //         optionsBoxRemove.
    //       } else if (projectOptionsSelecting === false) {
    //         // element.appendChild(optionsBoxRemove);
    //       }
    //     });
    //   });
    // })();
    // const optionsClickOut = (projectOptions, projectOptionsBox, position) => {
    //   const optionsRemove = document.querySelectorAll(".project-options");
    //   const optionsBoxRemove = document.querySelectorAll(".project-options-box");
    //   const currentOptions = optionsRemove[0];
    //   const currentOptionsBox = optionsBoxRemove[0];
    //   if (optionsBoxRemove.length === 1) {
    //     content.addEventListener("mousedown", (e) => {
    //       const optionsClickSpot = e.target;
    //       if (optionsClickSpot.className !== "project-options-box") {
    //         currentOptions.removeChild(currentOptionsBox);
    //         updateProjectSelecting(false);
    //       }
    //     });
    //   } else if (optionsBoxRemove.length === 0) {
    //             projectOptions.appendChild(projectOptionsBox);
    //             updateProjectSelecting(true);
    //   }
    //   // const currentOptions = optionsRemove[position];
    //   // const currentOptionsBox = optionsBoxRemove[position];
    //   // if (projectOptionsSelecting === true) {
    //   //   content.addEventListener("mousedown", (e) => {
    //   //     const optionsClickSpot = e.target;
    //   //     console.log(position);
    //   //     console.log(currentOptionsBox);
    //   //     console.log(optionsClickSpot);
    //   //     console.log (currentOptions);
    //   //     console.log(currentOptionsBox);
    //   //     // console.log(projectOptions);
    //   //     // console.log(projectOptionsBox);
    //   //     if (optionsClickSpot.className !== "project-options-box") {
    //   //       currentOptions.removeChild(currentOptionsBox);
    //   //       updateProjectSelecting(false);
    //   //     }
    //   //   });
    //   // } else if (projectOptionsSelecting === false) {
    //   //   projectOptions.appendChild(projectOptionsBox);
    //   //   updateProjectSelecting(true);
    //   // }
    //   // console.log(projectOptionsSelecting);
    // };

    const clickout = (() => {
      // LOGIC FOR REMOVING selectBox WHEN CLICKING OUTSIDE OF IT
      // PUTS GLOBAL LISTNER THAT RUNS IF selectBox IS PRESENT
      // IF THE CLICK IS NOT ON THE BOX OR NEW TASK OR NEW PROJECT (ANYWHERE ELSE), REMOVE BOX
      content.addEventListener('mousedown', (e) => {
        // console.log(currentProject);
        // if (projectOptionsSelecting === true) {
        //   const clickSpot = e.target;
        //   const clickSpotPosition = e.target.dataset.id;

        //   if (
        //     !(clickSpot.className === 'task-options-box')
        //   ) {
        //     const addRemove = document.querySelector('.task-options');
        //     const selectRemove = document.querySelectorAll('.task-options-box');
        //     const currentOptionButton = addRemove[currentProject];
        //     const currentOptionBox = selectRemove[currentProject];
        //     console.log(currentOptionBox);
        //     console.log(currentOptionButton);
        //     // addRemove.removeChild(selectRemove);
        //     // projectOptionsSelecting = false;
        //   }
        //   else if ((clickSpot.className === 'task-options')) {
        //     console.log(clickSpot.dataset.id);
        //   // const addRemove = document.querySelector('.task-options');
        //   // const selectRemove = document.querySelector('.task-options-box');
        //   // addRemove.removeChild(selectRemove);
        //   // projectOptionsSelecting = false;
        //   }
        // }
        // CLICKOUT FOR addNew BOX
        if (selecting === true) {
          const clickspot = e.target;
          if (
            !(
              clickspot.id === 'select-box'
              || clickspot.id === 'task-select'
              || clickspot.id === 'project-select'
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
