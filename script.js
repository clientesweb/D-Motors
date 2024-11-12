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
                    duration: 0.5, // Reduced from 0.8 to make animations faster
                    ease: "power2.out"
                });
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => observer.observe(elem));

    // Customer reviews slider
    const reviewsTrack = document.querySelector('.reviews-track');
    if (reviewsTrack) {
        const reviews = reviewsTrack.querySelectorAll('.review-card');
        let currentIndex = 0;

        function showNextReview() {
            gsap.to(reviewsTrack, {
                x: -currentIndex * 100 + '%',
                duration: 0.5,
                ease: "power2.inOut"
            });
            currentIndex = (currentIndex + 1) % reviews.length;
        }

        setInterval(showNextReview, 5000); // Change review every 5 seconds
    }

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    gsap.to(otherItem.querySelector('.faq-answer'), {
                        height: 0,
                        duration: 0.3,
                        ease: "power2.inOut"
                    });
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            gsap.to(answer, {
                height: isOpen ? 0 : 'auto',
                duration: 0.3,
                ease: "power2.inOut"
            });
        });
    });

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

    // Instagram posts horizontal scroll
    const instagramScroll = document.querySelector('.instagram-scroll');
    if (instagramScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        instagramScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - instagramScroll.offsetLeft;
            scrollLeft = instagramScroll.scrollLeft;
        });

        instagramScroll.addEventListener('mouseleave', () => {
            isDown = false;
        });

        instagramScroll.addEventListener('mouseup', () => {
            isDown = false;
        });

        instagramScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - instagramScroll.offsetLeft;
            const walk = (x - startX) * 2;
            instagramScroll.scrollLeft = scrollLeft - walk;
        });
    }

    // Push notification animation
    const pushNotification = document.getElementById('push-notification');
    if (pushNotification) {
        setTimeout(() => {
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
    }

    // Parallax effect for hero section
    gsap.to('.hero-section video', {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Animate featured vehicles on scroll
    gsap.utils.toArray('.vehicle-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // Animate Instagram posts
    gsap.utils.toArray('.instagram-post').forEach((post, i) => {
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
    gsap.to('.whatsapp-button', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut"
    });

    console.log("D'Motors script loaded successfully!");
});

// Log a message to demonstrate the script is running
console.log("D'Motors script executed");