const popup = document.getElementById('popup');
const defText = document.getElementById('definition-text');
const closeBtn = document.getElementById('close-btn');

document.querySelectorAll('#word-list li').forEach(item => {
  item.addEventListener('click', () => {
    defText.innerText = item.getAttribute('data-definition');
    popup.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

popup.addEventListener('click', e => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});
