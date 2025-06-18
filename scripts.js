// scripts.js

// Плавное выделение меню при скролле
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Форма заявки
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = orderForm.name.value.trim();
  const phone = orderForm.phone.value.trim();
  const phonePattern = /^\+?\d{10,15}$/;

  if (name.length < 2) {
    alert('Пожалуйста, введите корректное имя');
    return;
  }
  if (!phonePattern.test(phone)) {
    alert('Пожалуйста, введите корректный номер телефона');
    return;
  }

  alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
  orderForm.reset();
});

// Калькулятор цены
const calcForm = document.getElementById('calcForm');
const calcResult = document.getElementById('calcResult');
const leatherMaterialSelect = document.getElementById('leatherMaterial');
const leatherLabel = document.getElementById('leatherLabel');

function toggleLeatherMaterial() {
  const type = calcForm.type.value;
  if (type === 'metal') {
    leatherMaterialSelect.style.display = 'none';
    leatherLabel.style.display = 'none';
  } else {
    leatherMaterialSelect.style.display = 'inline-block';
    leatherLabel.style.display = 'block';
  }
}

calcForm.type.addEventListener('change', toggleLeatherMaterial);
window.addEventListener('load', toggleLeatherMaterial);

calcForm.addEventListener('submit', e => {
  e.preventDefault();

  const type = calcForm.type.value;
  let basePrice = 0;

  switch (type) {
    case 'leather':
      basePrice = 3000;
      break;
    case 'metal':
      basePrice = 4500;
      break;
    case 'combo':
      basePrice = 6000;
      break;
  }

  let leatherAdj = 0;
  if (type !== 'metal') {
    const material = calcForm.leatherMaterial.value;
    if (material === 'classic') leatherAdj = -500;
    else if (material === 'exotic') leatherAdj = 1500;
  }

  const price = basePrice + leatherAdj;
  calcResult.textContent = `Приблизительная цена: ${price.toLocaleString('ru-RU')} ₽`;
});
