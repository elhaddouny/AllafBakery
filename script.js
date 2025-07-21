// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    WHATSAPP_NUMBER: '212681848262',
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100,
    SEARCH_DEBOUNCE_DELAY: 300,
    CART_STORAGE_KEY: 'allaf_cart',
    VISITOR_STORAGE_KEY: 'allaf_visitor_count'
};

// ===== GLOBAL STATE =====
let appState = {
    cart: JSON.parse(localStorage.getItem(CONFIG.CART_STORAGE_KEY)) || [],
    isCartOpen: false,
    isSearchOpen: false,
    isQuickViewOpen: false,
    currentCategory: 'all',
    searchResults: [],
    filteredProducts: []
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
        description: 'بقلاوة تقليدية محشوة بالفستق الحلبي',
        price: 15.00,
        category: 'sweets',
        emoji: '🍯',
        featured: true,
        ingredients: ['عجينة فيلو', 'فستق حلبي', 'عسل طبيعي', 'سمن بلدي']
    },
    {
        id: 4,
        name: 'كيكة الشوكولاتة',
        description: 'كيكة شوكولاتة غنية ومزينة بكريمة الفانيليا',
        price: 45.00,
        category: 'cakes',
        emoji: '🎂',
        featured: true,
        ingredients: ['شوكولاتة بلجيكية', 'دقيق', 'بيض طازج', 'كريمة فانيليا']
    },
    {
        id: 5,
        name: 'مسمن بالعسل',
        description: 'مسمن مغربي تقليدي محلى بالعسل الطبيعي',
        price: 3.50,
        category: 'bread',
        emoji: '🥞',
        featured: false,
        ingredients: ['دقيق', 'سمن', 'عسل طبيعي', 'ملح']
    },
    {
        id: 6,
        name: 'قهوة عربية',
        description: 'قهوة عربية أصيلة محمصة طازجة',
        price: 8.00,
        category: 'drinks',
        emoji: '☕',
        featured: false,
        ingredients: ['حبوب قهوة عربية', 'هيل', 'زعفران']
    },
    {
        id: 7,
        name: 'تورتة الفراولة',
        description: 'تورتة طازجة بالفراولة والكريمة',
        price: 55.00,
        category: 'cakes',
        emoji: '🍰',
        featured: false,
        ingredients: ['فراولة طازجة', 'كريمة', 'بسكويت', 'جيلاتين']
    },
    {
        id: 8,
        name: 'معمول بالتمر',
        description: 'معمول تقليدي محشو بالتمر الطبيعي',
        price: 12.00,
        category: 'sweets',
        emoji: '🍪',
        featured: false,
        ingredients: ['دقيق', 'تمر مجهول', 'سمن', 'ماء الورد']
    }
];

const GALLERY_DATA = [
    { id: 1, title: 'مخبوزات طازجة', emoji: '🥖' },
    { id: 2, title: 'حلويات شرقية', emoji: '🍯' },
    { id: 3, title: 'كيك الأعراس', emoji: '🎂' },
    { id: 4, title: 'معجنات متنوعة', emoji: '🥐' },
    { id: 5, title: 'تورتات مخصصة', emoji: '🍰' },
    { id: 6, title: 'حلويات العيد', emoji: '🍪' },
    { id: 7, title: 'خبز الصباح', emoji: '🍞' },
    { id: 8, title: 'قهوة وحلويات', emoji: '☕' },
    { id: 9, title: 'مناسبات خاصة', emoji: '🎉' }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍞 مرحباً بك في مخبزة علاّف! نتمنى لك تجربة ممتعة');
    
    initializeApp();
});

// ===== APP INITIALIZATION =====
function initializeApp() {
    hideLoadingScreen();
    setupEventListeners();
    loadProducts();
    loadGallery();
    updateCartDisplay();
    updateVisitorCount();
    setupScrollAnimations();
    setupHeaderScrollEffect();
    animateCounters();
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('mobile-open');
        });
    }

    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay) {
        searchBtn.addEventListener('click', openSearch);
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }
    
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
    }
    
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, CONFIG.SEARCH_DEBOUNCE_DELAY);
        });
    }

    // Cart functionality
    const cartBtn = document.getElementById('cart-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartClose = document.getElementById('cart-close');
    const cartClear = document.getElementById('cart-clear');
    const cartCheckout = document.getElementById('cart-checkout');

    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }
    
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                toggleCart();
            }
        });
    }
    
    if (cartClear) {
        cartClear.addEventListener('click', clearCart);
    }
    
    if (cartCheckout) {
        cartCheckout.addEventListener('click', checkoutCart);
    }

    // Quick view modal
    const quickViewModal = document.getElementById('quick-view-modal');
    const quickViewClose = document.getElementById('quick-view-close');
    
    if (quickViewClose) {
        quickViewClose.addEventListener('click', closeQuickView);
    }
    
    if (quickViewModal) {
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        });
    }

    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            filterProducts(category);
            
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                if (navMenu && navMenu.classList.contains('mobile-open')) {
                    navMenu.classList.remove('mobile-open');
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (appState.isSearchOpen) closeSearch();
            if (appState.isCartOpen) toggleCart();
            if (appState.isQuickViewOpen) closeQuickView();
        }
    });
}

// ===== SEARCH FUNCTIONALITY =====
function openSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    if (searchOverlay && searchInput) {
        searchOverlay.classList.add('active');
        appState.isSearchOpen = true;
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    }
}

function closeSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchOverlay) {
        searchOverlay.classList.remove('active');
        appState.isSearchOpen = false;
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
    
    if (searchResults) {
        searchResults.innerHTML = '';
    }
}

function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults || !query.trim()) {
        searchResults.innerHTML = '';
        return;
    }

    const results = PRODUCTS_DATA.filter(product => 
        product.name.includes(query) || 
        product.description.includes(query) ||
        product.ingredients.some(ingredient => ingredient.includes(query))
    );

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>لم يتم العثور على نتائج لـ "${query}"</p>
                <p>جرب البحث بكلمات أخرى</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = results.map(product => `
        <div class="search-result-item" onclick="openQuickView(${product.id})">
            <div class="result-image">${product.emoji}</div>
            <div class="result-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <span class="result-price">${product.price.toFixed(2)} درهم</span>
            </div>
        </div>
    `).join('');
}

// ===== PRODUCTS FUNCTIONALITY =====
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    appState.filteredProducts = PRODUCTS_DATA;
    renderProducts();
}

function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = appState.filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image-container">
                <div class="image-placeholder">${product.emoji}</div>
                <div class="product-overlay">
                    <button class="quick-view-btn" onclick="openQuickView(${product.id})">
                        <i class="fas fa-eye"></i>
                        عرض سريع
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} درهم</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-basket"></i>
                    أضف إلى السلة
                </button>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    appState.currentCategory = category;
    
    if (category === 'all') {
        appState.filteredProducts = PRODUCTS_DATA;
    } else {
        appState.filteredProducts = PRODUCTS_DATA.filter(product => product.category === category);
    }
    
    renderProducts();
}

// ===== GALLERY FUNCTIONALITY =====
function loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = GALLERY_DATA.map(item => `
        <div class="gallery-item" onclick="openLightbox('${item.title}', '${item.emoji}')">
            <div class="image-placeholder">${item.emoji}</div>
            <div class="gallery-overlay">
                <i class="fas fa-expand"></i>
            </div>
        </div>
    `).join('');
}

function openLightbox(title, emoji) {
    // Create lightbox dynamically
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-image">
                <div style="font-size: 10rem; text-align: center;">${emoji}</div>
            </div>
            <div class="lightbox-title">${title}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    setTimeout(() => lightbox.classList.add('active'), 10);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.remove(), 300);
    }
}

// ===== CART FUNCTIONALITY =====
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

    saveCart();
    updateCartDisplay();
    showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    renderCartItems();
}

function updateCartQuantity(productId, quantity) {
    const item = appState.cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
            renderCartItems();
        }
    }
}

function clearCart() {
    if (appState.cart.length === 0) return;
    
    if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
        appState.cart = [];
        saveCart();
        updateCartDisplay();
        renderCartItems();
        showNotification('تم إفراغ السلة', 'success');
    }
}

function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal) return;

    if (appState.isCartOpen) {
        cartModal.classList.remove('active');
        appState.isCartOpen = false;
    } else {
        cartModal.classList.add('active');
        appState.isCartOpen = true;
        renderCartItems();
    }
}

function renderCartItems() {
    const cartBody = document.getElementById('cart-body');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartBody || !cartTotal) return;

    if (appState.cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>السلة فارغة</p>
                <p>أضف بعض المنتجات اللذيذة!</p>
            </div>
        `;
        cartTotal.textContent = '0.00 درهم';
        return;
    }

    cartBody.innerHTML = appState.cart.map(item => `
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
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)} درهم`;
}

function checkoutCart() {
    if (appState.cart.length === 0) {
        showNotification('السلة فارغة! يرجى إضافة منتجات أولاً', 'error');
        return;
    }

    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let message = 'مرحباً مخبزة علاّف، أود طلب المنتجات التالية:\n\n';
    
    appState.cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} درهم\n`;
    });
    
    message += `\n💰 المجموع الإجمالي: ${total.toFixed(2)} درهم\n\nشكراً لكم`;

    const whatsappURL = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

function saveCart() {
    localStorage.setItem(CONFIG.CART_STORAGE_KEY, JSON.stringify(appState.cart));
}

// ===== QUICK VIEW FUNCTIONALITY =====
function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const quickViewModal = document.getElementById('quick-view-modal');
    const quickViewBody = document.getElementById('quick-view-body');
    
    if (!quickViewModal || !quickViewBody) return;

    quickViewBody.innerHTML = `
        <div class="quick-view-product">
            <div class="product-image-section">
                <div class="product-main-image">
                    <div style="font-size: 8rem; text-align: center; padding: 2rem;">${product.emoji}</div>
                </div>
            </div>
            <div class="produc