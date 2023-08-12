const tBody = document.createElement('tbody');

const displayTasks = (taskList, taskTable) => {
  tBody.innerHTML = ''; // clears current tbody to avoid repeats
  const taskHeader = document.createElement('thead');
  taskHeader.id = 'task-header';
  taskHeader.textContent = 'Tasks';
  tBody.appendChild(taskHeader);
  for (let i = 0; i < taskList.length; i += 1) {
    // loop throu taskList[]
    const taskRow = document.createElement('tr'); // create new tr for new Task
    taskRow.className = 'task-row';
    taskRow.setAttribute('data-id', [i]);
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
  }
};

export default displayTasks;
