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
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
                bannerContainer.innerHTML = `
                    <p class="text-center w-full text-sm md:text-base font-semibold">
                        <i class="fas fa-star-of-life mr-2 animate-spin"></i>
                        <span>${bannerMessages[currentMessageIndex]}</span>
                        <i class="fas fa-star-of-life ml-2 animate-spin"></i>
                    </p>
                `;
                gsap.to(bannerContainer, { opacity: 1, duration: 0.5 });
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

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            try {
                // Replace with your actual newsletter subscription endpoint
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    showNotification('¡Gracias por suscribirte a nuestro boletín!');
                    newsletterForm.reset();
                } else {
                    throw new Error('Error al suscribirse al boletín');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Hubo un error al suscribirte. Por favor, intenta de nuevo.', 'error');
            }
        });
    }

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
                images: [
                    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
                ],
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
                images: [
                    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1536154010-4a88778fe2d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
                ],
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
                images: [
                    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
                ],
                specs: [
                    'Motor: V10 5.2L',
                    'Potencia: 610 HP',
                    '0-100 km/h: 2.9 segundos',
                    'Transmisión: Automática de doble embrague 7 velocidades'
                ],
                description: 'Siente la adrenalina con nuestro Deportivo de Alto Rendimiento.',
                price: '$200,000'
            },
            'coupe-elegante': {
                title: 'Coupé Elegante',
                images: [
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
                ],
                specs: [
                    'Motor: V6 3.0L Twin-Turbo',
                    'Potencia: 450 HP',
                    '0-100 km/h: 4.1 segundos',
                    'Transmisión: Automática 8 velocidades'
                ],
                description: 'Disfruta de la elegancia y el rendimiento en nuestro Coupé Elegante.',
                price: '$180,000'
            },
            'convertible-de-lujo': {
                title: 'Convertible de Lujo',
                images: [
                    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
                ],
                specs: [
                    'Motor: V8 4.4L Twin-Turbo',
                    'Potencia: 530 HP',
                    '0-100 km/h: 3.7 segundos',
                    'Transmisión: Automática 8 velocidades'
                ],
                description: 'Experimenta la libertad y el lujo con nuestro Convertible de Lujo.',
                price: '$220,000'
            },
            'crossover-urbano': {
                title: 'Crossover Urbano',
                images: [
                    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1543796076-c8a8d0dd0f7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
                    'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
                ],
                specs: [
                    'Motor: 2.0L Turbo',
                    'Potencia: 250 HP',
                    '0-100 km/h: 6.3 segundos',
                    'Transmisión: Automática 7 velocidades'
                ],
                description: 'Versatilidad y estilo se unen en nuestro Crossover Urbano.',
                price: '$95,000'
            }
        };
    
        const vehicle = vehicleDetails[vehicleId];
        
        modalContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">${vehicle.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="relative">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            ${vehicle.images.map(img => `
                                <div class="swiper-slide">
                                    <img src="${img}" alt="${vehicle.title}" class="w-full rounded-lg">
                                </div>
                            `).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </div>
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
        
        modal.classList.remove('hidden');
        
        // Initialize Swiper
        new Swiper('.swiper-container', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    window.closeModal = function() {
        modal.classList.add('hidden');
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    console.log("D'Motors script loaded successfully!");
});