document.addEventListener('DOMContentLoaded', () => {
    let cars = [];
    let swiper;

    // Menú Móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenu = document.getElementById('close-menu');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }

    mobileMenuButton.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Cargar datos de autos desde JSON
    fetch('cars.json')
        .then(response => response.json())
        .then(data => {
            cars = data;
            renderCarCards();
        })
        .catch(error => console.error('Error cargando los datos de autos:', error));

    // Renderizar Tarjetas de Autos
    function renderCarCards() {
        const carListings = document.getElementById('car-listings');
        carListings.innerHTML = cars.map(car => `
            <div class="car-card">
                <div class="car-image-slider" data-car-id="${car.id}">
                    ${car.images.map((img, index) => `
                        <img src="${img}" alt="${car.name}" style="opacity: ${index === 0 ? '1' : '0'};" />
                    `).join('')}
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-bold mb-2">${car.year} ${car.name}</h3>
                    <p class="text-xl font-bold text-primary mb-2">${car.price}</p>
                    <button class="view-car-details w-full bg-dark text-white py-2 text-sm hover:bg-gray-800 transition-colors" 
                            data-car-id="${car.id}">
                        Ver Detalles
                    </button>
                </div>
            </div>
        `).join('');

        initImageSliders();

        // Agregar event listeners a los botones
        document.querySelectorAll('.view-car-details').forEach(button => {
            button.addEventListener('click', () => showCarDetails(button.dataset.carId));
        });
    }

    // Inicializar sliders de imágenes
    function initImageSliders() {
        const sliders = document.querySelectorAll('.car-image-slider');
        sliders.forEach(slider => {
            const images = slider.querySelectorAll('img');
            let currentIndex = 0;

            setInterval(() => {
                images[currentIndex].style.opacity = '0';
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].style.opacity = '1';
            }, 3000); // Cambiar imagen cada 3 segundos
        });
    }

    // Modal de Detalles
    const modal = document.getElementById('car-modal');
    const closeModal = document.getElementById('close-modal');

    function showCarDetails(carId) {
        const car = cars.find(c => c.id === parseInt(carId));
        if (!car) return;

        document.getElementById('modal-title').textContent = `${car.year} ${car.name}`;

        // Actualizar imágenes del slider
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = car.images.map(img => `
            <div class="swiper-slide">
                <img src="${img}" alt="${car.name}" class="w-full h-96 object-cover">
            </div>
        `).join('');

        // Actualizar información del vehículo
        document.getElementById('vehicle-info').innerHTML = `
            <p><strong>Precio:</strong> ${car.price}</p>
            <p><strong>Condición:</strong> ${car.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
            <p><strong>Año:</strong> ${car.year}</p>
            <p><strong>Kilometraje:</strong> ${car.mileage.toLocaleString()} km</p>
            <p><strong>Motor:</strong> ${car.engine}</p>
            <p><strong>Potencia:</strong> ${car.power}</p>
            <p><strong>Transmisión:</strong> ${car.transmission}</p>
        `;

        // Actualizar especificaciones técnicas
        document.getElementById('technical-specs').innerHTML = Object.entries(car.specs)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');

        // Configurar botón de WhatsApp
        const whatsappButton = document.getElementById('modal-whatsapp-button');
        whatsappButton.onclick = () => {
            const message = encodeURIComponent(`Hola, estoy interesado en el ${car.year} ${car.name}. ¿Podrían darme más información?`);
            window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
        };

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        // Reinicializar Swiper
        if (swiper) {
            swiper.destroy();
        }
        initSwiper();
    }

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });

    // Inicializar Swiper
    function initSwiper() {
        swiper = new Swiper('.car-images-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    }

    // Acordeón mejorado
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerrar todos los items
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Abrir el item actual si no estaba activo
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Botón de WhatsApp
    const whatsappButton = document.getElementById('whatsapp-button');
    const whatsappNotification = document.getElementById('whatsapp-notification');

    whatsappButton.addEventListener('click', () => {
        window.open('https://wa.me/1234567890', '_blank');
    });

    // Simular notificación después de 5 segundos
    setTimeout(() => {
        whatsappNotification.classList.remove('hidden');
    }, 5000);

    // Inicializar el scroll horizontal para los Instagram Reels
    const reelsContainer = document.querySelector('.instagram-reels-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    reelsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - reelsContainer.offsetLeft;
        scrollLeft = reelsContainer.scrollLeft;
    });

    reelsContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    reelsContainer.addEventListener('mouseup', () => {
        isDown = false;
    });

    reelsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reelsContainer.offsetLeft;
        const walk = (x - startX) * 3;
        reelsContainer.scrollLeft = scrollLeft - walk;
    });
});

