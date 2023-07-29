const newTask = (tTitle, tDescription, tDueDate, tPriority) => {
  const title = tTitle;
  const description = tDescription;
  const due = tDueDate;
  const priority = tPriority;

  return {
    title, description, due, priority,
  };
};

export default newTask;
