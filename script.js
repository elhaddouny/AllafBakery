// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    WHATSAPP_NUMBER: '212681848262',
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    SEARCH_DEBOUNCE_DELAY: 300,
    CART_STORAGE_KEY: 'allaf_cart_v3',
    VISITOR_STORAGE_KEY: 'allaf_visitor_count_v3',
    LOADING_DURATION: 2000
};

// ===== GLOBAL STATE =====
let appState = {
    cart: [],
    isCartOpen: false,
    isSearchOpen: false,
    isQuickViewOpen: false,
    currentCategory: 'all',
    searchResults: [],
    filteredProducts: [],
    isLoading: true,
    currentTestimonial: 0,
    isMenuOpen: false
};

// ===== SAMPLE DATA =====
const PRODUCTS_DATA = [
    {
        id: 1,
        name: 'خبز طازج',
        description: 'خبز يومي طازج مخبوز بأجود المكونات الطبيعية، يتميز بقشرة ذهبية ونكهة لا تُقاوم',
        price: 2.50,
        category: 'bread',
        emoji: '🥖',
        featured: true,
        ingredients: ['دقيق قمح عالي الجودة', 'خميرة طبيعية', 'ملح البحر', 'زيت زيتون بكر']
    },
    {
        id: 2,
        name: 'كرواسون بالزبدة',
        description: 'كرواسون فرنسي أصيل بالزبدة الطبيعية، مقرمش من الخارج وطري من الداخل',
        price: 4.00,
        category: 'bread',
        emoji: '🥐',
        featured: false,
        ingredients: ['دقيق فرنسي', 'زبدة فرنسية أصلية', 'خميرة طازجة', 'حليب طبيعي']
    },
    {
        id: 3,
        name: 'بقلاوة بالفستق',
        description: 'حلوى شرقية تقليدية محشوة بالفستق الحلبي الفاخر ومغطاة بالعسل الطبيعي',
        price: 8.00,
        category: 'sweets',
        emoji: '🥮',
        featured: true,
        ingredients: ['عجينة الفيلو', 'فستق حلبي', 'عسل طبيعي', 'سمن بلدي']
    },
    {
        id: 4,
        name: 'كيكة الشوكولاتة',
        description: 'كيكة شوكولاتة غنية ورطبة مع طبقات من كريمة الشوكولاتة الفاخرة',
        price: 45.00,
        category: 'cakes',
        emoji: '🍰',
        featured: true,
        ingredients: ['شوكولاتة بلجيكية', 'دقيق فاخر', 'بيض طازج', 'كريمة طبيعية']
    },
    {
        id: 5,
        name: 'مسمن معسل',
        description: 'مسمن مغربي تقليدي محضر بالطريقة الأصيلة ومقدم مع العسل الطبيعي',
        price: 3.50,
        category: 'bread',
        emoji: '🫓',
        featured: false,
        ingredients: ['دقيق محلي', 'سمن بلدي', 'عسل جبلي', 'ملح']
    },
    {
        id: 6,
        name: 'قهوة عربية',
        description: 'قهوة عربية أصيلة محمصة بعناية وتقدم مع التمر والحلويات الشرقية',
        price: 6.00,
        category: 'drinks',
        emoji: '☕',
        featured: false,
        ingredients: ['حبوب قهوة عربية', 'هيل', 'زعفران', 'ماء نقي']
    },
    {
        id: 7,
        name: 'كيكة الفراولة',
        description: 'كيكة إسفنجية طرية مزينة بالفراولة الطازجة وكريمة الفانيليا',
        price: 40.00,
        category: 'cakes',
        emoji: '🍓',
        featured: false,
        ingredients: ['فراولة طازجة', 'كريمة فانيليا', 'بسكويت', 'جيلاتين']
    },
    {
        id: 8,
        name: 'معمول بالتمر',
        description: 'معمول شامي أصيل محشو بالتمر الطبيعي ومرشوش بالسكر البودرة',
        price: 5.50,
        category: 'sweets',
        emoji: '🧁',
        featured: false,
        ingredients: ['دقيق سميد', 'تمر مجهول', 'سمن بلدي', 'ماء الورد']
    }
];

const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: 'أحمد المرابط',
        role: 'عميل دائم',
        text: 'مخبزة علاّف هي المكان الوحيد الذي أثق به لشراء الخبز والحلويات. جودة عالية وطعم لا يُنسى!',
        avatar: '👨'
    },
    {
        id: 2,
        name: 'فاطمة الزهراء',
        role: 'ربة منزل',
        text: 'أطلب من مخبزة علاّف دائماً لجميع المناسبات. الكيك والحلويات دائماً طازجة ولذيذة.',
        avatar: '👩'
    },
    {
        id: 3,
        name: 'محمد الإدريسي',
        role: 'صاحب مطعم',
        text: 'نتعامل مع مخبزة علاّف منذ سنوات. الخدمة ممتازة والجودة لا تتغير أبداً.',
        avatar: '👨‍🍳'
    }
];

const GALLERY_DATA = [
    { id: 1, emoji: '🥖', title: 'خبز طازج' },
    { id: 2, emoji: '🥐', title: 'كرواسون' },
    { id: 3, emoji: '🍰', title: 'كيك شوكولاتة' },
    { id: 4, emoji: '🥮', title: 'بقلاوة' },
    { id: 5, emoji: '🫓', title: 'مسمن' },
    { id: 6, emoji: '☕', title: 'قهوة عربية' },
    { id: 7, emoji: '🍓', title: 'كيكة فراولة' },
    { id: 8, emoji: '🧁', title: 'معمول' },
    { id: 9, emoji: '🍯', title: 'عسل طبيعي' }
];

// ===== DOM ELEMENTS =====
let elements = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍞 مرحباً بكم في مخبزة علاّف! جاري تحضير الموقع...');
    
    try {
        initializeElements();
        initializeApp();
        setupEventListeners();
        loadInitialData();
        
        // Hide loading screen after delay
        setTimeout(hideLoadingScreen, CONFIG.LOADING_DURATION);
        
        console.log('✅ تم تحميل الموقع بنجاح!');
    } catch (error) {
        console.error('❌ خطأ في تحميل الموقع:', error);
        hideLoadingScreen();
    }
});

// ===== ELEMENT INITIALIZATION =====
function initializeElements() {
    elements = {
        // Loading
        loadingScreen: document.getElementById('loadingScreen'),
        
        // Header
        mainHeader: document.getElementById('mainHeader'),
        searchBtn: document.getElementById('searchBtn'),
        cartBtn: document.getElementById('cartBtn'),
        cartCounter: document.getElementById('cartCounter'),
        menuToggle: document.getElementById('menuToggle'),
        
        // Search
        searchOverlay: document.getElementById('searchOverlay'),
        searchInput: document.getElementById('searchInput'),
        searchClose: document.getElementById('searchClose'),
        searchResults: document.getElementById('searchResults'),
        
        // Products
        featuredGrid: document.getElementById('featuredGrid'),
        productsGrid: document.getElementById('productsGrid'),
        loadMoreBtn: document.getElementById('loadMoreBtn'),
        
        // Gallery
        galleryGrid: document.getElementById('galleryGrid'),
        
        // Testimonials
        testimonialsSlider: document.getElementById('testimonialsSlider'),
        
        // Cart
        cartModal: document.getElementById('cartModal'),
        cartClose: document.getElementById('cartClose'),
        cartItems: document.getElementById('cartItems'),
        emptyCart: document.getElementById('emptyCart'),
        cartTotal: document.getElementById('cartTotal'),
        clearCart: document.getElementById('clearCart'),
        cartCheckout: document.getElementById('cartCheckout'),
        
        // Quick View
        quickViewModal: document.getElementById('quickViewModal'),
        quickViewClose: document.getElementById('quickViewClose'),
        quickViewBody: document.getElementById('quickViewBody'),
        
        // Other
        backToTop: document.getElementById('backToTop'),
        visitorCount: document.getElementById('visitorCount'),
        contactForm: document.getElementById('contactForm')
    };
}

// ===== APP INITIALIZATION =====
function initializeApp() {
    loadCart();
    updateCartDisplay();
    updateCartCounter();
    updateVisitorCount();
    initializeAOS();
    setupScrollEffects();
    setupNavigation();
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Search
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', toggleSearch);
    }
    if (elements.searchClose) {
        elements.searchClose.addEventListener('click', toggleSearch);
    }
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', debounce(handleSearch, CONFIG.SEARCH_DEBOUNCE_DELAY));
    }
    
    // Cart
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', toggleCart);
    }
    if (elements.cartClose) {
        elements.cartClose.addEventListener('click', toggleCart);
    }
    if (elements.clearCart) {
        elements.clearCart.addEventListener('click', clearCart);
    }
    if (elements.cartCheckout) {
        elements.cartCheckout.addEventListener('click', sendWhatsAppOrder);
    }
    
    // Quick View
    if (elements.quickViewClose) {
        elements.quickViewClose.addEventListener('click', closeQuickView);
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterProducts(category);
        });
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target.startsWith('#')) {
                scrollToSection(target);
                updateActiveNavLink(link);
            }
        });
    });
    
    // Back to top
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', scrollToTop);
    }
    
    // Contact form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Load more button
    if (elements.loadMoreBtn) {
        elements.loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
    
    // Menu toggle
    if (elements.menuToggle) {
        elements.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Modal close on backdrop click
    if (elements.cartModal) {
        elements.cartModal.addEventListener('click', (e) => {
            if (e.target === elements.cartModal) {
                toggleCart();
            }
        });
    }
    
    if (elements.quickViewModal) {
        elements.quickViewModal.addEventListener('click', (e) => {
            if (e.target === elements.quickViewModal) {
                closeQuickView();
            }
        });
    }
    
    if (elements.searchOverlay) {
        elements.searchOverlay.addEventListener('click', (e) => {
            if (e.target === elements.searchOverlay) {
                toggleSearch();
            }
        });
    }
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboardEvents);
    
    // Window events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add('hidden');
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
            appState.isLoading = false;
        }, 500);
    }
}

// ===== DATA LOADING =====
function loadInitialData() {
    loadFeaturedProducts();
    loadAllProducts();
    loadGallery();
    loadTestimonials();
}

function loadFeaturedProducts() {
    if (!elements.featuredGrid) return;
    
    const featuredProducts = PRODUCTS_DATA.filter(product => product.featured);
    elements.featuredGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function loadAllProducts() {
    if (!elements.productsGrid) return;
    
    elements.productsGrid.innerHTML = PRODUCTS_DATA.map(product => createProductCard(product)).join('');
    appState.filteredProducts = [...PRODUCTS_DATA];
}

function loadGallery() {
    if (!elements.galleryGrid) return;
    
    elements.galleryGrid.innerHTML = GALLERY_DATA.map(item => `
        <div class="gallery-item" onclick="openLightbox('${item.emoji}', '${item.title}')" data-aos="fade-up">
            ${item.emoji}
        </div>
    `).join('');
}

function loadTestimonials() {
    if (!elements.testimonialsSlider) return;
    
    elements.testimonialsSlider.innerHTML = TESTIMONIALS_DATA.map(testimonial => `
        <div class="testimonial-item" data-aos="fade-up">
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.avatar}</div>
                <div class="author-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Auto-rotate testimonials
    setInterval(rotateTestimonials, 5000);
}

// ===== PRODUCT MANAGEMENT =====
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}" data-aos="fade-up">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} درهم</div>
            </div>
            <div class="product-actions">
                <button class="btn btn-secondary" onclick="openQuickView(${product.id})">
                    <i class="fas fa-eye"></i>
                    عرض سريع
                </button>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                    إضافة
                </button>
            </div>
        </div>
    `;
}

function filterProducts(category) {
    appState.currentCategory = category;
    
    let productsToShow = category === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === category);
    appState.filteredProducts = productsToShow;
    
    if (elements.productsGrid) {
        elements.productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');
    }
    
    updateFilterButtons();
    
    // Reinitialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function updateFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === appState.currentCategory) {
            btn.classList.add('active');
        }
    });
}

function loadMoreProducts() {
    // This would typically load more products from an API
    showNotification('تم عرض جميع المنتجات المتاحة', 'info');
}

// ===== CART MANAGEMENT =====
function addToCart(productId, quantity = 1) {
    try {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) {
            showNotification('المنتج غير موجود', 'error');
            return;
        }

        const existingItem = appState.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            appState.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                emoji: product.emoji,
                quantity: quantity
            });
        }

        saveCart();
        updateCartDisplay();
        updateCartCounter();
        showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
        
        // Add animation effect
        animateCartButton();
    } catch (error) {
        console.error('خطأ في إضافة المنتج:', error);
        showNotification('حدث خطأ في إضافة المنتج', 'error');
    }
}

function removeFromCart(productId) {
    try {
        const itemIndex = appState.cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const itemName = appState.cart[itemIndex].name;
            appState.cart.splice(itemIndex, 1);
            saveCart();
            updateCartDisplay();
            updateCartCounter();
            showNotification(`تم حذف ${itemName} من السلة`, 'success');
        }
    } catch (error) {
        console.error('خطأ في حذف المنتج:', error);
    }
}

function updateCartQuantity(productId, newQuantity) {
    try {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const item = appState.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
            updateCartDisplay();
            updateCartCounter();
        }
    } catch (error) {
        console.error('خطأ في تحديث الكمية:', error);
    }
}

function clearCart() {
    try {
        if (appState.cart.length === 0) {
            showNotification('السلة فارغة بالفعل', 'info');
            return;
        }
        
        appState.cart = [];
        saveCart();
        updateCartDisplay();
        updateCartCounter();
        showNotification('تم إفراغ السلة', 'success');
    } catch (error) {
        console.error('خطأ في إفراغ السلة:', error);
    }
}

function saveCart() {
    try {
        localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(appState.cart));
    } catch (error) {
        console.error('خطأ في حفظ السلة:', error);
    }
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem(CONFIG.CART_STORAGE_KEY);
        if (savedCart) {
            appState.cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('خطأ في تحميل السلة:', error);
        appState.cart = [];
    }
}

// ===== UI UPDATES =====
function updateCartDisplay() {
    if (!elements.cartItems || !elements.cartTotal || !elements.emptyCart) return;

    if (appState.cart.length === 0) {
        elements.cartItems.style.display = 'none';
        elements.emptyCart.style.display = 'block';
        elements.cartTotal.textContent = '0.00';
        return;
    }

    elements.cartItems.style.display = 'block';
    elements.emptyCart.style.display = 'none';

    elements.cartItems.innerHTML = appState.cart.map(item => `
        <div class="cart-item">
            <div class="item-image">${item.emoji}</div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} درهم</p>
            </div>
            <div class="item-controls">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" title="تقليل الكمية">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" title="زيادة الكمية">+</button>
                <button onclick="removeFromCart(${item.id})" class="remove-btn" title="حذف المنتج">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = total.toFixed(2);
}

function updateCartCounter() {
    if (!elements.cartCounter) return;
    
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCounter.textContent = totalItems;
    elements.cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
}

function animateCartButton() {
    if (elements.cartBtn) {
        elements.cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            elements.cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== MODAL MANAGEMENT =====
function toggleCart() {
    if (!elements.cartModal) return;
    
    appState.isCartOpen = !appState.isCartOpen;
    
    if (appState.isCartOpen) {
        elements.cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    } else {
        elements.cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === product