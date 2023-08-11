const newTask = (tTask, tNotes, tDueDate, tPriority) => {
  const task = tTask;
  const notes = tNotes;
  const due = tDueDate;
  const priority = tPriority;

  return {
    task, notes, due, priority,
  };
};

export default newTask;
