// Меню для мобильных устройств
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Галерея (Lightbox)
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

// Скролл к форме заказа
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

  const name = orderForm.name.value;
  const product = orderForm.product.value;

  alert(`Спасибо, ${name}! Ваша заявка на "${product}" принята. Мы скоро с вами свяжемся.`);

  orderForm.reset();
});

// Анимации при скролле (IntersectionObserver)
const sections = document.querySelectorAll('.section, .hero-content');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => {
  section.classList.add('hidden');
  observer.observe(section);
});
