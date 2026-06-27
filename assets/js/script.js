    window.addEventListener('DOMContentLoaded', () => {
        // Список ваших приветствий
        const greetings = [
            "Добро пожаловать!",
            "Привет!",
            "Hello World",
            "Привет 👋",
        ];

        // Находим элемент заголовок по классу
        const heroTitle = document.querySelector('.hero-title');

        if (heroTitle) {
            // Генерируем случайный индекс
            const randomIndex = Math.floor(Math.random() * greetings.length);
            // Меняем текст на случайный из списка
            heroTitle.textContent = greetings[randomIndex];
        }
    });


    // Ждем полной загрузки DOM
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // 1. Проверка: нашли ли мы кнопку?
        if (!themeToggle) {
            return;
        }

        // 2. Проверяем сохраненную тему в памяти (тёмная теперь по умолчанию)
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            body.classList.remove('dark-theme');
        }

        // 3. Обработчик клика
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');

            // Сохраняем выбор
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });

    function openLivePreview(id) {
        const overlay = document.getElementById('lp-' + id);
        if (!overlay) return;

        // Добавляем хэш в историю браузера, чтобы работала системная кнопка "Назад"
        window.history.pushState({ modalOpen: true }, '', `#${id}`);

        overlay.style.display = 'block';
        overlay.scrollTop = 0;
        document.documentElement.style.overflow = 'hidden';
        overlay.offsetHeight;
        overlay.classList.add('is-open');
        const closeBtn = overlay.querySelector('.lp-close-btn');
        if (closeBtn) closeBtn.focus();
    }

    function closeLivePreview(id, fromPopState = false) {
        const overlay = document.getElementById('lp-' + id);
        if (!overlay) return;

        overlay.classList.remove('is-open');
        setTimeout(() => {
            overlay.style.display = 'none';
            document.documentElement.style.overflow = '';
        }, 350);

        // Если закрываем по крестику/кнопке, а не через системную кнопку "Назад", откатываем историю
        if (!fromPopState && window.location.hash === `#${id}`) {
            window.history.back();
        }
    }

    // Слушаем событие кнопки "Назад" (и "Вперед") в браузере
    window.addEventListener('popstate', (e) => {
        const openModal = document.querySelector('.lp-overlay.is-open');
        if (openModal) {
            const id = openModal.id.replace('lp-', '');
            // Закрываем окно, передаем true, чтобы не вызвать history.back() еще раз
            closeLivePreview(id, true);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const open = document.querySelector('.lp-overlay.is-open');
            if (open) closeLivePreview(open.id.replace('lp-', ''));
        }
    });

    
