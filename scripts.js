// Меню бургер
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Плавный скролл по меню
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');

    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Лайтбокс для галереи
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const caption = lightbox.querySelector('.caption');
const closeBtn = lightbox.querySelector('.close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.dataset.full;
    lightboxImg.alt = img.alt;
    caption.textContent = img.alt;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

// Модальное окно заказа
const orderBtn = document.getElementById('order-btn');
const orderSection = document.getElementById('order');

orderBtn.addEventListener('click', () => {
  orderSection.scrollIntoView({ behavior: 'smooth' });
});

// Валидация формы заказа
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!orderForm.checkValidity()) {
    alert('Пожалуйста, заполните все поля правильно.');
    return;
  }
  alert(`Спасибо, ${orderForm.name.value}! Ваша заявка на "${orderForm.product.value}" принята.`);
  orderForm.reset();
});

// Анимация появления блоков при скролле
const sections = document.querySelectorAll('.section, .hero-content');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});
