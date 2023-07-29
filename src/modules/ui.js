import newTask from './to-do';

const content = document.getElementById('content');
const load = () => {
  const main = document.createElement('div');
  main.id = 'main';
  const sidebar = document.createElement('div');
  sidebar.id = 'side-bar';

  content.appendChild(main);
  content.appendChild(sidebar);
  const clean = newTask('clean up', 'clean the whole house', '06/11', 'high');
  const taskDisplay = document.createElement('div');
  taskDisplay.textContent = JSON.stringify(clean);
  main.appendChild(taskDisplay);
};

export default load;
