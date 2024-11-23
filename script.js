document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const nav = document.querySelector('nav div');

    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('hidden');
    });

    // Simulated car data
    const cars = [
        { name: 'Ferrari SF90 Stradale', year: 2023, price: '$500,000', image: 'https://projectonemotors.ae/wp-content/uploads/2023/05/Ferrari-SF90-Stradale.jpg' },
        { name: 'Lamborghini Aventador', year: 2022, price: '$450,000', image: 'https://projectonemotors.ae/wp-content/uploads/2023/05/Lamborghini-Aventador.jpg' },
        { name: 'Porsche 911 GT3 RS', year: 2023, price: '$250,000', image: 'https://projectonemotors.ae/wp-content/uploads/2023/05/Porsche-911-GT3-RS.jpg' },
    ];

    const carContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');

    cars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'bg-white shadow-lg rounded-lg overflow-hidden';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${car.name}</h3>
                <p class="text-gray-600">Year: ${car.year}</p>
                <p class="text-gray-600">Price: ${car.price}</p>
                <button class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">View Details</button>
            </div>
        `;
        carContainer.appendChild(carCard);
    });
});

