// Меню с бургером и плавный скролл
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').substring(1);
    document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' });

    // Закрыть мобильное меню
    document.querySelector('.nav-links').classList.remove('active');
  });
});

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Фильтрация карточек
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    cards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-type') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Обработка формы заказа с валидацией и имитацией отправки
const form = document.getElementById('orderForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();

  if (name.length < 2) {
    alert('Пожалуйста, введите корректное имя');
    return;
  }

  const phonePattern = /^\+?\d{10,15}$/;
  if (!phonePattern.test(phone)) {
    alert('Пожалуйста, введите корректный номер телефона');
    return;
  }

  alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');

  form.reset();
});

const calcForm = document.getElementById('calcForm');
const calcResult = document.getElementById('calcResult');
const leatherMaterialSelect = document.getElementById('leatherMaterial');

calcForm.addEventListener('submit', e => {
  e.preventDefault();

  const type = calcForm.type.value;
  let basePrice = 0;

  switch(type) {
    case 'leather':
      basePrice = 3000;
      leatherMaterialSelect.style.display = 'inline-block';
      break;
    case 'metal':
      basePrice = 4500;
      leatherMaterialSelect.style.display = 'none';
      break;
    case 'combo':
      basePrice = 6000;
      leatherMaterialSelect.style.display = 'inline-block';
      break;
  }

  let leatherAdj = 0;
  if (type === 'leather' || type === 'combo') {
    const material = calcForm.leatherMaterial.value;
    if (material === 'classic') leatherAdj = -500;
    else if (material === 'экзотическая') leatherAdj = 1500;
  }

  const price = basePrice + leatherAdj;

  calcResult.textContent = `Приблизительная цена: ${price.toLocaleString('ru-RU')} ₽`;
});

// Показываем/скрываем select по типу при загрузке
window.addEventListener('load', () => {
  if(calcForm.type.value === 'metal') {
    leatherMaterialSelect.style.display = 'none';
  }
});
.reviews {
  background: #f5f0ea;
  border-radius: 20px;
  padding: 60px 20px;
  margin-bottom: 60px;
  box-shadow: 0 10px 25px rgba(25,106,103,0.15);
  text-align: center;
  color: #073b3a;
}

.review-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 25px;
}

.review-card {
  background: #a0c4c4;
  border-radius: 15px;
  padding: 20px 25px;
  width: 280px;
  box-shadow: 0 8px 20px rgba(25,106,103,0.3);
  font-style: italic;
  color: #f5f0ea;
}

.review-card h4 {
  margin-top: 15px;
  font-weight: 700;
  font-style: normal;
  text-align: right;
  font-size: 1.1rem;
}
