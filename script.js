// Функция для скрытия прелоадера и показа контента
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  const mainContent = document.querySelector('main');

  // Скрываем прелоадер
  if (preloader) {
    preloader.classList.add('hidden');
  }

  // Показываем основной контент
  if (mainContent) {
    // Небольшая задержка для плавного перехода
    setTimeout(() => {
      mainContent.classList.add('loaded');
    }, 300);
  }
}

// Ждем полной загрузки страницы
window.addEventListener('load', function() {
  // Скрываем прелоадер и показываем контент
  hidePreloader();
});
document.addEventListener('DOMContentLoaded', () => {
    // Активная навигация при скролле
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Смещение на высоту хедера
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение хедера при скролле
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Анимация при скролле с помощью Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые должны анимироваться
    const animatedElements = document.querySelectorAll(
        '#about .profile-pic, .hero-text, .service-item, #skills h2, .skills-columns, #contacts h2, .contact-links'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});