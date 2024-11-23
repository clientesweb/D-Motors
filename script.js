document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const nav = document.querySelector('nav div');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('hidden');
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    const cars = [
        { name: '2020 BMW X5 XDrive40i', year: 2020, mileage: 62255, type: 'GCC', color: 'Blue', price: '219,000 AED', image: 'https://projectonemotors.ae/wp-content/uploads/2023/11/Project-One-Motors-BMW-X5-blue.jpg', condition: 'pre-owned' },
        { name: '2022 RANGE ROVER AUTOBIOGRAPHY', year: 2022, mileage: 19817, type: 'GCC', color: 'White', price: '629,000 AED', image: 'https://projectonemotors.ae/wp-content/uploads/2023/11/Project-One-Motors-Range-Rover-Autobiography.jpg', condition: 'pre-owned' },
        { name: '2023 ROLLS ROYCE GHOST BLACK BADGE', year: 2023, mileage: 6216, type: 'GCC', color: 'Black', price: '1,399,000 AED', image: 'https://projectonemotors.ae/wp-content/uploads/2023/11/Project-One-Motors-Rolls-Royce-Ghost-Black-Badge.jpg', condition: 'pre-owned' },
        { name: '2022 PORSCHE 911 TURBO S', year: 2022, mileage: 18820, type: 'GCC', color: 'Grey', price: '789,000 AED', image: 'https://projectonemotors.ae/wp-content/uploads/2023/11/Project-One-Motors-Porsche-911-Turbo-S.jpg', condition: 'pre-owned' },
        { name: '2024 LAMBORGHINI URUS PERFORMANTE', year: 2024, mileage: 2304, type: 'GCC', color: 'Green', price: '1,699,000 AED', image: 'https://projectonemotors.ae/wp-content/uploads/2023/11/Project-One-Motors-Lamborghini-Urus-Performante.jpg', condition: 'pre-owned' },
        { name: '2025 ROLLS ROYCE CULLINAN SILVER BADGE', year: 2025, mileage: 0, type: 'Euro', color: 'Black', price: '2,499,000 AED', image: 'https://projectonemotors.ae/wp-content/uploads/2023/11/Project-One-Motors-Rolls-Royce-Cullinan.jpg', condition: 'brand-new' },
    ];

    const carContainer = document.getElementById('car-listings');

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'bg-white shadow-lg rounded-lg overflow-hidden relative';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="w-full h-48 object-cover">
            <div class="car-badge ${car.condition}">${car.condition === 'pre-owned' ? 'Pre-Owned' : 'Brand New'}</div>
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${car.name}</h3>
                <div class="flex flex-wrap mb-2">
                    <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${car.year}</span>
                    <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${car.mileage} km</span>
                    <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${car.type}</span>
                    <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${car.color}</span>
                </div>
                <p class="text-gray-600 text-lg font-bold mb-4">${car.price}</p>
                <button class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300 view-car">View Car</button>
            </div>
        `;
        carContainer.appendChild(carCard);

        const viewCarButton = carCard.querySelector('.view-car');
        viewCarButton.addEventListener('click', () => {
            modalTitle.textContent = car.name;
            modalDescription.innerHTML = `
                <p><strong>Year:</strong> ${car.year}</p>
                <p><strong>Mileage:</strong> ${car.mileage} km</p>
                <p><strong>Type:</strong> ${car.type}</p>
                <p><strong>Color:</strong> ${car.color}</p>
                <p><strong>Price:</strong> ${car.price}</p>
                <p><strong>Condition:</strong> ${car.condition === 'pre-owned' ? 'Pre-Owned' : 'Brand New'}</p>
            `;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });
});