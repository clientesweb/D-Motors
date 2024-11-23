document.addEventListener('DOMContentLoaded', () => {
    let cars = [];
    let carSliders = {};

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
                    <div class="swiper">
                        <div class="swiper-wrapper">
                            ${car.cardImages.map(img => `
                                <div class="swiper-slide">
                                    <img src="${img}" alt="${car.name}" />
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
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

        initCarSliders();

        // Agregar event listeners a los botones
        document.querySelectorAll('.view-car-details').forEach(button => {
            button.addEventListener('click', () => showCarDetails(button.dataset.carId));
        });
    }

    // Inicializar sliders de imágenes
    function initCarSliders() {
        const sliders = document.querySelectorAll('.car-image-slider');
        sliders.forEach(slider => {
            const carId = slider.dataset.carId;
            carSliders[carId] = new Swiper(slider.querySelector('.swiper'), {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                }
            });
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
        const swiperWrapper = document.querySelector('.car-images-slider .swiper-wrapper');
        swiperWrapper.innerHTML = car.detailImages.map(img => `
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
            <p><strong>Color:</strong> ${car.color}</p>
            <p><strong>Tipo:</strong> ${car.type}</p>
        `;

        // Actualizar especificaciones técnicas
        document.getElementById('technical-specs').innerHTML = Object.entries(car.specs)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');

        // Configurar botón de WhatsApp
        const whatsappButton = document.getElementById('modal-whatsapp-button');
        whatsappButton.onclick = () => {
            const message = encodeURIComponent(`Hola, estoy interesado en el ${car.year} ${car.name}. ¿Podrían darme más información?`);
            window.open(`https://wa.me/5493547504071?text=${message}`, '_blank');
        };

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        // Reinicializar Swiper
        if (swiper) {
            swiper.destroy();
        }
        initSwiper();

        // Inicializar acordeón
        initAccordion();
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
    let swiper;
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
    function initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('i');

                // Toggle active class
                header.classList.toggle('active');

                // Toggle icon rotation
                icon.style.transform = header.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';

                // Toggle content visibility
                if (header.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }

    // Botón de WhatsApp
    const whatsappButton = document.getElementById('whatsapp-button');
    const whatsappNotification = document.getElementById('whatsapp-notification');

    whatsappButton.addEventListener('click', () => {
        window.open('https://wa.me/5493547504071', '_blank');
    });

    // Simular notificación después de 5 segundos
    setTimeout(() => {
        whatsappNotification.classList.remove('hidden');
    }, 5000);

    // Formulario de venta de autos
    const sellCarForm = document.getElementById('sell-car-form');
    sellCarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(sellCarForm);
        let message = 'Nuevo formulario de venta de auto:\n\n';
        for (let [key, value] of formData.entries()) {
            message += `${key}: ${value}\n`;
        }
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/5493547504071?text=${encodedMessage}`, '_blank');
    });

    // Instagram Reels Slider
    const reelsData = [
        'https://www.instagram.com/reel/ABC123/',
        'https://www.instagram.com/reel/DEF456/',
        'https://www.instagram.com/reel/GHI789/'
    ];

    const reelsSlider = document.querySelector('.instagram-reels-slider .swiper-wrapper');
    reelsData.forEach(reelUrl => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `<iframe src="${reelUrl}embed" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
        reelsSlider.appendChild(slide);
    });

    new Swiper('.instagram-reels-slider', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});