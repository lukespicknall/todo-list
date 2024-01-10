const newProject = (pTitle, pDueDate, pPriority) => {
  const title = pTitle;
  const due = pDueDate;
  const priority = pPriority;
  const tasks = [];
  const complete = [];

  return {
    title,
    due,
    priority,
    tasks,
    complete,
  };
};

export default newProject;
