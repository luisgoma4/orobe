// Products page functionality for OROBE website

class ProductsController {
    constructor() {
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.products = [];
        this.modal = null;
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupViewButtons();
        this.setupQuickView();
        this.setupModal();
        this.loadProducts();
        this.setupScrollAnimations();
    }

    // Setup filter functionality
    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setActiveFilter(button, filter);
                this.filterProducts(filter);
            });
        });
    }

    setActiveFilter(activeButton, filter) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
        this.currentFilter = filter;
    }

    filterProducts(filter) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach((card, index) => {
            const categories = card.dataset.category || '';
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                // Stagger the show animation
                setTimeout(() => {
                    card.classList.remove('hidden');
                }, index * 100);
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Setup view toggle functionality
    setupViewButtons() {
        const viewButtons = document.querySelectorAll('.view-btn');
        const productsGrid = document.getElementById('productsGrid');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const view = e.target.closest('.view-btn').dataset.view;
                this.setActiveView(button, view);
                this.changeView(view, productsGrid);
            });
        });
    }

    setActiveView(activeButton, view) {
        // Remove active class from all view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
        this.currentView = view;
    }

    changeView(view, grid) {
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
        
        // Trigger reflow for smooth transition
        grid.offsetHeight;
        
        // Re-apply current filter after view change
        this.filterProducts(this.currentFilter);
    }

    // Setup quick view functionality
    setupQuickView() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-view-btn')) {
                const button = e.target.closest('.quick-view-btn');
                const productId = button.dataset.product;
                this.showQuickView(productId);
            }
        });
    }

    showQuickView(productId) {
        const productData = this.getProductData(productId);
        if (productData) {
            this.openModal(productData);
        }
    }

    getProductData(productId) {
        // In a real application, this would fetch from an API
        const productDatabase = {
            '1': {
                name: 'Producto Elegante 1',
                description: 'Diseño exclusivo que combina elegancia minimalista con funcionalidad excepcional. Cada detalle ha sido cuidadosamente pensado para ofrecer una experiencia única.',
                price: '€299',
                image: 'images/producto1-frontal.jpeg'
            },
            '2': {
                name: 'Producto Sofisticado 2',
                description: 'Artesanía excepcional que refleja la esencia de la marca OROBE. Una pieza que trasciende las tendencias temporales.',
                price: '€399',
                image: 'images/producto2-frontal.jpeg'
            },
            '3': {
                name: 'Producto Innovador 3',
                description: 'La última incorporación a nuestra colección exclusiva. Innovación y tradición se encuentran en perfecta armonía.',
                price: '€249',
                image: 'images/OROBE.1.jpeg'
            }
        };
        
        return productDatabase[productId];
    }

    // Modal functionality
    setupModal() {
        this.modal = document.getElementById('quickViewModal');
        const closeButton = this.modal.querySelector('.modal-close');
        
        // Close modal on close button click
        closeButton.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Close modal on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(productData) {
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrice = document.getElementById('modalPrice');
        
        modalImage.src = productData.image;
        modalImage.alt = productData.name;
        modalTitle.textContent = productData.name;
        modalDescription.textContent = productData.description;
        modalPrice.textContent = productData.price;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Load products (placeholder for future API integration)
    loadProducts() {
        const productCards = document.querySelectorAll('.product-card');
        
        // Simulate loading state
        productCards.forEach((card, index) => {
            card.classList.add('loading');
            
            setTimeout(() => {
                card.classList.remove('loading');
                card.classList.add('animate-on-scroll');
            }, 500 + (index * 100));
        });
    }

    // Setup scroll animations for products
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

        // Observe product cards
        setTimeout(() => {
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach(card => {
                observer.observe(card);
            });
        }, 1000);
    }

    // Search functionality (for future implementation)
    setupSearch() {
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                this.searchProducts(searchTerm);
            });
        }
    }

    searchProducts(searchTerm) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            
            const matches = productName.includes(searchTerm) || productDescription.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Sort functionality
    setupSort() {
        const sortSelect = document.getElementById('productSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                const sortBy = e.target.value;
                this.sortProducts(sortBy);
            });
        }
    }

    sortProducts(sortBy) {
        const productsGrid = document.getElementById('productsGrid');
        const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
        
        productCards.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    const nameA = a.querySelector('.product-name').textContent;
                    const nameB = b.querySelector('.product-name').textContent;
                    return nameA.localeCompare(nameB);
                
                case 'price-low':
                    const priceA = this.extractPrice(a.querySelector('.product-price').textContent);
                    const priceB = this.extractPrice(b.querySelector('.product-price').textContent);
                    return priceA - priceB;
                
                case 'price-high':
                    const priceA2 = this.extractPrice(a.querySelector('.product-price').textContent);
                    const priceB2 = this.extractPrice(b.querySelector('.product-price').textContent);
                    return priceB2 - priceA2;
                
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        productCards.forEach(card => {
            productsGrid.appendChild(card);
        });
    }

    extractPrice(priceText) {
        const price = priceText.replace(/[€$,]/g, '');
        return parseFloat(price) || 0;
    }

    // Wishlist functionality (for future implementation)
    setupWishlist() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) {
                const button = e.target.closest('.wishlist-btn');
                const productId = button.dataset.product;
                this.toggleWishlist(productId, button);
            }
        });
    }

    toggleWishlist(productId, button) {
        const isInWishlist = button.classList.contains('active');
        
        if (isInWishlist) {
            button.classList.remove('active');
            this.removeFromWishlist(productId);
        } else {
            button.classList.add('active');
            this.addToWishlist(productId);
        }
    }

    addToWishlist(productId) {
        // Implementation for adding to wishlist
        console.log(`Added product ${productId} to wishlist`);
    }

    removeFromWishlist(productId) {
        // Implementation for removing from wishlist
        console.log(`Removed product ${productId} from wishlist`);
    }
}

// Enhanced product card interactions
class ProductCardEnhancer {
    static init() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            this.enhanceCard(card);
        });
    }

    static enhanceCard(card) {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768) { // Only on desktop
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 5;
                const rotateY = (centerX - x) / centerX * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductsController();
    ProductCardEnhancer.init();
});

// Export for use in other files
window.ProductsController = ProductsController;
window.ProductCardEnhancer = ProductCardEnhancer;
