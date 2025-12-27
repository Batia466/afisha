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
  document.querySelector('.subtitle2').textContent = data.subtitle2;
  
  const addressElement = document.querySelector('.address');
  if (addressElement) {
    if (data.address && data.address.trim()) {
      addressElement.innerHTML = `<a href="https://yandex.ru/maps/213/moscow/house/bolshoy_spasoglinishchevskiy_pereulok_3s5/Z04YcARlSEwAQFtvfXt0d3hgYw==/?ll=37.635197%2C55.756437&z=16" target="_blank" rel="noopener noreferrer">${data.address} <span class="external-link-icon">↗</span></a>`;
      addressElement.style.display = 'block';
    } else {
      addressElement.style.display = 'none';
    }
  } else {
    console.log('Address element not found in DOM');
  }
  
  const meta = document.querySelector('.meta');
  meta.innerHTML = `
    <span><span class="dot"></span> ${data.time}</span>
    <span>${data.venue}</span>
  `;
  
  document.querySelector('.list-title').textContent = data.listTitle;
  document.querySelector('.numbers').textContent = data.numbers;
  
  const disclaimerElement = document.querySelector('.disclaimer');
  if (disclaimerElement && data.disclaimer) {
    disclaimerElement.textContent = data.disclaimer;
  }
  
  const categoriesContainer = document.querySelector('.categories-container');
  categoriesContainer.innerHTML = '';
  
  // Маппинг названий разделов на изображения
  const categoryImages = {
    "Интерлюдия": "inter.png",
    "Животные": "animals.png",
    "Предметы": "things.png",
    "Предлагаемые обстоятельства": "obst.png",
    "Эстрада": "estr.png"
  };
  
  data.categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    
   const imageName = categoryImages[category.name];
    if (imageName) {
      const img = document.createElement('img');
      img.src = imageName;
      img.alt = category.name;
      img.className = 'category-image';
      categoryDiv.appendChild(img);
    } else {
      categoryDiv.textContent = category.name;
    }
    
    const performancesList = document.createElement('ul');
    performancesList.className = 'performances';
    
    category.items.forEach(performance => {
      const li = document.createElement('li');
      li.className = 'item';
      li.setAttribute('data-num', performance.num);
      li.innerHTML = `
        <div class="title">${performance.title}</div>
      `;
      performancesList.appendChild(li);
    });
    
   // categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(performancesList);
    categoriesContainer.appendChild(categoryDiv);
  });
  
}

document.addEventListener('DOMContentLoaded', loadData);
