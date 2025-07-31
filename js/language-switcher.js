class LanguageSwitcher {
    constructor() {
        this.currentLanguage = localStorage.getItem('orobe-language') || 'es';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.createLanguageToggle();
        this.updateContent();
        this.bindEvents();
    }

    async loadTranslations() {
        try {
            const [esResponse, enResponse] = await Promise.all([
                fetch('./languages/es.json'),
                fetch('./languages/en.json')
            ]);
            
            this.translations.es = await esResponse.json();
            this.translations.en = await enResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    createLanguageToggle() {
        // Update existing language toggle buttons instead of creating new ones
        this.updateToggleButtons();
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const newLang = e.target.dataset.lang;
                this.switchLanguage(newLang);
            }
        });
    }

    switchLanguage(lang) {
        if (lang !== this.currentLanguage) {
            this.currentLanguage = lang;
            localStorage.setItem('orobe-language', lang);
            this.updateContent();
            this.updateToggleButtons();
        }
    }

    updateToggleButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });
    }

    updateContent() {
        const currentTranslations = this.translations[this.currentLanguage];
        if (!currentTranslations) return;

        // Update navigation
        this.updateNavigation(currentTranslations.nav);
        
        // Update page-specific content based on current page
        const currentPage = this.getCurrentPage();
        switch (currentPage) {
            case 'index':
                this.updateHomePage(currentTranslations.home);
                break;
            case 'productos':
                this.updateProductsPage(currentTranslations.products);
                break;
            case 'sabermas':
                this.updateAboutPage(currentTranslations.about);
                break;
            case 'contacto':
                this.updateContactPage(currentTranslations.contact);
                break;
        }

        // Update footer
        this.updateFooter(currentTranslations.footer);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('productos')) return 'productos';
        if (path.includes('sabermas')) return 'sabermas';
        if (path.includes('contacto')) return 'contacto';
        return 'index';
    }

    updateNavigation(navTranslations) {
        // Update navigation links if they exist
        const navLinks = document.querySelectorAll('[data-translate]');
        navLinks.forEach(link => {
            const key = link.dataset.translate;
            if (navTranslations[key]) {
                link.textContent = navTranslations[key];
            }
        });
    }

    updateHomePage(homeTranslations) {
        // Update hero section
        const heroTitle = document.querySelector('[data-translate="hero-title"]');
        const heroSubtitle = document.querySelector('[data-translate="hero-subtitle"]');
        const heroDescription = document.querySelector('[data-translate="hero-description"]');
        const heroCta = document.querySelector('[data-translate="hero-cta"]');

        if (heroTitle) heroTitle.textContent = homeTranslations.hero.title;
        if (heroSubtitle) heroSubtitle.textContent = homeTranslations.hero.subtitle;
        if (heroDescription) heroDescription.textContent = homeTranslations.hero.description;
        if (heroCta) heroCta.textContent = homeTranslations.hero.cta;

        // Update welcome section
        const welcomeTitle = document.querySelector('[data-translate="welcome-title"]');
        const welcomeDescription = document.querySelector('[data-translate="welcome-description"]');
        const welcomeCta = document.querySelector('[data-translate="welcome-cta"]');

        if (welcomeTitle) welcomeTitle.textContent = homeTranslations.welcome.title;
        if (welcomeDescription) welcomeDescription.textContent = homeTranslations.welcome.description;
        if (welcomeCta) welcomeCta.textContent = homeTranslations.welcome.cta;

        // Update products section
        const productsTitle = document.querySelector('[data-translate="products-title"]');
        const productsDescription = document.querySelector('[data-translate="products-description"]');
        const productsCta = document.querySelector('[data-translate="products-cta"]');

        if (productsTitle) productsTitle.textContent = homeTranslations.products.title;
        if (productsDescription) productsDescription.textContent = homeTranslations.products.description;
        if (productsCta) productsCta.textContent = homeTranslations.products.cta;

        // Update product items
        if (homeTranslations.products.items) {
            const product1Title = document.querySelector('.product-title:first-of-type');
            const product1Desc = document.querySelector('.product-description:first-of-type');
            const product2Title = document.querySelector('.product-title:last-of-type');
            const product2Desc = document.querySelector('.product-description:last-of-type');

            if (product1Title) product1Title.textContent = homeTranslations.products.items.product1.title;
            if (product1Desc) product1Desc.textContent = homeTranslations.products.items.product1.description;
            if (product2Title) product2Title.textContent = homeTranslations.products.items.product2.title;
            if (product2Desc) product2Desc.textContent = homeTranslations.products.items.product2.description;
        }

        // Update values section
        if (homeTranslations.values) {
            const timelessTitle = document.querySelector('[data-translate="home-value-timeless-title"]');
            const timelessDesc = document.querySelector('[data-translate="home-value-timeless-description"]');
            const exclusiveTitle = document.querySelector('[data-translate="home-value-exclusive-title"]');
            const exclusiveDesc = document.querySelector('[data-translate="home-value-exclusive-description"]');
            const qualityTitle = document.querySelector('[data-translate="home-value-quality-title"]');
            const qualityDesc = document.querySelector('[data-translate="home-value-quality-description"]');

            if (timelessTitle) timelessTitle.textContent = homeTranslations.values.timeless.title;
            if (timelessDesc) timelessDesc.textContent = homeTranslations.values.timeless.description;
            if (exclusiveTitle) exclusiveTitle.textContent = homeTranslations.values.exclusive.title;
            if (exclusiveDesc) exclusiveDesc.textContent = homeTranslations.values.exclusive.description;
            if (qualityTitle) qualityTitle.textContent = homeTranslations.values.quality.title;
            if (qualityDesc) qualityDesc.textContent = homeTranslations.values.quality.description;
        }

        // Update home product items
        if (homeTranslations.products.items) {
            const product1Title = document.querySelector('[data-translate="home-product1-title"]');
            const product1Desc = document.querySelector('[data-translate="home-product1-description"]');
            const product2Title = document.querySelector('[data-translate="home-product2-title"]');
            const product2Desc = document.querySelector('[data-translate="home-product2-description"]');

            if (product1Title) product1Title.textContent = homeTranslations.products.items.product1.title;
            if (product1Desc) product1Desc.textContent = homeTranslations.products.items.product1.description;
            if (product2Title) product2Title.textContent = homeTranslations.products.items.product2.title;
            if (product2Desc) product2Desc.textContent = homeTranslations.products.items.product2.description;
        }
    }

    updateProductsPage(productsTranslations) {
        const pageTitle = document.querySelector('[data-translate="products-page-title"]');
        const pageSubtitle = document.querySelector('[data-translate="products-page-subtitle"]');
        const pageDescription = document.querySelector('[data-translate="products-description"]');

        if (pageTitle) pageTitle.textContent = productsTranslations.title;
        if (pageSubtitle) pageSubtitle.textContent = productsTranslations.subtitle;
        if (pageDescription) pageDescription.textContent = productsTranslations.description;

        // Update filter buttons
        Object.keys(productsTranslations.filter).forEach(key => {
            const filterBtn = document.querySelector(`[data-translate="filter-${key}"]`);
            if (filterBtn) filterBtn.textContent = productsTranslations.filter[key];
        });

        // Update product names and descriptions
        if (productsTranslations.items) {
            const product1Name = document.querySelector('[data-translate="product1-name"]');
            const product1Desc = document.querySelector('[data-translate="product1-description"]');
            const product1Cta = document.querySelector('[data-translate="product1-cta"]');
            const product2Name = document.querySelector('[data-translate="product2-name"]');
            const product2Desc = document.querySelector('[data-translate="product2-description"]');
            const product2Cta = document.querySelector('[data-translate="product2-cta"]');
            const product3Name = document.querySelector('[data-translate="product3-name"]');
            const product3Desc = document.querySelector('[data-translate="product3-description"]');
            const product3Cta = document.querySelector('[data-translate="product3-cta"]');
            const product4Name = document.querySelector('[data-translate="product4-name"]');
            const product4Desc = document.querySelector('[data-translate="product4-description"]');

            if (product1Name) product1Name.textContent = productsTranslations.items.product1.name;
            if (product1Desc) product1Desc.textContent = productsTranslations.items.product1.description;
            if (product1Cta) product1Cta.textContent = productsTranslations.items.product1.cta;
            if (product2Name) product2Name.textContent = productsTranslations.items.product2.name;
            if (product2Desc) product2Desc.textContent = productsTranslations.items.product2.description;
            if (product2Cta) product2Cta.textContent = productsTranslations.items.product2.cta;
            if (product3Name) product3Name.textContent = productsTranslations.items.product3.name;
            if (product3Desc) product3Desc.textContent = productsTranslations.items.product3.description;
            if (product3Cta) product3Cta.textContent = productsTranslations.items.product3.cta;
            if (product4Name) product4Name.textContent = productsTranslations.items.product4.name;
            if (product4Desc) product4Desc.textContent = productsTranslations.items.product4.description;
        }
    }

    updateAboutPage(aboutTranslations) {
        // Main page title and subtitle
        const pageTitle = document.querySelector('[data-translate="about-title"]');
        const pageSubtitle = document.querySelector('[data-translate="about-subtitle"]');
        
        if (pageTitle) pageTitle.textContent = aboutTranslations['about-title'];
        if (pageSubtitle) pageSubtitle.textContent = aboutTranslations['about-subtitle'];

        // Meaning section
        const meaningTitle = document.querySelector('[data-translate="meaning-title"]');
        const meaningContent1 = document.querySelector('[data-translate="meaning-content1"]');
        const meaningContent2 = document.querySelector('[data-translate="meaning-content2"]');

        if (meaningTitle) meaningTitle.textContent = aboutTranslations['meaning-title'];
        if (meaningContent1) meaningContent1.textContent = aboutTranslations['meaning-content1'];
        if (meaningContent2) meaningContent2.textContent = aboutTranslations['meaning-content2'];

        // Etymology meanings
        const etymologyMeaning1 = document.querySelector('[data-translate="etymology-meaning-1"]');
        const etymologyMeaning2 = document.querySelector('[data-translate="etymology-meaning-2"]');
        const etymologyMeaning3 = document.querySelector('[data-translate="etymology-meaning-3"]');

        if (etymologyMeaning1) etymologyMeaning1.textContent = aboutTranslations['etymology-meaning-1'];
        if (etymologyMeaning2) etymologyMeaning2.textContent = aboutTranslations['etymology-meaning-2'];
        if (etymologyMeaning3) etymologyMeaning3.textContent = aboutTranslations['etymology-meaning-3'];

        // Philosophy section
        const philosophyTitle = document.querySelector('[data-translate="philosophy-title"]');
        const philosophySubtitle = document.querySelector('[data-translate="philosophy-subtitle"]');
        
        if (philosophyTitle) philosophyTitle.textContent = aboutTranslations['philosophy-title'];
        if (philosophySubtitle) philosophySubtitle.textContent = aboutTranslations['philosophy-subtitle'];

        // Philosophy values
        const timelessTitle = document.querySelector('[data-translate="philosophy-values-timeless-title"]');
        const timelessDesc = document.querySelector('[data-translate="philosophy-values-timeless-description"]');
        const excellenceTitle = document.querySelector('[data-translate="philosophy-values-excellence-title"]');
        const excellenceDesc = document.querySelector('[data-translate="philosophy-values-excellence-description"]');
        const authenticityTitle = document.querySelector('[data-translate="philosophy-values-authenticity-title"]');
        const authenticityDesc = document.querySelector('[data-translate="philosophy-values-authenticity-description"]');

        if (timelessTitle) timelessTitle.textContent = aboutTranslations['philosophy-values-timeless-title'];
        if (timelessDesc) timelessDesc.textContent = aboutTranslations['philosophy-values-timeless-description'];
        if (excellenceTitle) excellenceTitle.textContent = aboutTranslations['philosophy-values-excellence-title'];
        if (excellenceDesc) excellenceDesc.textContent = aboutTranslations['philosophy-values-excellence-description'];
        if (authenticityTitle) authenticityTitle.textContent = aboutTranslations['philosophy-values-authenticity-title'];
        if (authenticityDesc) authenticityDesc.textContent = aboutTranslations['philosophy-values-authenticity-description'];

        // Journey section
        const journeyTitle = document.querySelector('[data-translate="journey-title"]');
        const journeySubtitle = document.querySelector('[data-translate="journey-subtitle"]');
        
        if (journeyTitle) journeyTitle.textContent = aboutTranslations['journey-title'];
        if (journeySubtitle) journeySubtitle.textContent = aboutTranslations['journey-subtitle'];

        // Timeline items
        const timeline2023Title = document.querySelector('[data-translate="timeline-2023-title"]');
        const timeline2023Desc = document.querySelector('[data-translate="timeline-2023-description"]');
        const timeline2024Title = document.querySelector('[data-translate="timeline-2024-title"]');
        const timeline2024Desc = document.querySelector('[data-translate="timeline-2024-description"]');
        const timeline2025Title = document.querySelector('[data-translate="timeline-2025-title"]');
        const timeline2025Desc = document.querySelector('[data-translate="timeline-2025-description"]');

        if (timeline2023Title) timeline2023Title.textContent = aboutTranslations['timeline-2023-title'];
        if (timeline2023Desc) timeline2023Desc.textContent = aboutTranslations['timeline-2023-description'];
        if (timeline2024Title) timeline2024Title.textContent = aboutTranslations['timeline-2024-title'];
        if (timeline2024Desc) timeline2024Desc.textContent = aboutTranslations['timeline-2024-description'];
        if (timeline2025Title) timeline2025Title.textContent = aboutTranslations['timeline-2025-title'];
        if (timeline2025Desc) timeline2025Desc.textContent = aboutTranslations['timeline-2025-description'];

        // Values section
        const valuesTitle = document.querySelector('[data-translate="values-title"]');
        const valuesSubtitle = document.querySelector('[data-translate="values-subtitle"]');
        
        if (valuesTitle) valuesTitle.textContent = aboutTranslations['values-title'];
        if (valuesSubtitle) valuesSubtitle.textContent = aboutTranslations['values-subtitle'];

        // Individual values
        const sustainabilityTitle = document.querySelector('[data-translate="values-sustainability-title"]');
        const sustainabilityDesc = document.querySelector('[data-translate="values-sustainability-description"]');
        const innovationTitle = document.querySelector('[data-translate="values-innovation-title"]');
        const innovationDesc = document.querySelector('[data-translate="values-innovation-description"]');
        const craftsmanshipTitle = document.querySelector('[data-translate="values-craftsmanship-title"]');
        const craftsmanshipDesc = document.querySelector('[data-translate="values-craftsmanship-description"]');
        const communityTitle = document.querySelector('[data-translate="values-community-title"]');
        const communityDesc = document.querySelector('[data-translate="values-community-description"]');

        if (sustainabilityTitle) sustainabilityTitle.textContent = aboutTranslations['values-sustainability-title'];
        if (sustainabilityDesc) sustainabilityDesc.textContent = aboutTranslations['values-sustainability-description'];
        if (innovationTitle) innovationTitle.textContent = aboutTranslations['values-innovation-title'];
        if (innovationDesc) innovationDesc.textContent = aboutTranslations['values-innovation-description'];
        if (craftsmanshipTitle) craftsmanshipTitle.textContent = aboutTranslations['values-craftsmanship-title'];
        if (craftsmanshipDesc) craftsmanshipDesc.textContent = aboutTranslations['values-craftsmanship-description'];
        if (communityTitle) communityTitle.textContent = aboutTranslations['values-community-title'];
        if (communityDesc) communityDesc.textContent = aboutTranslations['values-community-description'];
    }

    updateContactPage(contactTranslations) {
        const contactTitle = document.querySelector('[data-translate="contact-title"]');
        const contactSubtitle = document.querySelector('[data-translate="contact-subtitle"]');
        const contactDescription = document.querySelector('[data-translate="contact-description"]');
        
        const emailTitle = document.querySelector('[data-translate="email-title"]');
        const emailDescription = document.querySelector('[data-translate="email-description"]');
        
        const responseTitle = document.querySelector('[data-translate="response-title"]');
        const responseDescription = document.querySelector('[data-translate="response-description"]');
        
        const serviceTitle = document.querySelector('[data-translate="service-title"]');
        const serviceDescription = document.querySelector('[data-translate="service-description"]');
        
        const ctaTitle = document.querySelector('[data-translate="cta-title"]');
        const ctaDescription = document.querySelector('[data-translate="cta-description"]');
        const ctaButton = document.querySelector('[data-translate="cta-button"]');

        if (contactTitle) contactTitle.textContent = contactTranslations.title;
        if (contactSubtitle) contactSubtitle.textContent = contactTranslations.subtitle;
        if (contactDescription) contactDescription.textContent = contactTranslations.description;
        
        if (emailTitle) emailTitle.textContent = contactTranslations.email.title;
        if (emailDescription) emailDescription.textContent = contactTranslations.email.description;
        
        if (responseTitle) responseTitle.textContent = contactTranslations.response.title;
        if (responseDescription) responseDescription.textContent = contactTranslations.response.description;
        
        if (serviceTitle) serviceTitle.textContent = contactTranslations.service.title;
        if (serviceDescription) serviceDescription.textContent = contactTranslations.service.description;
        
        if (ctaTitle) ctaTitle.textContent = contactTranslations.cta.title;
        if (ctaDescription) ctaDescription.textContent = contactTranslations.cta.description;
        if (ctaButton) ctaButton.textContent = contactTranslations.cta.button;
    }

    updateFooter(footerTranslations) {
        const copyright = document.querySelector('[data-translate="copyright"]');
        if (copyright) copyright.textContent = footerTranslations.copyright;
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});
