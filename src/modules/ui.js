const content = document.getElementById('content');
const load = () => {
  const main = document.createElement('div');
  main.id = 'main';
  const sidebar = document.createElement('div');
  sidebar.id = 'side-bar';

  content.appendChild(main);
  content.appendChild(sidebar);
};

export default load;
