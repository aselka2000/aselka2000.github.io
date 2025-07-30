// Простая реализация частиц для фона
class Particles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        // Установка размеров canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        
        // Добавление canvas в body
        document.body.appendChild(this.canvas);
        
        // Создание частиц
        this.createParticles();
        
        // Запуск анимации
        this.animate();
        
        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.createParticles();
        });
    }
    
    createParticles() {
        this.particles = [];
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 5000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }
    
    animate() {
        // Очистка canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Обновление и отрисовка частиц
        this.particles.forEach(particle => {
            // Обновление позиции
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Отскок от краев
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.speedY *= -1;
            }
            
            // Отрисовка частицы
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
        
        // Продолжение анимации
        requestAnimationFrame(() => this.animate());
    }
}

// Инициализация частиц при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Particles();
});