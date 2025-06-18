document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const menuLinks = sidebar.querySelectorAll('a');

  // Переменные для анимации открытия меню (тянем за ручку шкафа)
  let isOpen = false;
  let animationFrame;

  // Функция плавного открытия/закрытия меню с эффектом "пружины"
  function toggleMenu() {
    cancelAnimationFrame(animationFrame);
    const duration = 600; // длительность анимации в мс
    const start = performance.now();
    const startLeft = isOpen ? 0 : -280; // текущее положение меню
    const endLeft = isOpen ? -280 : 0;   // куда движемся
    isOpen = !isOpen;

    function animate(time) {
      let timeElapsed = time - start;
      if (timeElapsed > duration) timeElapsed = duration;

      // easeOutElastic — эффект пружины
      const easeOutElastic = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      };

      const progress = easeOutElastic(timeElapsed / duration);
      const currentLeft = startLeft + (endLeft - startLeft) * progress;
      sidebar.style.left = `${currentLeft}px`;

      if (timeElapsed < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        if (!isOpen) sidebar.style.left = '-280px';
      }
    }

    animationFrame = requestAnimationFrame(animate);
  }

  menuBtn.addEventListener('click', toggleMenu);

  // Плавный скролл к секциям при клике в меню
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      // Закрываем меню, если открыто
      if (isOpen) toggleMenu();

      const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 60; // с учётом высоты шапки
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  // Конфигуратор ручек (пример простой логики)
  const configurator = document.querySelector('#configurator');
  if (configurator) {
    const materialSelect = configurator.querySelector('select[name="material"]');
    const colorSelect = configurator.querySelector('select[name="color"]');
    const preview = configurator.querySelector('.preview');

    function updatePreview() {
      const material = materialSelect.value;
      const color = colorSelect.value;

      // Для примера меняем фон превью, можно заменить на реальные изображения
      preview.style.backgroundColor = color;
      preview.textContent = `Материал: ${material}, Цвет: ${color}`;
    }

    materialSelect.addEventListener('change', updatePreview);
    colorSelect.addEventListener('change', updatePreview);

    updatePreview();
  }

  // Обработка формы заказа
  const orderForm = document.querySelector('#order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = orderForm.querySelector('input[name="name"]').value.trim();
      const phone = orderForm.querySelector('input[name="phone"]').value.trim();
      const message = orderForm.querySelector('textarea[name="message"]').value.trim();

      if (!name || !phone) {
        alert('Пожалуйста, заполните имя и телефон.');
        return;
      }

      // Здесь можно добавить отправку данных на сервер (fetch, XMLHttpRequest)
      // Для демо просто уведомим
      alert(`Спасибо за заказ, ${name}! Мы скоро свяжемся с вами.`);

      orderForm.reset();
    });
  }
});
