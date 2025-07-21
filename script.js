// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    WHATSAPP_NUMBER: '212681848262',
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    SEARCH_DEBOUNCE_DELAY: 300,
    CART_STORAGE_KEY: 'allaf_cart_v2',
    VISITOR_STORAGE_KEY: 'allaf_visitor_count_v2'
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
    isLoading: true
};

// ===== SAMPLE DATA =====
const PRODUCTS_DATA = [
    {
        id: 1,
        name: 'خبز طازج',
        description: 'خبز يومي طازج مخبوز بأجود المكونات الطبيعية',
        price: 2.50,
        category: 'bread',
        emoji: '🥖',
        featured: true,
        ingredients: ['دقيق قمح', 'خميرة طبيعية', 'ملح البحر', 'زيت زيتون']
    },
    {
        id: 2,
        name: 'كرواسون بالزبدة',
        description: 'كرواسون فرنسي أصيل بالزبدة الطبيعية',
        price: 4.00,
        category: 'bread',
        emoji: '🥐',
        featured: false,
        ingredients: ['دقيق', 'زبدة فرنسية', 'خميرة', 'حليب']
    },
    {
        id: 3,
        name: 'بقلاوة بالفستق',
        description: 'حلوى شرقية تقليدية بالفستق الحلبي',
        price: 15.00,
        category: 'sweets',
        emoji: '🧁',
        featured: true,
        ingredients: ['عجينة فيلو', 'فستق حلبي', 'عسل طبيعي', 'سمن بلدي']
    },
    {
        id: 4,
        name: 'كيكة الشوكولاتة',
        description: 'كيكة شوكولاتة غنية ولذيذة',
        price: 45.00,
        category: 'cakes',
        emoji: '🎂',
        featured: true,
        ingredients: ['شوكولاتة بلجيكية', 'دقيق', 'بيض طازج', 'زبدة']
    },
    {
        id: 5,
        name: 'مسمن بالعسل',
        description: 'مسمن مغربي تقليدي بالعسل الطبيعي',
        price: 3.50,
        category: 'bread',
        emoji: '🥞',
        featured: false,
        ingredients: ['دقيق', 'سميد', 'عسل طبيعي', 'زبدة']
    },
    {
        id: 6,
        name: 'قهوة عربية',
        description: 'قهوة عربية أصيلة بالهيل',
        price: 8.00,
        category: 'drinks',
        emoji: '☕',
        featured: false,
        ingredients: ['قهوة عربية', 'هيل', 'سكر', 'ماء']
    },
    {
        id: 7,
        name: 'كيكة الفراولة',
        description: 'كيكة طازجة بالفراولة الطبيعية',
        price: 50.00,
        category: 'cakes',
        emoji: '🍰',
        featured: false,
        ingredients: ['فراولة طازجة', 'كريمة', 'دقيق', 'سكر']
    },
    {
        id: 8,
        name: 'معمول بالتمر',
        description: 'معمول تقليدي محشو بالتمر الفاخر',
        price: 12.00,
        category: 'sweets',
        emoji: '🥮',
        featured: false,
        ingredients: ['دقيق', 'تمر مجهول', 'سمن', 'ماء الورد']
    }
];

const GALLERY_DATA = [
    { id: 1, emoji: '🍞', title: 'خبز طازج' },
    { id: 2, emoji: '🥐', title: 'كرواسون' },
    { id: 3, emoji: '🧁', title: 'حلويات' },
    { id: 4, emoji: '🎂', title: 'كيك' },
    { id: 5, emoji: '🥞', title: 'مسمن' },
    { id: 6, emoji: '☕', title: 'مشروبات' },
    { id: 7, emoji: '🍰', title: 'تورتات' },
    { id: 8, emoji: '🥮', title: 'معمول' },
    { id: 9, emoji: '🍪', title: 'بسكويت' }
];

// ===== DOM ELEMENTS =====
let elements = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍞 مرحباً بك في مخبزة علاّف! نتمنى لك تجربة ممتعة');
    
    // Initialize elements
    initializeElements();
    
    // Load cart from storage
    loadCartFromStorage();
    
    // Initialize all components
    initializeApp();
    
    // Hide loading screen
    setTimeout(hideLoadingScreen, 1500);
});

function initializeElements() {
    elements = {
        // Loading
        loadingScreen: document.getElementById('loadingScreen'),
        
        // Header
        mainHeader: document.getElementById('mainHeader'),
        navMenu: document.getElementById('navMenu'),
        mobileToggle: document.getElementById('mobileToggle'),
        
        // Search
        searchBtn: document.getElementById('searchBtn'),
        searchOverlay: document.getElementById('searchOverlay'),
        searchInput: document.getElementById('searchInput'),
        searchClose: document.getElementById('searchClose'),
        searchResults: document.getElementById('searchResults'),
        
        // Cart
        cartBtn: document.getElementById('cartBtn'),
        cartCount: document.getElementById('cartCount'),
        cartModal: document.getElementById('cartModal'),
        cartClose: document.getElementById('cartClose'),
        cartBody: document.getElementById('cartBody'),
        cartTotal: document.getElementById('cartTotal'),
        cartClear: document.getElementById('cartClear'),
        cartCheckout: document.getElementById('cartCheckout'),
        
        // Products
        productsGrid: document.getElementById('productsGrid'),
        
        // Gallery
        galleryGrid: document.getElementById('galleryGrid'),
        
        // Quick View
        quickViewModal: document.getElementById('quickViewModal'),
        quickViewClose: document.getElementById('quickViewClose'),
        quickViewBody: document.getElementById('quickViewBody'),
        
        // Contact Form
        contactForm: document.getElementById('contactForm'),
        
        // Footer
        visitorCount: document.getElementById('visitorCount'),
        
        // Floating buttons
        backToTop: document.getElementById('backToTop')
    };
}

function initializeApp() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Load products
    loadProducts();
    
    // Load gallery
    loadGallery();
    
    // Update visitor count
    updateVisitorCount();
    
    // Setup scroll effects
    setupScrollEffects();
    
    // Setup counter animations
    setupCounterAnimations();
    
    // Update cart display
    updateCartDisplay();
}

function setupEventListeners() {
    // Mobile menu toggle
    if (elements.mobileToggle) {
        elements.mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Search functionality
    if (elements.searchBtn) {
        elements.searchBtn.addEventListener('click', openSearch);
    }
    if (elements.searchClose) {
        elements.searchClose.addEventListener('click', closeSearch);
    }
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', debounce(handleSearch, CONFIG.SEARCH_DEBOUNCE_DELAY));
    }
    if (elements.searchOverlay) {
        elements.searchOverlay.addEventListener('click', function(e) {
            if (e.target === elements.searchOverlay) closeSearch();
        });
    }
    
    // Cart functionality
    if (elements.cartBtn) {
        elements.cartBtn.addEventListener('click', toggleCart);
    }
    if (elements.cartClose) {
        elements.cartClose.addEventListener('click', closeCart);
    }
    if (elements.cartModal) {
        elements.cartModal.addEventListener('click', function(e) {
            if (e.target === elements.cartModal) closeCart();
        });
    }
    if (elements.cartClear) {
        elements.cartClear.addEventListener('click', clearCart);
    }
    if (elements.cartCheckout) {
        elements.cartCheckout.addEventListener('click', checkoutCart);
    }
    
    // Quick view modal
    if (elements.quickViewClose) {
        elements.quickViewClose.addEventListener('click', closeQuickView);
    }
    if (elements.quickViewModal) {
        elements.quickViewModal.addEventListener('click', function(e) {
            if (e.target === elements.quickViewModal) closeQuickView();
        });
    }
    
    // Contact form
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Back to top button
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', scrollToTop);
    }
    
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target.startsWith('#')) {
                scrollToSection(target);
                
                // Update active state
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.classList.add('hidden');
        appState.isLoading = false;
        
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    elements.navMenu.classList.toggle('active');
    elements.mobileToggle.classList.toggle('active');
}

function closeMobileMenu() {
    elements.navMenu.classList.remove('active');
    elements.mobileToggle.classList.remove('active');
}

// ===== SEARCH FUNCTIONALITY =====
function openSearch() {
    appState.isSearchOpen = true;
    elements.searchOverlay.classList.add('active');
    setTimeout(() => elements.searchInput.focus(), 100);
}

function closeSearch() {
    appState.isSearchOpen = false;
    elements.searchOverlay.classList.remove('active');
    elements.searchInput.value = '';
    elements.searchResults.innerHTML = '';
}

function handleSearch() {
    const query = elements.searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
        elements.searchResults.innerHTML = '';
        return;
    }
    
    const results = PRODUCTS_DATA.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (results.length === 0) {
        elements.searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>لم يتم العثور على نتائج</p>
            </div>
        `;
        return;
    }
    
    elements.searchResults.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="openQuickView(${product.id})">
            <div class="result-image">
                <div class="product-emoji">${product.emoji}</div>
            </div>
            <div class="result-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="result-price">${product.price.toFixed(2)} درهم</div>
            </div>
        </div>
    `).join('');
}

// ===== PRODUCTS FUNCTIONALITY =====
function loadProducts() {
    if (!elements.productsGrid) return;
    
    elements.productsGrid.innerHTML = PRODUCTS_DATA.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <div class="product-emoji">${product.emoji}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} درهم</div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-basket"></i>
                        أضف للسلة
                    </button>
                    <button class="quick-view" onclick="openQuickView(${product.id})">
                        <i class="fas fa-eye"></i>
                        عرض سريع
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    appState.currentCategory = category;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productCategory = card.dataset.category;
        
        if (category === 'all' || productCategory === category) {
            card.classList.remove('hidden');
            card.style.display = 'block';
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                if (card.classList.contains('hidden')) {
                    card.style.display = 'none';
                }
            }, CONFIG.ANIMATION_DURATION);
        }
    });
}

// ===== GALLERY FUNCTIONALITY =====
function loadGallery() {
    if (!elements.galleryGrid) return;
    
    elements.galleryGrid.innerHTML = GALLERY_DATA.map(item => `
        <div class="gallery-item" onclick="openLightbox('${item.emoji}', '${item.title}')">
            <div class="gallery-emoji">${item.emoji}</div>
        </div>
    `).join('');
}

function openLightbox(emoji, title) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox(this)">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-image">
                <div style="font-size: 8rem; text-align: center;">${emoji}</div>
            </div>
            <div class="lightbox-title">${title}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    setTimeout(() => lightbox.classList.add('active'), 10);
}

function closeLightbox(button) {
    const lightbox = button.closest('.lightbox');
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.remove(), CONFIG.ANIMATION_DURATION);
}

// ===== CART FUNCTIONALITY =====
function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CONFIG.CART_STORAGE_KEY);
    if (savedCart) {
        try {
            appState.cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('خطأ في تحميل السلة:', e);
            appState.cart = [];
        }
    }
}

function saveCartToStorage() {
    localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(appState.cart));
}

function addToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = appState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartDisplay();
    showNotification('تم إضافة المنتج إلى السلة', 'success');
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
    updateCartModal();
    showNotification('تم حذف المنتج من السلة', 'success');
}

function updateCartQuantity(productId, newQuantity) {
    const item = appState.cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartDisplay();
            updateCartModal();
        }
    }
}

function updateCartDisplay() {
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (elements.cartCount) {
        elements.cartCount.textContent = totalItems;
        elements.cartCount.classList.toggle('show', totalItems > 0);
    }
}

function toggleCart() {
    if (appState.isCartOpen) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    appState.isCartOpen = true;
    elements.cartModal.classList.add('active');
    updateCartModal();
}

function closeCart() {
    appState.isCartOpen = false;
    elements.cartModal.classList.remove('active');
}

function updateCartModal() {
    if (appState.cart.length === 0) {
        elements.cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
                <p>السلة فارغة</p>
                <p style="font-size: 0.9rem; opacity: 0.7;">أضف بعض المنتجات لتبدأ التسوق</p>
            </div>
        `;
        elements.cartTotal.textContent = '0.00 درهم';
        return;
    }
    
    elements.cartBody.innerHTML = appState.cart.map(item => `
        <div class="cart-item">
            <div class="item-image">
                <div class="product-emoji">${item.emoji}</div>
            </div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} درهم</p>
            </div>
            <div class="item-controls">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    elements.cartTotal.textContent = `${total.toFixed(2)} درهم`;
}

function clearCart() {
    if (appState.cart.length === 0) return;
    
    if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
        appState.cart = [];
        saveCartToStorage();
        updateCartDisplay();
        updateCartModal();
        showNotification('تم إفراغ السلة', 'success');
    }
}

function checkoutCart() {
    if (appState.cart.length === 0) {
        showNotification('السلة فارغة! أضف بعض المنتجات أولاً', 'error');
        return;
    }
    
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = appState.cart.map(item => 
        `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} درهم`
    ).join('\n');
    
    const message = `مرحباً، أود طلب المنتجات التالية من مخبزة علاّف:\n\n${orderDetails}\n\n*المجموع الإجمالي: ${total.toFixed(2)} درهم*\n\nشكراً لكم`;
    
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== QUICK VIEW FUNCTIONALITY =====
function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;
    
    appState.isQuickViewOpen = true;
    elements.quickViewModal.classList.add('active');
    
    elements.quickViewBody.innerHTML = `
        <div class="quick-view-product">
            <div class="product-image-section">
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
    } catch (error) {
        console.error('خطأ في إضافة المنتج:', error);
        showNotification('حدث خطأ في إضافة المنتج', 'error');
    }
}

function removeFromCart(productId) {
    try {
        appState.cart = appState.cart.filter(item => item.id !== productId);
        saveCart();
        updateCartDisplay();
        updateCartCounter();
        showNotification('تم حذف المنتج من السلة', 'success');
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
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCart = document.getElementById('emptyCart');

    if (!cartItems || !cartTotal || !emptyCart) return;

    if (appState.cart.length === 0) {
        cartItems.style.display = 'none';
        emptyCart.style.display = 'block';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.style.display = 'block';
    emptyCart.style.display = 'none';

    cartItems.innerHTML = appState.cart.map(item => `
        <div class="cart-item">
            <div class="item-image">${item.emoji}</div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} درهم</p>
            </div>
            <div class="item-controls">
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// ===== MODAL MANAGEMENT =====
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (!cartModal) return;

    appState.isCartOpen = !appState.isCartOpen;
    
    if (appState.isCartOpen) {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartDisplay();
    } else {
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewBody = document.getElementById('quickViewBody');
    
    if (!quickViewModal || !quickViewBody) return;

    quickViewBody.innerHTML = `
        <div class="quick-view-product">
            <div class="product-image-large">${product.emoji}</div>
            <div class="product-details">
                <h2>${product.name}</h2>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} درهم</div>
                ${product.ingredients ? `
                    <div class="product-ingredients">
                        <h4>المكونات:</h4>
                        <ul>
                            ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="quick-view-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id}); closeQuickView();">
                        <i class="fas fa-cart-plus"></i>
                        إضافة إلى السلة
                    </button>
                </div>
            </div>
        </div>
    `;

    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    appState.isQuickViewOpen = true;
}

function closeQuickView() {
    const quickViewModal = document.getElementById('quickViewModal');
    if (quickViewModal) {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
        appState.isQuickViewOpen = false;
    }
}

// ===== SEARCH FUNCTIONALITY =====
function performSearch(query) {
    if (!query.trim()) {
        appState.searchResults = [];
        return;
    }

    const searchTerm = query.toLowerCase().trim();
    appState.searchResults = PRODUCTS_DATA.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        (product.ingredients && product.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(searchTerm)
        ))
    );

    displaySearchResults();
}

function displaySearchResults() {
    // This would update the products display with search results
    // For now, we'll just filter the products
    filterProducts('all', appState.searchResults);
}

// ===== PRODUCT FILTERING =====
function filterProducts(category, customProducts = null) {
    appState.currentCategory = category;
    
    let productsToShow = customProducts || PRODUCTS_DATA;
    
    if (category !== 'all') {
        productsToShow = productsToShow.filter(product => product.category === category);
    }

    appState.filteredProducts = productsToShow;
    displayProducts(productsToShow);
    updateFilterButtons();
}

function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">لا توجد منتجات متاحة</div>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} درهم</div>
            </div>
            <div class="product-actions">
                <button class="btn-secondary" onclick="openQuickView(${product.id})">
                    <i class="fas fa-eye"></i>
                    عرض سريع
                </button>
                <button class="btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i>
                    إضافة
                </button>
            </div>
        </div>
    `).join('');
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

// ===== WHATSAPP INTEGRATION =====
function sendWhatsAppOrder() {
    if (appState.cart.length === 0) {
        showNotification('السلة فارغة! يرجى إضافة منتجات أولاً', 'error');
        return;
    }

    const orderDetails = appState.cart.map(item => 
        `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} درهم`
    ).join('\n');

    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `مرحباً مخبزة علاّف 🍞
    
أود طلب المنتجات التالية:

${orderDetails}

💰 المجموع الإجمالي: ${total.toFixed(2)} درهم

شكراً لكم 🙏`;

    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    showNotification('تم فتح واتساب لإرسال الطلب', 'success');
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateVisitorCount() {
    try {
        const visitorCountElement = document.getElementById('visitorCount');
        if (!visitorCountElement) return;

        let count = parseInt(localStorage.getItem(CONFIG.VISITOR_STORAGE_KEY) || '0');
        count++;
        localStorage.setItem(CONFIG.VISITOR_STORAGE_KEY, count.toString());
        visitorCountElement.textContent = count;
    } catch (error) {
        console.error('خطأ في تحديث عداد الزوار:', error);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== GLOBAL FUNCTIONS (for onclick handlers) =====
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
window.toggleCart = toggleCart;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.filterProducts = filterProducts;
window.sendWhatsAppOrder = sendWhatsAppOrder;

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('خطأ في التطبيق:', e.error);
    showNotification('حدث خطأ غير متوقع', 'error');
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ تم تحميل الموقع في ${Math.round(loadTime)}ms`);
});
           