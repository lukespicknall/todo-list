const newProject = (pTitle, pDueDate, pPriority) => {
  const title = pTitle;
  const due = pDueDate;
  const priority = pPriority;

  return {
    title,
    due,
    priority,
  };
};

export default newProject;
