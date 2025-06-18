// Плавный скролл по меню
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').substring(1);
    document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' });

    // Закрыть мобильное меню, если открыто
    document.querySelector('.nav-links').classList.remove('active');
  });
});

// Бургер-меню для мобильных
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Обработка формы с простой валидацией и имитацией отправки
const form = document.getElementById('orderForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const comment = form.comment.value.trim();

  if (name.length < 2) {
    alert('Пожалуйста, введите корректное имя (не менее 2 символов).');
    return;
  }

  const phonePattern = /^\+?\d{10,15}$/;
  if (!phonePattern.test(phone)) {
    alert('Пожалуйста, введите корректный телефон (10-15 цифр, можно с +).');
    return;
  }

  alert(`Спасибо, ${name}! Ваша заявка принята.\nМы свяжемся с вами по номеру ${phone}.`);

  form.reset();
});
