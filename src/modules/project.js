const newProject = (pTitle, pDueDate, pPriority) => {
  const title = pTitle;
  const due = pDueDate;
  const priority = pPriority;
  const tasks = [];

  return {
    title,
    due,
    priority,
    tasks,
  };
};

export default newProject;
