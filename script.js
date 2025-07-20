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