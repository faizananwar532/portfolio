document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Navigation
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('.hero');
    
    // Intersection Observer for navbar
    const navObserver = new IntersectionObserver(
        (entries) => {
            if (!entries[0].isIntersecting) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        },
        { threshold: 0.9 }
    );
    
    if (header) {
        navObserver.observe(header);
    }
    
    // Enhanced Mobile Navigation
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links with Stagger Effect
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Animate Burger
            burger.classList.toggle('toggle');
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Smooth Scrolling with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    document.body.classList.remove('nav-open');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                // Calculate scroll position with navbar offset
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced Scroll Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.classList.add('initially-hidden');
        appearOnScroll.observe(element);
    });
    
    // Project Filtering with Smooth Transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button with ripple effect
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.blur();
            });
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects with smooth transitions
            projectCards.forEach(card => {
                card.classList.add('transitioning');
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('transitioning');
                        }, 50);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('transitioning');
                    }
                }, 300);
            });
        });
    });
    
    // Add Material Ripple Effect to Buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add dynamic styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .initially-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .appear {
        opacity: 1;
        transform: translateY(0);
    }
    
    .transitioning {
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-open {
        overflow: hidden;
    }
    
    .navbar-scrolled {
        padding: calc(var(--spacing-unit)) 0;
        background-color: rgba(255, 255, 255, 0.98);
    }
`;
document.head.appendChild(style);