document.addEventListener('DOMContentLoaded', () => {
    // Menú Móvil
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenu = document.getElementById('close-menu');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('modal-open');
    }

    mobileMenuButton.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Datos de los Autos
    const cars = [
        {
            id: 1,
            name: 'BMW X5 xDrive40i',
            year: 2020,
            mileage: 62255,
            type: 'GCC',
            color: 'Azul',
            price: '219,000 AED',
            condition: 'used',
            engine: '3.0L 6 cilindros',
            power: '335 hp',
            transmission: 'Automática 8 velocidades',
            images: [
                'bmw-x5-1.jpg',
                'bmw-x5-2.jpg',
                'bmw-x5-3.jpg'
            ],
            specs: {
                'Tipo de Carrocería': 'SUV',
                'Combustible': 'Gasolina',
                'Tracción': 'Integral',
                'Color Interior': 'Negro',
                'Color Exterior': 'Azul',
                'VIN': 'WBAKS4102L0V00000'
            }
        },
        // Agregar más autos aquí
    ];

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

    // Renderizar Tarjetas de Autos
    const carListings = document.getElementById('car-listings');
    
    function renderCarCards() {
        carListings.innerHTML = cars.map(car => `
            <div class="car-card bg-white shadow-lg overflow-hidden relative">
                <div class="relative">
                    <img src="${car.images[0]}" alt="${car.name}" class="w-full h-64 object-cover">
                    <span class="car-badge ${car.condition}">
                        ${car.condition === 'new' ? 'Nuevo' : 'Usado'}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${car.year} ${car.name}</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.mileage} km</span>
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.type}</span>
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.color}</span>
                    </div>
                    <p class="text-2xl font-bold text-primary mb-4">${car.price}</p>
                    <button class="view-car-details w-full bg-dark text-white py-3 hover:bg-gray-800 transition-colors" 
                            data-car-id="${car.id}">
                        Ver Detalles
                    </button>
                </div>
            </div>
        `).join('');

        // Agregar event listeners a los botones
        document.querySelectorAll('.view-car-details').forEach(button => {
            button.addEventListener('click', () => showCarDetails(button.dataset.carId));
        });
    }

    // Mostrar Modal de Detalles
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
            <p><strong>Kilometraje:</strong> ${car.mileage} km</p>
            <p><strong>Motor:</strong> ${car.engine}</p>
            <p><strong>Potencia:</strong> ${car.power}</p>
            <p><strong>Transmisión:</strong> ${car.transmission}</p>
        `;

        // Actualizar especificaciones técnicas
        document.getElementById('technical-specs').innerHTML = Object.entries(car.specs)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');

        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        
        // Reinicializar Swiper
        if (swiper) {
            swiper.destroy();
        }
        initSwiper();
    }

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }
    });

    // Inicializar la página
    renderCarCards();
});