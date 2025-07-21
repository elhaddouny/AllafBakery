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
    // ... المنتجات كما في الكود السابق ...
    // يمكنك وضع بيانات المنتجات هنا نفسها التي أرسلتها سابقاً
];

const TESTIMONIALS_DATA = [
    // ... آراء العملاء كما في الكود السابق ...
];

const GALLERY_DATA = [
    // ... بيانات المعرض كما في الكود السابق ...
];

// ===== DOM ELEMENTS =====
let elements = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeApp();
    setupEventListeners();
    loadInitialData();
    setTimeout(hideLoadingScreen, CONFIG.LOADING_DURATION);
});

// ===== ELEMENT INITIALIZATION =====
function initializeElements() {
    elements = {
        loadingScreen: document.getElementById('loadingScreen'),
        mainHeader: document.getElementById('mainHeader'),
        searchBtn: document.getElementById('searchBtn'),
        cartBtn: document.getElementById('cartBtn'),
        cartCounter: document.getElementById('cartCounter'),
        menuToggle: document.getElementById('menuToggle'),
        searchOverlay: document.getElementById('searchOverlay'),
        searchInput: document.getElementById('searchInput'),
        searchClose: document.getElementById('searchClose'),
        searchResults: document.getElementById('searchResults'),
        featuredGrid: document.getElementById('featuredGrid'),
        productsGrid: document.getElementById('productsGrid'),
        loadMoreBtn: document.getElementById('loadMoreBtn'),
        galleryGrid: document.getElementById('galleryGrid'),
        testimonialsSlider: document.getElementById('testimonialsSlider'),
        cartModal: document.getElementById('cartModal'),
        cartClose: document.getElementById('cartClose'),
        cartItems: document.getElementById('cartItems'),
        emptyCart: document.getElementById('emptyCart'),
        cartTotal: document.getElementById('cartTotal'),
        clearCart: document.getElementById('clearCart'),
        cartCheckout: document.getElementById('cartCheckout'),
        quickViewModal: document.getElementById('quickViewModal'),
        quickViewClose: document.getElementById('quickViewClose'),
        quickViewBody: document.getElementById('quickViewBody'),
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
    if (elements.searchBtn) elements.searchBtn.addEventListener('click', toggleSearch);
    if (elements.searchClose) elements.searchClose.addEventListener('click', toggleSearch);
    if (elements.searchInput) elements.searchInput.addEventListener('input', debounce(handleSearch, CONFIG.SEARCH_DEBOUNCE_DELAY));
    // Cart
    if (elements.cartBtn) elements.cartBtn.addEventListener('click', toggleCart);
    if (elements.cartClose) elements.cartClose.addEventListener('click', toggleCart);
    if (elements.clearCart) elements.clearCart.addEventListener('click', clearCart);
    if (elements.cartCheckout) elements.cartCheckout.addEventListener('click', sendWhatsAppOrder);
    // Quick View
    if (elements.quickViewClose) elements.quickViewClose.addEventListener('click', closeQuickView);
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterProducts(btn.dataset.category));
    });
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
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
    if (elements.backToTop) elements.backToTop.addEventListener('click', scrollToTop);
    // Contact form
    if (elements.contactForm) elements.contactForm.addEventListener('submit', handleContactForm);
    // Load more button
    if (elements.loadMoreBtn) elements.loadMoreBtn.addEventListener('click', loadMoreProducts);
    // Menu toggle
    if (elements.menuToggle) elements.menuToggle.addEventListener('click', toggleMobileMenu);
    // Modal close on backdrop click
    if (elements.cartModal) {
        elements.cartModal.addEventListener('click', (e) => { if (e.target === elements.cartModal) toggleCart(); });
    }
    if (elements.quickViewModal) {
        elements.quickViewModal.addEventListener('click', (e) => { if (e.target === elements.quickViewModal) closeQuickView(); });
    }
    if (elements.searchOverlay) {
        elements.searchOverlay.addEventListener('click', (e) => { if (e.target === elements.searchOverlay) toggleSearch(); });
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
    elements.featuredGrid.innerHTML = featuredProducts.map(createProductCard).join('');
}

function loadAllProducts() {
    if (!elements.productsGrid) return;
    elements.productsGrid.innerHTML = PRODUCTS_DATA.map(createProductCard).join('');
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
    if (elements.productsGrid) elements.productsGrid.innerHTML = productsToShow.map(createProductCard).join('');
    updateFilterButtons();
    if (typeof AOS !== 'undefined') AOS.refresh();
}

function updateFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === appState.currentCategory) btn.classList.add('active');
    });
}

function loadMoreProducts() {
    showNotification('تم عرض جميع المنتجات المتاحة', 'info');
}

// ===== CART MANAGEMENT =====
function addToCart(productId, quantity = 1) {
    try {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (!product) { showNotification('المنتج غير موجود', 'error'); return; }
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
        updateCartCounter 'error');
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
        const item = appState.cart.find(item => item.id ===';
    appState.isQuickViewOpen = true;
}

function closeQuickView() {
    if (elements.quickViewModal) {
        elements.quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
        appState.isQuickViewOpen = false;
    }
}

// ===== TESTIMONIALS AUTO-ROTATE =====
function rotateTestimonials() {
    if (!elements.testimonialsSlider) return;
    appState.currentTestimonial = (appState.currentTestimonial + 1) % TESTIMONIALS_DATA.length;
    const testimonial = TESTIMONIALS_DATA[appState.currentTestimonial];
    elements.testimonialsSlider.innerHTML = `
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
    `;
}

// ===== SEARCH =====
function toggleSearch() {
    if (!elements.searchOverlay) return;
    appState.isSearchOpen = !appState.isSearchOpen;
    elements.searchOverlay.classList.toggle('active', appState.isSearchOpen);
    document.body.style.overflow = appState.isSearchOpen ? 'hidden' : '';
    if (appState.isSearchOpen && elements.searchInput) elements.searchInput.focus();
}

function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

function handleSearch() {
    const query = elements.searchInput.value.trim().toLowerCase();
    appState.searchResults = PRODUCTS_DATA.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    elements.searchResults.innerHTML = appState.searchResults.length
        ? appState.searchResults.map(createProductCard).join('')
        : '<p style="text-align:center;">لا توجد نتائج مطابقة</p>';
}

// ===== CONTACT FORM VALIDATION =====
function handleContactForm(e) {
    if (!validateForm(e.target)) {
        e.preventDefault();
        showNotification('يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح', 'error');
    }
}

// ===== SCROLL & NAVIGATION =====
function handleScroll() {
    if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
        elements.mainHeader.classList.add('scrolled');
        elements.backToTop.classList.add('show');
    } else {
        elements.mainHeader.classList.remove('scrolled');
        elements.backToTop.classList.remove('show');
    }
}

function scrollToSection(id) {
    const section = document.querySelector(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleResize() {
    // يمكنك إضافة أكواد خاصة بتغيير حجم النافذة هنا إذا لزم الأمر
}

function toggleMobileMenu() {
    appState.isMenuOpen = !appState.isMenuOpen;
    document.querySelector('.main-nav').style.display = appState.isMenuOpen ? 'flex' : '';
}

function setupScrollEffects() {
    // يمكن أن تضيف تأثيرات خاصة عند السحب هنا
}

function setupNavigation() {
    // يمكن أن تضيف أكواد تنقل إضافية إذا لزم الأمر
}

function handleKeyboardEvents(e) {
    if (e.key === 'Escape') {
        if (appState.isCartOpen) toggleCart();
        if (appState.isQuickViewOpen) closeQuickView();
        if (appState.isSearchOpen) toggleSearch();
    }
}

// ===== VISITOR COUNT =====
function updateVisitorCount() {
    let count = parseInt(localStorage.getItem(CONFIG.VISITOR_STORAGE_KEY) || '0', 10);
    count += 1;
    localStorage.setItem(CONFIG.VISITOR_STORAGE_KEY, count);
    if (elements.visitorCount) elements.visitorCount.textContent = count;
}

// ===== WHATSAPP ORDER =====
function sendWhatsAppOrder() {
    if (appState.cart.length === 0) {
        showNotification('سلة التسوق فارغة!', 'error');
        return;
    }
    let orderMsg = 'طلب جديد من موقع علاّف:\n';
    appState.cart.forEach(item => {
        orderMsg += `${item.name} (${item.emoji}) x${item.quantity} - ${item.price * item.quantity} درهم\n`;
    });
    orderMsg += `\nالمجموع: ${elements.cartTotal.textContent} درهم`;
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMsg)}`;
    window.open(url, '_blank');
}

// ===== GALLERY LIGHTBOX (بسيطة) =====
function openLightbox(emoji, title) {
    showNotification(`🖼️ ${title}: ${emoji}`, 'info');
}

// ===== إشعار بسيط =====
function showNotification(message, type = 'info') {
    // يمكنك استبدال alert بتنبيه مخصص لاحقاً
    alert(message);
}

// ===== VALIDATION FUNCTIONS =====
function validateForm(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    fields.forEach(field => {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            if (errorElement) errorElement.textContent = 'هذا الحقل مطلوب';
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            if (errorElement) errorElement.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
            isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            if (errorElement) errorElement.textContent = 'يرجى إدخال رقم هاتف صحيح';
            isValid = false;
        } else {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            if (errorElement) errorElement.textContent = '';
        }
    });
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}