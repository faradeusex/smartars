// Анимация "полка" при переходе по меню
const navLinks = document.querySelectorAll('.nav-link');
const shelfOverlay = document.getElementById('shelf-animation');
const shelfDoor = shelfOverlay.querySelector('.shelf-door');

// Плавный скролл с эффектом "дверца"
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    // Анимация полки
    shelfOverlay.style.display = 'flex';
    setTimeout(() => {
      shelfOverlay.classList.add('open');
    }, 50);

    // Подождать, потом перейти
    setTimeout(() => {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }, 600);

    // Скрыть дверцу
    setTimeout(() => {
      shelfOverlay.classList.remove('open');
      shelfOverlay.style.display = 'none';
    }, 1300);
  });
});

// Кнопка "Заказать" — скролл к заказу
const orderBtn = document.querySelector('.order-scroll-btn');
const orderSection = document.getElementById('order');

orderBtn.addEventListener('click', () => {
  orderSection.scrollIntoView({ behavior: 'smooth' });
});

// Плавное появление секций при прокрутке
const sections = document.querySelectorAll('.section');

const revealOnScroll = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      revealOnScroll.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  revealOnScroll.observe(section);
});
