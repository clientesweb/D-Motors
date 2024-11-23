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
                <div class="car-badge ${car.condition.toLowerCase()}">${car.condition}</div>
            </div>
        `).join('');

        // Inicializar Swipers para cada tarjeta de auto
        cars.forEach(car => {
            const slider = document.querySelector(`.car-image-slider[data-car-id="${car.id}"] .swiper`);
            carSliders[car.id] = new Swiper(slider, {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        });

        // Agregar event listeners para los botones "Ver Detalles"
        document.querySelectorAll('.view-car-details').forEach(button => {
            button.addEventListener('click', () => {
                const carId = button.getAttribute('data-car-id');
                showCarDetails(carId);
            });
        });
    }

    // Modal de Detalles del Auto
    const modal = document.getElementById('car-modal');
    const closeModal = document.getElementById('close-modal');
    let modalSwiper;

    function showCarDetails(carId) {
        const car = cars.find(c => c.id === parseInt(carId));
        if (!car) return;

        document.getElementById('modal-title').textContent = `${car.year} ${car.name}`;

        // Actualizar imágenes del slider
        const modalSlider = document.querySelector('.car-images-slider .swiper-wrapper');
        modalSlider.innerHTML = car.detailImages.map(img => `
            <div class="swiper-slide">
                <img src="${img}" alt="${car.name}" class="w-full h-auto" />
            </div>
        `).join('');

        // Inicializar o actualizar Swiper
        if (modalSwiper) {
            modalSwiper.destroy();
        }
        modalSwiper = new Swiper('.car-images-slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Actualizar información del vehículo
        const vehicleInfo = document.getElementById('vehicle-info');
        vehicleInfo.innerHTML = `
            <p><strong>Marca:</strong> ${car.brand}</p>
            <p><strong>Modelo:</strong> ${car.name}</p>
            <p><strong>Año:</strong> ${car.year}</p>
            <p><strong>Precio:</strong> ${car.price}</p>
            <p><strong>Kilometraje:</strong> ${car.mileage}</p>
            <p><strong>Condición:</strong> ${car.condition}</p>
        `;

        // Actualizar especificaciones técnicas
        const technicalSpecs = document.getElementById('technical-specs');
        technicalSpecs.innerHTML = `
            <p><strong>Motor:</strong> ${car.engine}</p>
            <p><strong>Transmisión:</strong> ${car.transmission}</p>
            <p><strong>Combustible:</strong> ${car.fuelType}</p>
            <p><strong>Tracción:</strong> ${car.drivetrain}</p>
            <p><strong>Color Exterior:</strong> ${car.exteriorColor}</p>
            <p><strong>Color Interior:</strong> ${car.interiorColor}</p>
        `;

        // Configurar botón de WhatsApp en el modal
        const modalWhatsAppButton = document.getElementById('modal-whatsapp-button');
        modalWhatsAppButton.href = `https://wa.me/5493547504071?text=Hola, estoy interesado en el ${car.year} ${car.name}. ¿Podrían darme más información?`;

        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }
    });

    // Manejar
envío del formulario de venta de autos
    const sellCarForm = document.getElementById('sell-car-form');
    sellCarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(sellCarForm);
        const message = `Nuevo formulario de venta de auto:
Nombre: ${formData.get('name')}
Email: ${formData.get('email')}
Teléfono: ${formData.get('phone')}
Marca: ${formData.get('car-make')}
Modelo: ${formData.get('car-model')}
Año: ${formData.get('car-year')}
Kilometraje: ${formData.get('car-mileage')}
Comentarios adicionales: ${formData.get('additional-comments')}`;

        window.open(`https://wa.me/5493547504071?text=${encodeURIComponent(message)}`, '_blank');
        sellCarForm.reset();
    });

    // Cargar y mostrar Instagram Reels
    function loadInstagramReels() {
        const reelsContainer = document.querySelector('.instagram-reels-slider .flex');
        // Reemplaza estos con los códigos de inserción reales de tus Reels de Instagram
        const reelEmbedCodes = [
            '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/ABC123/" data-instgrm-version="14"></blockquote>',
            '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DEF456/" data-instgrm-version="14"></blockquote>',
            '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/GHI789/" data-instgrm-version="14"></blockquote>',
        ];

        reelsContainer.innerHTML = reelEmbedCodes.map(code => `
            <div class="instagram-reel">
                ${code}
            </div>
        `).join('');

        // Cargar el script de Instagram para procesar los embeds
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        document.body.appendChild(script);
    }

    loadInstagramReels();

    // Manejar acordeones en el modal
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const icon = header.querySelector('i');
            icon.classList.toggle('rotate-180');
        });
    });

    // Notificación de WhatsApp
    const whatsappButton = document.getElementById('whatsapp-button');
    const whatsappNotification = document.getElementById('whatsapp-notification');

    // Simular una notificación después de 5 segundos
    setTimeout(() => {
        whatsappNotification.classList.remove('hidden');
    }, 5000);

    whatsappButton.addEventListener('click', () => {
        whatsappNotification.classList.add('hidden');
    });
});

