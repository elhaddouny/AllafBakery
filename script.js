// ===== GLOBAL VARIABLES & CONFIGURATION =====
const CONFIG = {
    WHATSAPP_NUMBER: '212681848262',
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    TYPING_SPEED: 50,
    AUTO_SAVE_INTERVAL: 5000,
    MAX_CART_ITEMS: 50,
    SEARCH_DEBOUNCE: 300,
    VISITOR_STORAGE_KEY: 'allaf_visitor_count',
    CART_STORAGE_KEY: 'allaf_cart_items',
    THEME_STORAGE_KEY: 'allaf_theme_preference'
};

// Global state management
const AppState = {
    cart: JSON.parse(localStorage.getItem(CONFIG.CART_STORAGE_KEY)) || [],
    currentTheme: localStorage.getItem(CONFIG.THEME_STORAGE_KEY) || 'light',
    isCartOpen: false,
    isSearchOpen: false,
    isLoading: true,
    currentSection: 'home',
    searchResults: [],
    visitorCount: parseInt(localStorage.getItem(CONFIG.VISITOR_STORAGE_KEY)) || 0
};

// Product database
const PRODUCTS_DATABASE = [
    {
        id: 1,
        name: 'خبز طازج',
        category: 'bread',
        price: 2.50,
        image: 'images/bread-1.jpg',
        description: 'خبز طازج يومياً من أجود أنواع الدقيق',
        ingredients: ['دقيق قمح', 'خميرة طبيعية', 'ملح البحر', 'زيت زيتون'],
        nutritionFacts: { calories: 250, protein: 8, carbs: 45, fat: 2 },
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: 'كرواسون بالزبدة',
        category: 'bread',
        price: 4.00,
        image: 'images/croissant.jpg',
        description: 'كرواسون فرنسي أصيل بالزبدة الطبيعية',
        ingredients: ['دقيق فرنسي', 'زبدة طبيعية', 'بيض طازج', 'سكر'],
        nutritionFacts: { calories: 350, protein: 6, carbs: 35, fat: 18 },
        inStock: true,
        featured: false
    },
    {
        id: 3,
        name: 'مسمن معسل',
        category: 'sweets',
        price: 3.50,
        image: 'images/msemen.jpg',
        description: 'مسمن تقليدي محشو بالعسل الطبيعي',
        ingredients: ['دقيق', 'سميد', 'عسل طبيعي', 'زبدة'],
        nutritionFacts: { calories: 280, protein: 5, carbs: 40, fat: 12 },
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: 'كيكة الشوكولا',
        category: 'cakes',
        price: 45.00,
        image: 'images/chocolate-cake.jpg',
        description: 'كيكة شوكولا فاخرة مع كريمة الشوكولا',
        ingredients: ['شوكولا بلجيكية', 'دقيق', 'بيض', 'كريمة طازجة'],
        nutritionFacts: { calories: 450, protein: 6, carbs: 55, fat: 22 },
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: 'قهوة عربية',
        category: 'drinks',
        price: 8.00,
        image: 'images/arabic-coffee.jpg',
        description: 'قهوة عربية أصيلة محمصة طازجة',
        ingredients: ['حبوب قهوة عربية', 'هيل', 'زعفران'],
        nutritionFacts: { calories: 5, protein: 0, carbs: 1قلاوة بالفستق',
        category: 'sweets',
        price: 25.00,
        image: 'images/baklava.jpg',
        description: 'بقلاوة تركية أصيلة محشوة بالفستق الحلبي',
        ingredients: ['عجينة فيلو', 'فستق حلبي', 'عسل', 'سكر'],
        nutritionFacts: { calories: 320, protein: 8, carbs: 35, fat: 18 },
        inStock: true,
        featured: false
    }
];

// Testimonials data
const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: 'أحمد المرابط',
        role: 'عميل دائم',
        avatar: 'images/testimonial-1.jpg',
        text: 'أفضل مخبزة في المدينة! الخبز طازج دائماً والحلويات لذيذة جداً. أنصح الجميع بتجربة منتجاتهم.',
        rating: 5
    },
    {
        id: 2,
        name: 'فاطمة الزهراء',
        role: 'ربة منزل',
        avatar: 'images/testimonial-2.jpg',
        text: 'خدمة ممتازة وجودة عالية. طلبت كيكة عيد ميلاد لابنتي وكانت رائعة، الجميع أعجب بها.',
        rating: 5
    },
    {
        id: 3,
        name: 'محمد الإدريسي',
        role: 'صاحب مطعم',
        avatar: 'images/testimonial-3.jpg',
        text: 'نتعامل مع مخبزة علاّف منذ سنوات لتوريد الخبز لمطعمنا. جودة ثابتة وأسعار معقولة.',
        rating: 5
    }
];

// Gallery images data
const GALLERY_DATA = [
    { id: 1, src: 'images/gallery-1.jpg', alt: 'خبز طازج من الفرن', category: 'bread' },
    { id: 2, src: 'images/gallery-2.jpg', alt: 'حلويات شرقية متنوعة', category: 'sweets' },
    { id: 3, src: 'images/gallery-3.jpg', alt: 'كيكة زفاف فاخرة', category: 'cakes' },
    { id: 4, src: 'images/gallery-4.jpg', alt: 'معجنات متنوعة', category: 'bread' },
    { id: 5, src: 'images/gallery-5.jpg', alt: 'تحضير الحلويات', category: 'sweets' },
    { id: 6, src: 'images/gallery-6.jpg', alt: 'داخل المخبزة', category: 'generalfunc(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format price in Moroccan Dirham
    formatPrice(price) {
        return `${price.toFixed(2)} درهم`;
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Smooth scroll to element
    smoothScrollTo(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    // Animate counter
    animateCounter(element, target, duration = 2000) {
        let
                clearInterval(timer);
            }
        }, 16);
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Lazy load images
    lazyLoadImage(img) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    observer.unobserve(image);
                }
            });
        });
        
        imageObserver.observe(img);
    }
};

// ===== CART MANAGEMENT =====
const CartManager = {
    // Add item to cart
    addItem(productId, quantity = 1) {
        const product = PRODUCTS_DATABASE.find(p => p.id === productId);
        if (!product) {
            Utils.showNotification('المنتج غير موجود', 'error');
            return false;
        }

        if (!product.inStock) {
            Utils.showNotification('المنتج غير متوفر حالياً', 'error');
            return false;
        }

        const existingItem = AppState.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            AppState.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        Utils.showNotification(`تم إضافة ${product.name} إلى السلة`);
        
        // Animate cart icon
        const cartBtn = document.getElementById('cart-btn');
        cartBtn.classList.add('bounce');
        setTimeout(() => cartBtn.classList.remove('bounce'), 500);
        
        return true;
    },

    // Remove item from cart
    removeItem(productId) {
        AppState.cart = AppState.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        Utils.showNotification('تم حذف المنتج من السلة');
    },

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = AppState.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    },

    // Clear entire cart
    clearCart() {
        AppState.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        Utils.showNotification('تم إفراغ السلة');
    },

    // Get cart total
    getTotal() {
        return AppState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Get cart item count
    getItemCount() {
        return AppState.cart.reduce((count, item) => count + item.quantity, 0);
    },

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(AppState.cart));
    },

    // Update cart display
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartBody = document.getElementById('cart-body');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) {
            const itemCount = this.getItemCount();
            cartCount.textContent = itemCount;
            cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
        }
        
        if (cartBody) {
            cartBody.innerHTML = '';
            
            if (AppState.cart.length === 0) {
                cartBody.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-basket"></i>
                        <p>السلة فارغة</p>
                        <p>أضف بعض المنتجات اللذيذة!</p>
                    </div>
                `;
            } else {
                AppState.cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="item-info">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">${Utils.formatPrice(item.price)}</div>
                        </div>
                        <div class="item-controls">
                            <button class="quantity-btn" onclick="CartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="CartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-btn" onclick="CartManager.removeItem(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    cartBody.appendChild(cartItem);
                });
            }
        }
        
        if (cartTotal) {
            cartTotal.textContent = Utils.formatPrice(this.getTotal());
        }
    },

    // Generate WhatsApp message
    generateWhatsAppMessage() {
        if (AppState.cart.length === 0) {
            Utils.showNotification('السلة فارغة! أضف منتجات أولاً', 'error');
            return;
        }

        let message = 'مرحباً مخبزة علاّف 🍞\n\nأود طلب المنتجات التالية:\n\n';
        
        AppState.cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   الكمية: ${item.quantity}\n`;
            message += `   السعر: ${Utils.formatPrice(item.price * item.quantity)}\n\n`;
        });
        
        message += `💰 المجموع الإجمالي: ${Utils.formatPrice(this.getTotal())}\n\n`;
        message += 'شكراً لكم 🙏';
        
        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        Utils.showNotification('تم توجيهك إلى واتساب لإتمام الطلب');
    }
};

// ===== SEARCH FUNCTIONALITY =====
const SearchManager = {
    // Initialize search
    init() {
        const searchBtn = document.getElementById('search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        const searchClose = document.getElementById('search-close');
        const searchResults = document.getElementById('search-results');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.openSearch());
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => this.closeSearch());
        }

        if (searchOverlay) {
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    this.closeSearch();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.performSearch(e.target.value);
            }, CONFIG.SEARCH_DEBOUNCE));

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }
    },

    // Open search overlay
    openSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            AppState.isSearchOpen = true;
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 100);
        }
    },

    // Close search overlay
    closeSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
            AppState.isSearchOpen = false;
            document.body.style.overflow = '';
            
            if (searchInput) {
                searchInput.value = '';
            }
            
            this.clearResults();
        }
    },

    // Perform search
    performSearch(query) {
        const searchResults = document.getElementById('search-results');
        
        if (!query.trim()) {
            this.clearResults();
            return;
        }

        const results = PRODUCTS_DATABASE.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(results);
    },

    // Display search results
    displayResults(results) {
        const searchResults = document.getElementById('search-results');
        
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>لم يتم العثور على نتائج</p>
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(product => `
                <div class="search-result-item" onclick="SearchManager.selectProduct(${product.id})">
                    <img src="${product.image}" alt="${product.name}" class="result-image">
                    <div class="result-info">
                        <h4 class="result-name">${product.name}</h4>
                        <p class="result-description">${product.description}</p>
                        <span class="result-price">${Utils.formatPrice(product.price)}</span>
                    </div>
                    <button class="result-add-btn" onclick="event.stopPropagation(); CartManager.addItem(${product.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            `).join('');
        }
    },

    // Clear search results
    clearResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    },

    // Select product from search results
    selectProduct(productId) {
        this.closeSearch();
        // Scroll to products section and highlight the product
        const productsSection = document.getElementById('products');
        if (productsSection) {
            Utils.smoothScrollTo(productsSection);
        }
    }
};

// ===== THEME MANAGER =====
const ThemeManager = {
    // Initialize theme
    init() {
        this.applyTheme(AppState.currentTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    },

    // Toggle theme
    toggleTheme() {
        AppState.currentTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(AppState.currentTheme);
        this.saveTheme();
    },

    // Apply theme
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    },

    // Save theme preference
    saveTheme() {
        localStorage.setItem(CONFIG.THEME_STORAGE_KEY, AppState.currentTheme);
    }
};

// ===== NAVIGATION MANAGER =====
const NavigationManager = {
    // Initialize navigation
    init() {
        this.setupSmoothScrolling();
        this.setupActiveSection();
        this.setupMobileMenu();
        this.setupScrollEffects();
    },

    // Setup smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    Utils.smoothScrollTo(targetElement);
                    this.setActiveLink(link);
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    },

    // Setup active section detection
    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(en
// ===== GLOBAL VARIABLES & CONFIGURATION =====
const CONFIG = {
    WHATSAPP_NUMBER: '212681848262',
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    PRODUCTS_PER_PAGE: 12,
    GALLERY_ITEMS_PER_PAGE: 9,
    TESTIMONIALS_AUTO_PLAY: true,
    TESTIMONIALS_INTERVAL: 5000,
    SEARCH_DEBOUNCE_DELAY: 300,
    CART_STORAGE_KEY: 'allaf_cart',
    VISITOR_STORAGE_KEY: 'allaf_visitor_count',
    THEME_STORAGE_KEY: 'allaf_theme'
};

// Global state management
const AppState = {
    cart: JSON.parse(localStorage.getItem(CONFIG.CART_STORAGE_KEY)) || [],
    currentProductPage: 1,
    currentGalleryPage: 1,
    currentTestimonial: 0,
    isCartOpen: false,
    isSearchOpen: false,
    isQuickViewOpen: false,
    currentTheme: localStorage.getItem(CONFIG.THEME_STORAGE_KEY) || 'light',
    searchResults: [],
    filteredProducts: [],
    currentCategory: 'all'
};

// Sample data (in a real application, this would come from an API)
const PRODUCTS_DATA = [
    {
        id: 1,
        name: 'خبز طازج',
        description: 'خبز يومي طازج مخبوز بأجود المكونات الطبيعية',
        price: 2.50,
        category: 'bread',
        image: 'images/bread-1.jpg',
        featured: true,
        ingredients: ['دقيق قمح', 'خميرة طبيعية', 'ملح البحر', 'زيت زيتون'],
        nutritionFacts: { calories: 250, protein: 8, carbs: 45, fat: 2 }
    },
    {
        id: 2,
        name: 'كرواسون بالزبدة',
        description: 'كرواسون فرنسي أصيل بالزبدة الطبيعية',
        price: 4.00,
        category: 'bread',
        image: 'images/croissant-1.jpg',
        featured: false,
        ingredients: ['دقيق فرنسي', 'زبدة طبيعية', 'خميرة', 'سكر', 'ملح'],
        nutritionFacts: { calories: 350, protein: 6, carbs: 35, fat: 18 }
    },
    {
        id: 3,
        name: 'بقلاوة بالفستق',
        description: 'بقلاوة تقليدية محشوة بالفستق الحلبي الفاخر',
        price: 15.00,
        category: 'sweets',
        image: 'images/baklava-1.jpg',
        featured: true,
        ingredients: ['عجينة فيلو', 'فستق حلبي', 'عسل طبيعي', 'سكر', 'ماء ورد'],
        nutritionFacts: { calories: 450, protein: 8, carbs: 55, fat: 22 }
    },
    {
        id: 4,
        name: 'كيكة الشوكولاتة',
        description: 'كيكة شوكولاتة غنية ومثالية لجميع المناسبات',
        price: 45.00,
        category: 'cakes',
        image: 'images/chocolate-cake-1.jpg',
        featured: true,
        ingredients: ['شوكولاتة بلجيكية', 'دقيق', 'بيض طازج', 'زبدة', 'سكر'],
        nutritionFacts: { calories: 380, protein: 5, carbs: 48, fat: 18 }
    },
    {
        id: 5,
        name: 'مسمن بالعسل',
        description: 'مسمن مغربي تقليدي محلى بالعسل الطبيعي',
        price: 3.50,
        category: 'bread',
        image: 'images/msemen-1.jpg',
        featured: false,
        ingredients: ['دقيق', 'سميد', 'زيت أركان', 'ملح', 'عسل طبيعي'],
        nutritionFacts: { calories: 280, protein: 6, carbs: 42, fat: 8 }
    },
    {
        id: 6,
        name: 'قهوة عربية',
        description: 'قهوة عربية أصيلة محمصة طازجة',
        price: 8.00,
        category: 'drinks',
        image: 'images/arabic-coffee-1.jpg',
        featured: false,
        ingredients: ['حبوب قهوة عربية', 'هيل', 'زعفران'],
        nutritionFacts: { calories: 5, protein: 0, carbs: 1, fat: 0 }
    },
    {
        id: 7,
        name: 'تورتة الفراولة',
        description: 'تورتة طازجة بالفراولة والكريمة الطبيعية',
        price: 55.00,
        category: 'cakes',
        image: 'images/strawberry-cake-1.jpg',
        featured: false,
        ingredients: ['فراولة طازجة', 'كريمة طبيعية', 'بسكويت', 'جيلاتين', 'سكر'],
        nutritionFacts: { calories: 320, protein: 4, carbs: 38, fat: 16 }
    },
    {
        id: 8,
        name: 'معمول بالتمر',
        description: 'معمول تقليدي محشو بالتمر الطبيعي',
        price: 12.00,
        category: 'sweets',
        image: 'images/maamoul-1.jpg',
        featured: false,
        ingredients: ['دقيق', 'سميد', 'تمر طبيعي', 'زبدة', 'ماء زهر'],
        nutritionFacts: { calories: 290, protein: 4, carbs: 45, fat: 10 }
    }
];

const GALLERY_DATA = [
    { id: 1, image: 'images/gallery-1.jpg', title: 'مخبوزات طازجة', category: 'bread' },
    { id: 2, image: 'images/gallery-2.jpg', title: 'حلويات شرقية', category: 'sweets' },
    { id: 3, image: 'images/gallery-3.jpg', title: 'كيك وتورتات', category: 'cakes' },
    { id: 4, image: 'images/gallery-4.jpg', title: 'معجنات متنوعة', category: 'bread' },
    { id: 5, image: 'images/gallery-5.jpg', title: 'حلويات العيد', category: 'sweets' },
    { id: 6, image: 'images/gallery-6.jpg', title: 'كيك الأطفال', category: 'cakes' },
    { id: 7, image: 'images/gallery-7.jpg', title: 'خبز الصباح', category: 'bread' },
    { id: 8, image: 'images/gallery-8.jpg', title: 'حلويات رمضان', category: 'sweets' },
    { id: 9, image: 'images/gallery-9.jpg', title: 'تورتات الزفاف', category: 'cakes' }
];

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: 'أحمد المرابط',
        role: 'عميل دائم',
        text: 'أفضل مخبزة في المدينة! الخبز طازج دائماً والحلويات لذيذة جداً. أنصح الجميع بتجربة منتجاتهم.',
        avatar: 'images/testimonial-1.jpg',
        rating: 5
    },
    {
        id: 2,
        name: 'فاطمة الزهراء',
        role: 'ربة منزل',
        text: 'منذ اكتشفت مخبزة علاّف وأنا لا أشتري من مكان آخر. الجودة ممتازة والأسعار معقولة جداً.',
        avatar: 'images/testimonial-2.jpg',
        rating: 5
    },
    {
        id: 3,
        name: 'محمد الإدريسي',
        role: 'صاحب مطعم',
        text: 'نتعامل مع مخبزة علاّف لتوريد الخبز لمطعمنا. الخدمة ممتازة والالتزام بالمواعيد رائع.',
        avatar: 'images/testimonial-3.jpg',
        rating: 5
    }
];

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format price in Moroccan Dirham
    formatPrice: (price) => {
        return `${price.toFixed(2)} درهم`;
    },

    // Generate unique ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Smooth scroll to element
    scrollToElement: (element, offset = 0) => {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animate number counting
    animateNumber: (element, start, end, duration = 2000) => {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    },

    // Show notification
    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// ===== CART MANAGEMENT =====
const CartManager = {
    // Add item to cart
    addItem: (productId, quantity = 1) => {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = AppState.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            AppState.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        CartManager.saveCart();
        CartManager.updateCartUI();
        Utils.showNotification(`تم إضافة ${product.name} إلى السلة`);
        return true;
    },

    // Remove item from cart
    removeItem: (productId) => {
        AppState.cart = AppState.cart.filter(item => item.id !== productId);
        CartManager.saveCart();
        CartManager.updateCartUI();
        Utils.showNotification('تم حذف المنتج من السلة');
    },

    // Update item quantity
    updateQuantity: (productId, quantity) => {
        const item = AppState.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                CartManager.removeItem(productId);
            } else {
                item.quantity = quantity;
                CartManager.saveCart();
                CartManager.updateCartUI();
            }
        }
    },

    // Clear cart
    clearCart: () => {
        AppState.cart = [];
        CartManager.saveCart();
        CartManager.updateCartUI();
        Utils.showNotification('تم إفراغ السلة');
    },

    // Get cart total
    getTotal: () => {
        return AppState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Get cart item count
    getItemCount: () => {
        return AppState.cart.reduce((count, item) => count + item.quantity, 0);
    },

    // Save cart to localStorage
    saveCart: () => {
        localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(AppState.cart));
    },

    // Update cart UI
    updateCartUI: () => {
        const cartCount = document.getElementById('cart-count');
        const cartBody = document.getElementById('cart-body');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) {
            const count = CartManager.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
        
        if (cartBody) {
            CartManager.renderCartItems();
        }
        
        if (cartTotal) {
            cartTotal.textContent = Utils.formatPrice(CartManager.getTotal());
        }
    },

    // Render cart items
    renderCartItems: () => {
        const cartBody = document.getElementById('cart-body');
        if (!cartBody) return;

        if (AppState.cart.length === 0) {
            cartBody.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <p>السلة فارغة</p>
                    <p>أضف بعض المنتجات اللذيذة!</p>
                </div>
            `;
            return;
        }

        cartBody.innerHTML = AppState.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${Utils.formatPrice(item.price)}</div>
                </div>
                <div class="item-controls">
                    <button class="quantity-btn" onclick="CartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="CartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-btn" onclick="CartManager.removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    // Generate WhatsApp order message
    generateWhatsAppMessage: () => {
        if (AppState.cart.length === 0) {
            Utils.showNotification('السلة فارغة! أضف منتجات أولاً', 'error');
            return;
        }

        let message = '🛒 *طلب جديد من موقع مخبزة علاّف*\n\n';
        message += '📋 *تفاصيل الطلب:*\n';
        
        AppState.cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   الكمية: ${item.quantity}\n`;
            message += `   السعر: ${Utils.formatPrice(item.price * item.quantity)}\n\n`;
        });
        
        message += `💰 *المجموع الإجمالي: ${Utils.formatPrice(CartManager.getTotal())}*\n\n`;
        message += '📞 يرجى التواصل معي لتأكيد الطلب وتحديد موعد الاستلام.\n\n';
        message += '🙏 شكراً لكم!';

        const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Close cart modal after sending
        ModalManager.closeCart();
    }
};

// ===== MODAL MANAGEMENT =====
const ModalManager = {
    // Open cart modal
    openCart: () => {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            AppState.isCartOpen = true;
            cartModal.classList.add('active');
            CartManager.updateCartUI();
            document.body.style.overflow = 'hidden';
        }
    },

    // Close cart modal
    closeCart: () => {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            AppState.isCartOpen = false;
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    // Open quick view modal
    openQuickView: (productId) => {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) return;

        const quickViewModal = document.getElementById('quick-view-modal');
        const quickViewBody = document.getElementById('quick-view-body');
        
        if (quickViewModal && quickViewBody) {
            AppState.isQuickViewOpen = true;
            
            quickViewBody.innerHTML = `
                <div class="quick-view-product">
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="product-details">
                        <h2 class="product-title">${product.name}</h2>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">${Utils.formatPrice(product.price)}</div>
                        
                        <div class="product-ingredients">
                            <h4>المكونات:</h4>
                            <ul>
                                ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="nutrition-facts">
                            <h4>القيم الغذائية (لكل 100 جرام):</h4>
                            <div class="nutrition-grid">
                                <div class="nutrition-item">
                                    <span>السعرات الحرارية</span>
                                    <span>${product.nutritionFacts.calories}</span>
                                </div>
                                <div class="nutrition-item">
                                    <span>البروتين</span>
                                    <span>${product.nutritionFacts.protein}g</span>
                                </div>
                                <div class="nutrition-item">
                                    <span>الكربوهيدرات</span>
                                    <span>${product.nutritionFacts.carbs}g</span>
                                </div>
                                <div class="nutrition-item">
                                    <span>الدهون</span>
                                    <span>${product.nutritionFacts.fat}g</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="quantity-selector">
                            <label for="quantity">الكمية:</label>
                            <div class="quantity-controls">
                                <button type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                                <input type="number" id="quantity" min="1" value="1">
                                <button type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                            </div>
                        </div>
                        
                        <button class="add-to-cart-btn" onclick="ModalManager.addToCartFromQuickView(${product.id})">
                            <i class="fas fa-shopping-basket"></i>
                            إضافة إلى السلة
                        </button>
                    </div>
                </div>
            `;
            
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    // Close quick view modal
    closeQuickView: () => {
        const quickViewModal = document.getElementById('quick-view-modal');
        if (quickViewModal) {
            AppState.isQuickViewOpen = false;
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    // Add to cart from quick view
    addToCartFromQuickView: (productId) => {
        const quantityInput = document.getElementById('quantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        if (CartManager.addItem(productId, quantity)) {
            ModalManager.closeQuickView();
        }
    }
};

// ===== SEARCH FUNCTIONALITY =====
const SearchManager = {
    // Initialize search
    init: () => {
        const searchBtn = document.getElementById('search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        const searchClose = document.getElementById('search-close');
        const searchResults = document.getElementById('search-results');

        if (searchBtn) {
            searchBtn.addEventListener('click', SearchManager.openSearch);
        }

        if (searchClose) {
            searchClose.addEventListener('click', SearchManager.closeSearch);
        }

        if (searchOverlay) {
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    SearchManager.closeSearch();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', 