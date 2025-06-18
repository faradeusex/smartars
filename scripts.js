// scripts.js

const handleMenu = document.getElementById('handle-menu');
const sideNav = document.getElementById('side-nav');
const orderBtn = document.getElementById('orderBtn');
const orderForm = document.getElementById('orderForm');

// Меню "потягивание ручки"
let dragging = false;
let startX = 0;
let currentLeft = -260; // стартовое смещение меню
const maxLeft = 0;
const minLeft = -260;

function setMenuPosition(x) {
  if (x > maxLeft) x = maxLeft;
  if (x < minLeft) x = minLeft;
  sideNav.style.left = `${x}px`;
  currentLeft = x;
}

handleMenu.addEventListener('mousedown', e => {
  dragging = true;
  startX = e.clientX;
  handleMenu.style.cursor = 'grabbing';
  document.body.style.userSelect = 'none';
});
document.addEventListener('mouseup', e => {
  if (dragging) {
    dragging = false;
    handleMenu.style.cursor = 'grab';
    document.body.style.userSelect = '';
    // Решаем, открыто или закрыто меню по позиции
    if (currentLeft > minLeft / 2) {
      setMenuPosition(maxLeft);
    } else {
      setMenuPosition(minLeft);
    }
  }
});
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const diff = e.clientX - startX;
  setMenuPosition(currentLeft + diff);
  startX = e.clientX;
});

// Также меню открывается при клике на кнопку "Заказать"
orderBtn.addEventListener('click', () => {
  setMenuPosition(maxLeft);
  // Переход к форме
  document.getElementById('order').scrollIntoView({behavior: 'smooth'});
});

// Подсветка активного пункта меню при скролле
const sections = document.querySelectorAll('main section');
const navLinks = sideNav.querySelectorAll('a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    if (pageYOffset >= top) {
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

// Обработка формы
orderForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = orderForm.name.value.trim();
  const phone = orderForm.phone.value.trim();
  const product = orderForm.product.value;

  if (name.length < 2) {
    alert('Пожалуйста, введите корректное имя');
    return;
  }
  const phonePattern = /^\+?\d{10,15}$/;
  if (!phonePattern.test(phone)) {
    alert('Пожалуйста, введите корректный телефон в формате +7XXXXXXXXXX');
    return;
  }
  if (!product) {
    alert('Пожалуйста, выберите продукт');
    return;
  }

  // Здесь можно добавить отправку на сервер (fetch или другой способ)
  alert(`Спасибо, ${name}! Ваша заявка на "${product}" принята. Мы свяжемся с вами в ближайшее время.`);

  orderForm.reset();
});
