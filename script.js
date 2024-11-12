document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation for sections
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => observer.observe(elem));

    // Top banner messages
    const bannerMessages = [
        "Descubre el lujo en cada detalle con D'Motors",
        "Vehículos de alta gama para los más exigentes",
        "Tu sueño sobre ruedas te espera en D'Motors",
        "Experimenta la excelencia automotriz en D'Motors"
    ];
    const bannerContainer = document.getElementById('banner-messages');
    let currentMessageIndex = 0;

    function rotateBannerMessage() {
        gsap.to(bannerContainer, {
            y: '-100%',
            duration: 0.5,
            onComplete: () => {
                currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
                bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentMessageIndex]}</p>`;
                gsap.fromTo(bannerContainer, 
                    { y: '100%' },
                    { y: '0%', duration: 0.5 }
                );
            }
        });
    }

    setInterval(rotateBannerMessage, 5000);

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/your_formspree_id', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('¡Mensaje enviado con éxito!');
                    contactForm.reset();
                } else {
                    throw new Error('Error al enviar el mensaje');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.', 'error');
            }
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTopButton.classList.add('opacity-100');
            backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopButton.classList.remove('opacity-100');
            backToTopButton.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-opacity duration-300`;
        document.body.appendChild(notification);

        gsap.fromTo(notification, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3 }
        );

        setTimeout(() => {
            gsap.to(notification, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate featured vehicles on scroll
    gsap.utils.toArray('#vehicles .bg-gray-900').forEach((vehicle, i) => {
        gsap.from(vehicle, {
            scrollTrigger: {
                trigger: vehicle,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // Animate contact form
    gsap.from('#contact form', {
        scrollTrigger: {
            trigger: '#contact',
            start: "top center",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        duration: 0.8
    });

    // Modal functionality
    const modal = document.getElementById('vehicleModal');
    const modalContent = document.getElementById('modalContent');

    window.openModal = function(vehicleId) {
        // Fetch vehicle details and populate modal
        // This is a placeholder. Replace with actual data fetching logic
        const vehicleDetails = {
            'sedan-de-lujo': {
                title: 'Sedan de Lujo',
                image: '/placeholder.svg?height=300&width=400',
                specs: [
                    'Motor: V8 4.0L',
                    'Potencia: 500 HP',
                    '0-100 km/h: 3.5 segundos',
                    'Transmisión: Automática 8 velocidades'
                ],
                description: 'Experimenta el máximo lujo y rendimiento con nuestro Sedan de Lujo.',
                price: '$150,000'
            },
            'suv-premium': {
                title: 'SUV Premium',
                image: '/placeholder.svg?height=300&width=400',
                specs: [
                    'Motor: V6 3.0L',
                    'Potencia: 400 HP',
                    '0-100 km/h: 5.2 segundos',
                    'Transmisión: Automática 7 velocidades'
                ],
                description: 'Combina comodidad y potencia con nuestro SUV Premium.',
                price: '$120,000'
            },
            'deportivo-alto-rendimiento': {
                title: 'Deportivo de Alto Rendimiento',
                image: '/placeholder.svg?height=300&width=400',
                specs: [
                    'Motor: V10 5.2L',
                    'Potencia: 610 HP',
                    '0-100 km/h: 2.9 segundos',
                    'Transmisión: Automática de doble embrague 7 velocidades'
                ],
                description: 'Siente la adrenalina con nuestro Deportivo de Alto Rendimiento.',
                price: '$200,000'
            }
        };

        const vehicle = vehicleDetails[vehicleId];
        
        modalContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">${vehicle.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <img src="${vehicle.image}" alt="${vehicle.title}" class="w-full rounded-lg">
                <div>
                    <h3 class="text-xl font-bold mb-2">Especificaciones</h3>
                    <ul class="list-disc list-inside">
                        ${vehicle.specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <p class="mb-4">${vehicle.description}</p>
            <div class="flex justify-between items-center">
                <span class="text-2xl font-bold">Precio: ${vehicle.price}</span>
                <a href="https://wa.me/5493547504071?text=Estoy%20interesado%20en%20el%20${encodeURIComponent(vehicle.title)}" target="_blank" rel="noopener noreferrer" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    Consultar por WhatsApp
                </a>
            </div>
        `;
        
        gsap.fromTo(modal, 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.3, display: 'flex' }
        );
    }

    window.closeModal = function() {
        gsap.to(modal, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    console.log("D'Motors script loaded successfully!");
});