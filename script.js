document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.display = 'none';
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
        "Tu sueño sobre ruedas te espera en D'Motors"
    ];
    const bannerContainer = document.getElementById('banner-messages');
    let currentMessageIndex = 0;

    function rotateBannerMessage() {
        bannerContainer.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
            bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentMessageIndex]}</p>`;
            bannerContainer.style.transform = 'translateY(0)';
        }, 500);
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

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate featured vehicles on scroll
    gsap.utils.toArray('#vehicles .relative').forEach((vehicle, i) => {
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

    // Animate about section
    gsap.from('#about img', {
        scrollTrigger: {
            trigger: '#about',
            start: "top center",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8
    });

    // Animate Instagram posts
    gsap.utils.toArray('#instagram .w-80').forEach((post, i) => {
        gsap.from(post, {
            scrollTrigger: {
                trigger: post,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // WhatsApp button animation
    gsap.to('.bounce', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut"
    });

    // Notification for WhatsApp button
    setTimeout(() => {
        showNotification('¿Necesitas ayuda? ¡Contáctanos por WhatsApp!', 'info');
    }, 5000);

    // Push notification animation
    setTimeout(() => {
        const pushNotification = document.getElementById('push-notification');
        gsap.to(pushNotification, {
            x: 0,
            duration: 0.5,
            ease: "power2.out"
        });

        setTimeout(() => {
            gsap.to(pushNotification, {
                x: '100%',
                duration: 0.5,
                ease: "power2.in"
            });
        }, 5000);
    }, 10000);

    // Animación para el banner publicitario
    gsap.from('.mb-12.fade-in', {
        scrollTrigger: {
            trigger: '.mb-12.fade-in',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        opacity: 0,
        duration: 1
    });

    // Animación para las reseñas de clientes
    gsap.utils.toArray('.bg-gray-900').forEach((review, i) => {
        gsap.from(review, {
            scrollTrigger: {
                trigger: review,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // Animación para el mapa
    gsap.from('.rounded-lg.overflow-hidden.shadow-lg', {
        scrollTrigger: {
            trigger: '.rounded-lg.overflow-hidden.shadow-lg',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        opacity: 0,
        duration: 1
    });

    // Mejorar la animación del menú inferior
    gsap.from('.fixed.bottom-0 a', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
        }
    });

    // Animación para el slider de Instagram
    const instagramSlider = document.querySelector('.instagram-slider .flex');
    gsap.to(instagramSlider, {
        x: '-50%',
        ease: "none",
        duration: 20,
        repeat: -1
    });

    console.log("D'Motors script loaded successfully!");
});

// Log a message to confirm the script has been updated
console.log("D'Motors script has been updated with the latest changes.");