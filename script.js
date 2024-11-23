document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenu = document.getElementById('close-menu');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    }

    mobileMenuButton.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Car Data
    const cars = [
        {
            id: 1,
            name: '2024 Ferrari SF90 Stradale',
            price: '2,500,000 AED',
            condition: 'New',
            year: 2024,
            mileage: 0,
            engine: '4.0L V8 Twin-Turbo Hybrid',
            power: '986 hp',
            transmission: '8-Speed Dual-Clutch',
            acceleration: '2.5s 0-100 km/h',
            topSpeed: '340 km/h',
            images: [
                'car1-1.jpg',
                'car1-2.jpg',
                'car1-3.jpg',
                'car1-4.jpg'
            ],
            specs: {
                'Body Type': 'Coupe',
                'Fuel Type': 'Hybrid',
                'Drive Type': 'All-Wheel Drive',
                'Interior Color': 'Black',
                'Exterior Color': 'Rosso Corsa',
                'VIN': 'XXX123456789'
            }
        },
        // Add more cars here
    ];

    // Initialize Swiper
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

    // Render Car Cards
    const carListings = document.getElementById('car-listings');
    
    function renderCarCards() {
        carListings.innerHTML = cars.map(car => `
            <div class="car-card bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="relative">
                    <img src="${car.images[0]}" alt="${car.name}" class="w-full h-64 object-cover">
                    <span class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                        ${car.condition}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${car.name}</h3>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.year}</span>
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.mileage} km</span>
                        <span class="bg-gray-100 px-3 py-1 rounded-full text-sm">${car.engine}</span>
                    </div>
                    <p class="text-2xl font-bold text-red-600 mb-4">${car.price}</p>
                    <button class="view-car-details w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors" 
                            data-car-id="${car.id}">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners to view details buttons
        document.querySelectorAll('.view-car-details').forEach(button => {
            button.addEventListener('click', () => showCarDetails(button.dataset.carId));
        });
    }

    // Show Car Details Modal
    const modal = document.getElementById('car-modal');
    const closeModal = document.getElementById('close-modal');
    
    function showCarDetails(carId) {
        const car = cars.find(c => c.id === parseInt(carId));
        if (!car) return;

        document.getElementById('modal-title').textContent = car.name;
        
        // Update slider images
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = car.images.map(img => `
            <div class="swiper-slide">
                <img src="${img}" alt="${car.name}" class="w-full h-96 object-cover">
            </div>
        `).join('');

        // Update vehicle information
        document.getElementById('vehicle-info').innerHTML = `
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Condition:</strong> ${car.condition}</p>
            <p><strong>Year:</strong> ${car.year}</p>
            <p><strong>Mileage:</strong> ${car.mileage} km</p>
            <p><strong>Engine:</strong> ${car.engine}</p>
            <p><strong>Power:</strong> ${car.power}</p>
            <p><strong>Transmission:</strong> ${car.transmission}</p>
        `;

        // Update technical specifications
        document.getElementById('technical-specs').innerHTML = Object.entries(car.specs)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        
        // Reinitialize Swiper
        if (swiper) {
            swiper.destroy();
        }
        initSwiper();
    }

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    });

    // Initialize the page
    renderCarCards();
});