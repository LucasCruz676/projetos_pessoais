  const appItems = document.querySelectorAll('.app-item');
  const exampleDiv = document.getElementById('app-example');

  appItems.forEach(item => {
    item.addEventListener('click', () => {
      const content = item.dataset.example;

      if (exampleDiv.style.display === 'block' && exampleDiv.innerHTML === content) {
        exampleDiv.style.display = 'none';
      } else {
        exampleDiv.style.display = 'block';
        exampleDiv.innerHTML = content;
      }
    });
  });
