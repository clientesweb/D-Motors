document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Preloader with smoother fade out
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        });
    }

    // Smooth scrolling for anchor links with improved easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                    y: target,
                    offsetY: 50
                },
                ease: "power3.inOut"
            });
        });
    });

    // Enhanced fade-in animation for sections
    const fadeElems = document.querySelectorAll('.fade-in');
    ScrollTrigger.batch(fadeElems, {
        onEnter: (elements) => {
            gsap.to(elements, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out"
            });
        },
        once: true
    });

    // Improved top banner messages with smoother transitions
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
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
                bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentMessageIndex]}</p>`;
                gsap.fromTo(bannerContainer, 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
                );
            }
        });
    }

    setInterval(rotateBannerMessage, 5000);

    // Smoother back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    ScrollTrigger.create({
        start: 100,
        onUpdate: (self) => {
            gsap.to(backToTopButton, { 
                opacity: self.progress, 
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    });

    backToTopButton.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: 0,
                autoKill: false
            },
            ease: "power4.inOut"
        });
    });

    // Enhanced notification function with smoother animations
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        document.body.appendChild(notification);

        gsap.fromTo(notification, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );

        gsap.to(notification, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: "power3.in",
            delay: 3,
            onComplete: () => {
                document.body.removeChild(notification);
            }
        });
    }

    // Improved GSAP animations for various sections
    gsap.utils.toArray('#vehicles .relative').forEach((vehicle, i) => {
        gsap.from(vehicle, {
            scrollTrigger: {
                trigger: vehicle,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out"
        });
    });

    gsap.from('#contact form', {
        scrollTrigger: {
            trigger: '#contact',
            start: "top center",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('#about img', {
        scrollTrigger: {
            trigger: '#about',
            start: "top center",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power3.out"
    });

    // Smoother WhatsApp button animation
    gsap.to('.bounce', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power1.inOut"
    });

    // Enhanced image slider for featured vehicles
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
        gsap.to(slider, {
            scrollLeft: scrollLeft - walk,
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // Improved parallax effect for hero section
    gsap.utils.toArray('.hero-parallax').forEach(layer => {
        const depth = layer.dataset.depth;
        const movement = -(layer.offsetHeight * depth)
        gsap.fromTo(layer, {
            y: 0
        }, {
            y: movement,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top top",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
            }
        })
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('#faq .bg-gray-900');
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('div:last-child');
        button.addEventListener('click', () => {
            content.classList.toggle('hidden');
            const icon = button.querySelector('svg');
            icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // Chatbot functionality
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotModal = document.getElementById('chatbot-modal');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    chatbotButton.addEventListener('click', () => {
        chatbotModal.classList.remove('hidden');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotModal.classList.add('hidden');
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            // Here you would typically send the message to your chatbot backend
            // and get a response. For now, we'll just echo the message back.
            setTimeout(() => {
                addMessage('bot', `Recibí tu mensaje: "${message}". Pronto un agente te responderá.`);
            }, 1000);
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('mb-4', sender === 'user' ? 'text-right' : 'text-left');
        messageElement.innerHTML = `
            <div class="${sender === 'user' ? 'bg-primary' : 'bg-gray-700'} inline-block rounded-lg px-4 py-2 max-w-3/4">
                <p class="text-white">${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Catalog image hover effect
    const catalogItems = document.querySelectorAll('#catalog .relative');
    catalogItems.forEach(item => {
        const image = item.querySelector('img');
        const overlay = item.querySelector('.absolute');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(image, { scale: 1.1, duration: 0.3 });
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(image, { scale: 1, duration: 0.3 });
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
        });
    });

    console.log("Enhanced D'Motors script loaded successfully!");
});

// Log a message to demonstrate the script is running
console.log("Enhanced D'Motors script executed in Node.js environment");