async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных');
    }
    const data = await response.json();
    renderContent(data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

function renderContent(data) {
  document.querySelector('.badge').textContent = data.badge;
  document.querySelector('h1').textContent = data.title;
  document.querySelector('.subtitle').textContent = data.subtitle;
  
  const meta = document.querySelector('.meta');
  meta.innerHTML = `
    <span><span class="dot"></span> ${data.date} · ${data.time}</span>
    <span>${data.venue}</span>
    <span>Возраст ${data.age}</span>
  `;
  
  document.querySelector('.list-title').textContent = data.listTitle;
  document.querySelector('.numbers').textContent = data.numbers;
  
  const categoriesContainer = document.querySelector('.categories-container');
  categoriesContainer.innerHTML = '';
  
  data.categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category.name;
    
    const performancesList = document.createElement('ul');
    performancesList.className = 'performances';
    
    category.items.forEach(performance => {
      const li = document.createElement('li');
      li.className = 'item';
      li.setAttribute('data-num', performance.num);
      li.innerHTML = `
        <div class="title">${performance.title}</div>
        <div class="info">
          <span class="time">${performance.time}</span>
          <span class="tag">${performance.tag}</span>
          <span>${performance.performer}</span>
        </div>
      `;
      performancesList.appendChild(li);
    });
    
    categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(performancesList);
    categoriesContainer.appendChild(categoryDiv);
  });
  
  document.querySelector('.footer span').textContent = data.footerText;
  document.querySelector('.btn').textContent = data.buttonText;
}

document.addEventListener('DOMContentLoaded', loadData);
