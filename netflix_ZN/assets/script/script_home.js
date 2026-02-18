document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  const items = document.querySelectorAll('.item');
  const noResults = document.getElementById('no_results');

  
  noResults.querySelector('p').textContent = 'No items were found';

  
  noResults.style.display = 'none';

  
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase().trim();
    let visibleItems = 0;

    
    items.forEach(item => {
      const title = item.querySelector('.item-title').textContent.toLowerCase();
      const subtitle = item.querySelector('.item-subtitle').textContent.toLowerCase();

      
      if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
        item.style.display = '';
        visibleItems++;
      } else {
        item.style.display = 'none';
      }
    });

    if (searchTerm.length > 0 && visibleItems === 0) {
      noResults.style.display = '';
    } else {
      noResults.style.display = 'none';
    }
  });

  
});


// Login box hover effect
