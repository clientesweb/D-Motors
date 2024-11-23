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
            setupCategoryFilter();
        })
        .catch(error => console.error('Error cargando los datos de autos:', error));

    // Filtro de categorías
    function setupCategoryFilter() {
        const categoryButtons = document.querySelectorAll('.category-item');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterCars(category);
            });
        });
    }

    function filterCars(category) {
        const filteredCars = category === 'all' ? cars : cars.filter(car => car.category === category);
        renderCarCards(filteredCars);
    }

    // Renderizar Tarjetas de Autos
    function renderCarCards(carsToRender = cars) {
        const carListings = document.getElementById('car-listings');
        carListings.innerHTML = carsToRender.map(car => `
            <div class="car-card">
                <div class="relative">
                    <img src="${car.images[0]}" alt="${car.name}" class="w-full h-64 object-cover">
                    <span class="car-badge ${car.condition}">
                        ${car.condition === 'new' ? 'Nuevo' : 'Usado'}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${car.year} ${car.name}</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.mileage.toLocaleString()} km</span>
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

    // Acordeón
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
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
});