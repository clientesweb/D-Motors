document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 50
                },
                ease: "power2.inOut"
            });
        });
    });

    // Fade-in animation for sections
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
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
        gsap.to(bannerContainer, {
            y: -30,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
                bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentMessageIndex]}</p>`;
                gsap.fromTo(bannerContainer, 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5 }
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
            gsap.to(backToTopButton, { opacity: 1, duration: 0.3 });
        } else {
            gsap.to(backToTopButton, { opacity: 0, duration: 0.3 });
        }
    });

    backToTopButton.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: 0,
                autoKill: false
            },
            ease: "power2.inOut"
        });
    });

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        document.body.appendChild(notification);

        gsap.fromTo(notification, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        setTimeout(() => {
            gsap.to(notification, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
    gsap.utils.toArray('#instagram .bg-gray-900').forEach((post, i) => {
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

    // Image slider for featured vehicles
    const slider = document.querySelector('.horizontal-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Push notification animation
    setTimeout(() => {
        const pushNotification = document.getElementById('push-notification');
        gsap.fromTo(pushNotification,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        setTimeout(() => {
            gsap.to(pushNotification, {
                y: 100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });
        }, 5000);
    }, 10000);

    // Banner ad animation
    gsap.from('#banner-ad', {
        scrollTrigger: {
            trigger: '#banner-ad',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        opacity: 0,
        duration: 1
    });

    // Customer reviews animation
    gsap.utils.toArray('.review').forEach((review, i) => {
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

    // Map animation
    gsap.from('#map', {
        scrollTrigger: {
            trigger: '#map',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        opacity: 0,
        duration: 1
    });

    // Bottom menu animation
    gsap.from('.bottom-menu a', {
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

    // Instagram slider animation
    const instagramSlider = document.querySelector('.instagram-slider .flex');
    gsap.to(instagramSlider, {
        x: '-50%',
        ease: "none",
        duration: 20,
        repeat: -1
    });

    // New feature: Parallax effect for hero section
    gsap.to('.hero-parallax', {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
        }
    });

    console.log("D'Motors script loaded successfully!");
});

// Log a message to demonstrate the script is running
console.log("D'Motors script executed in Node.js environment");