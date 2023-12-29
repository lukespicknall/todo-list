const newTask = (tTask, tNotes, tDueDate, tPriority, tComplete) => {
  const task = tTask;
  const notes = tNotes;
  const due = tDueDate;
  const priority = tPriority;
  const complete = tComplete;

  return {
    task, notes, due, priority, complete,
  };
};

export default newTask;
