/* ======================= ДАННЫЕ ПРОЕКТОВ ======================= */
const projects = [
    {
        id: 1,
        title: "Анализ текучести сотрудников (HR-аналитика)",
        stack: "PostgreSQL, SQL, Python (Pandas), Power BI",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
        emoji: "📊",
        tasks: [
            "Сбор и анализ бизнес-требований к HR-отчётности; очистка и подготовка данных (Pandas)",
            "SQL-запросы к PostgreSQL для расчёта метрик текучести",
            "Продвинутый SQL: CTE (WITH), агрегаты с FILTER, CASE для биннинга, ::numeric",
            "Выявление трендов и причин увольнений; проверка гипотез",
            "Дашборд в Power BI с фильтрами по отделам, должностям, демографии"
        ],
        result: "Рассчитан общий и постраничный Attrition Rate; выявлены отделы и возрастные группы с максимальной текучестью; определено влияние командировок и удалённости; подготовлены рекомендации по удержанию; оформлена документация.",
        git: "https://github.com/1q1q1q1q1q11337/Analytics/Employee-Attrition-Performance/wiki"
    },
    {
        id: 2,
        title: "Корпоративная система учёта задач и рабочего времени",
        stack: "PostgreSQL, SQL, ETL, Power BI, Git",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&q=80",
        emoji: "🗂️",
        tasks: [
            "Создание типового описания предметной области",
            "Создание диаграммы вариантов использования (Use Case)",
            "Концептуальное, логическое и физическое проектирование БД",
            "Написание SQL-запросов к PostgreSQL (JOIN, GROUP BY, подзапросы) для выборки и агрегации данных",
            "Визуализация данных (Power BI): дашборд для выявления неэффективных трудозатрат"
        ],
        result: "Формализована предметная область, составлена Use Case диаграмма (20+ сценариев). Выполнено трехуровневое проектирование БД. Разработан дашборд в Power BI для выявления неэффективных трудозатрат.",
        git: "https://github.com/1q1q1q1q1q11337/time-manager/wiki"
    },
    {
        id: 3,
        title: "Анализ клиентов центра доставки готовой еды",
        stack: "Python (Pandas, NumPy, Matplotlib), Power BI",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        emoji: "🍔",
        tasks: [
            "Загрузка и очистка данных (388 строк) с помощью библиотеки Pandas",
            "Построение интерактивного дашборда в Power BI с фильтрами по категориям пользователей",
            "Сегментация пользователей по полу, возрасту, роду занятий и уровню дохода",
            "Проведение разведочного анализа данных (EDA), выявление ключевых трендов и закономерностей"
        ],
        result: "Выявлена целевая аудитория. Подготовлены рекомендации по маркетинговому таргетингу на основе выявленных сегментов.",
        git: "https://github.com/1q1q1q1q1q11337/online_food/wiki"
    }
];

/* ======================= ИНИЦИАЛИЗАЦИЯ ======================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- Получаем элементы ---
    const track     = document.getElementById('carouselTrack');
    const prevBtn   = document.getElementById('prevBtn');
    const nextBtn   = document.getElementById('nextBtn');
    const overlay   = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalClose= document.getElementById('modalClose');

    // --- Проверка, что все элементы есть на странице ---
    if (!track || !prevBtn || !nextBtn) {
        console.error('❌ Не найдены элементы карусели. Проверьте id в index.html: carouselTrack, prevBtn, nextBtn');
        return;
    }
    if (!overlay || !modalBody || !modalClose) {
        console.error('❌ Не найдены элементы модального окна. Проверьте id: modalOverlay, modalBody, modalClose');
        return;
    }

    console.log('✅ Скрипт запущен, проектов:', projects.length);

    let currentIndex = 0;

    /* ======================= РЕНДЕР КАРТОЧЕК ======================= */
    function renderCards() {
        track.innerHTML = projects.map(p => `
            <div class="project-card" data-id="${p.id}">
                <div class="card-image overlay" style="background-image: url('${p.image}');">
                    <span>${p.emoji}</span>
                </div>
                <div class="card-body">
                    <h3>${p.title}</h3>
                    <div class="card-stack">${p.stack}</div>
                    <div class="card-hint">Подробнее →</div>
                </div>
            </div>
        `).join('');

        // Навешиваем обработчики клика
        track.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = Number(card.dataset.id);
                openModal(id);
            });
        });

        updateCarousel();
    }

    /* ======================= КАРУСЕЛЬ ======================= */
    function visibleCards() {
        if (window.innerWidth <= 650) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function updateCarousel() {
        const firstCard = track.children[0];
        if (!firstCard) return;

        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = 20;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        const maxIndex = Math.max(0, projects.length - visibleCards());
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    function slide(direction) {
        const maxIndex = Math.max(0, projects.length - visibleCards());
        currentIndex = Math.min(Math.max(currentIndex + direction, 0), maxIndex);
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => slide(-1));
    nextBtn.addEventListener('click', () => slide(1));

    window.addEventListener('resize', () => {
        const maxIndex = Math.max(0, projects.length - visibleCards());
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateCarousel();
    });

    /* ======================= МОДАЛЬНОЕ ОКНО ======================= */
    function openModal(id) {
        const p = projects.find(x => x.id === id);
        if (!p) return;

        modalBody.innerHTML = `
            <h2>${p.title}</h2>
            <div class="modal-stack">${p.stack}</div>
            <div class="modal-image" style="background-image: url('${p.image}');">
                ${p.emoji}
            </div>
            <h3 style="color: var(--primary); margin-bottom: 10px; font-size: 1rem;">Задачи:</h3>
            <ul>
                ${p.tasks.map(t => `<li>${t}</li>`).join('')}
            </ul>
            <div class="result-block">
                <strong>Результат:</strong> ${p.result}
            </div>
            <a class="git-link" href="${p.git}" target="_blank" rel="noopener">📂 Открыть на GitHub</a>
        `;

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    /* ======================= СКАЧИВАНИЕ PDF ======================= */
    window.downloadPDF = function () {
        if (typeof html2pdf === 'undefined') {
            alert('Библиотека html2pdf не загружена. Проверьте интернет-соединение.');
            return;
        }

        const element = document.getElementById('resumeContent');
        const opt = {
            margin: [10, 10, 10, 10],
            filename: 'Шайкина_Елена_Junior_Data_Analyst.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, allowTaint: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const noPrintEls = document.querySelectorAll('.no-print');
        const cards = document.querySelectorAll('.project-card');

        const originalDisplay = [];
        noPrintEls.forEach((el, i) => { originalDisplay[i] = el.style.display; });

        const originalFlex = [];
        cards.forEach((c, i) => { originalFlex[i] = c.style.flex; });

        const originalTransform = track ? track.style.transform : '';

        noPrintEls.forEach(el => el.style.display = 'none');

        cards.forEach(c => {
            c.style.flex = '0 0 100%';
            c.style.minWidth = '100%';
            c.style.maxWidth = '100%';
        });

        if (track) {
            track.style.transform = 'translateX(0)';
            track.style.flexWrap = 'wrap';
            track.style.gap = '15px';
        }

        setTimeout(() => {
            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => restoreStyles())
                .catch(err => {
                    console.error('Ошибка при генерации PDF:', err);
                    restoreStyles();
                    alert('Не удалось создать PDF. Попробуйте ещё раз.');
                });
        }, 150);

        function restoreStyles() {
            noPrintEls.forEach((el, i) => { el.style.display = originalDisplay[i]; });
            cards.forEach((c, i) => {
                c.style.flex = originalFlex[i];
                c.style.minWidth = '';
                c.style.maxWidth = '';
            });
            if (track) {
                track.style.transform = originalTransform;
                track.style.flexWrap = '';
                track.style.gap = '';
            }
            updateCarousel();
        }
    };

    /* ======================= СТАРТ ======================= */
    renderCards();
});