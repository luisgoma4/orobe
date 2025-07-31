// Modern animations and interactions for OROBE website

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupHeaderScroll();
        this.setupProductHovers();
        this.setupParallaxEffects();
    }

    // Intersection Observer for scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animateElements = document.querySelectorAll('.card, .product-preview, .animate-fade-in-up');
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Header scroll effects
    setupHeaderScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class for styling
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // Enhanced product hover effects
    setupProductHovers() {
        const productPreviews = document.querySelectorAll('.product-preview');
        
        productPreviews.forEach(preview => {
            const container = preview.querySelector('.product-image-container');
            
            preview.addEventListener('mouseenter', () => {
                this.addHoverEffect(container);
            });
            
            preview.addEventListener('mouseleave', () => {
                this.removeHoverEffect(container);
            });

            // Add mouse move effect for subtle parallax
            preview.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e, container);
            });
        });
    }

    addHoverEffect(container) {
        container.style.transform = 'scale(1.05)';
    }

    removeHoverEffect(container) {
        container.style.transform = 'scale(1)';
    }

    handleMouseMove(e, container) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 5;
        const rotateY = (centerX - x) / centerX * 5;
        
        container.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Parallax effects for hero section
    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero.querySelector('.hero-content')) {
                hero.querySelector('.hero-content').style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Stagger animation for cards
    static staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * delay);
        });
    }

    // Loading animation
    static showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">OROBE</div>
                <div class="loader-spinner"></div>
            </div>
        `;
        document.body.appendChild(loader);

        // Remove loader after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Button ripple effect
class RippleEffect {
    static init() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
}

// Smooth reveal animations
class RevealAnimations {
    static init() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .animate-on-scroll.animated {
                opacity: 1;
                transform: translateY(0);
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
            }
            
            .loader-logo {
                font-size: 2rem;
                font-weight: 700;
                color: var(--color-primary);
                margin-bottom: 1rem;
                letter-spacing: 0.1em;
            }
            
            .loader-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid var(--color-border);
                border-top: 3px solid var(--color-accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            header.scrolled {
                background: rgba(255, 255, 255, 0.98);
                box-shadow: var(--shadow-md);
            }
            
            .product-image-container {
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to color all OROBE brand names in red
function colorOROBEBrandNames() {
    // Function to recursively search and replace text in text nodes
    function replaceTextInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (text.includes('OROBE')) {
                const parent = node.parentNode;
                const wrapper = document.createElement('span');
                wrapper.innerHTML = text.replace(/OROBE/g, '<span style="color: var(--color-accent) !important; font-weight: 600;">OROBE</span>');
                
                // Replace the text node with the new content
                while (wrapper.firstChild) {
                    parent.insertBefore(wrapper.firstChild, node);
                }
                parent.removeChild(node);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Skip script and style elements
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                // Process child nodes
                const children = Array.from(node.childNodes);
                children.forEach(child => replaceTextInNode(child));
            }
        }
    }

    // Apply to the entire document body
    replaceTextInNode(document.body);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loading animation
    AnimationController.showLoadingAnimation();
    
    // Initialize reveal animations styles
    RevealAnimations.init();
    
    // Initialize main animation controller
    new AnimationController();
    
    // Initialize ripple effects
    RippleEffect.init();
    
    // Color OROBE brand names
    colorOROBEBrandNames();
    
    // Stagger animate cards after a delay
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            AnimationController.staggerAnimation(cards, 150);
        }
    }, 1500);
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for use in other files
window.AnimationController = AnimationController;
window.RippleEffect = RippleEffect;
