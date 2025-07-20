// ========== Global Variables ==========
let cart = JSON.parse(localStorage.getItem('allaf_cart')) || [];
let currentProduct = null;

// ========== DOM Content Loaded ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌟 مرحباً بك في مخبزة علاّف المحسنة! نتمنى لك تجربة ممتعة 👨‍🍳');
    
    initializeWebsite();
    updateCartDisplay();
    setupEventListeners();
    setupScrollAnimations();
    hideLoadingScreen();
});

// ========== Website Initialization ==========
function initializeWebsite() {
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup header scroll effect
    setupHeaderScrollEffect();
    
    // Setup product category filtering
    setupProductFiltering();
    
    // Setup back to top button
    setupBackToTop();
    
    // Setup intersection observer for animations
    setupIntersectionObserver();
}

// ========== Loading Screen ==========
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

// ========== Smooth Scrolling ==========
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation link
                updateActiveNavLink(this.getAttribute('href'));
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ========== Header Scroll Effect ==========
function setupHeaderScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========== Navigation ==========
function updateActiveNavLink(href) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    document.querySelectorAll(`a[href="${href}"]`).forEach(link => {
        link.classList.add('active');
    });
}

// ========== Mobile Menu ==========
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.remove('active');
}

// ========== Product Filtering ==========
function setupProductFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            filterProducts(category, productCards);
        });
    });
}

function filterProducts(category, productCards) {
    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.remove('hidden');
            }, 100);
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ========== Cart Functionality ==========
function addToCart(productName, price, image = '') {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showSuccessMessage(`تم إضافة ${productName} إلى السلة!`);
}

function addToCartFromModal() {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('modal-quantity').value);
        const existingItem = cart.find(item => item.name === currentProduct.name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.image,
                quantity: quantity
            });
        }
        
        updateCartDisplay();
        saveCartToStorage();
        closeProductModal();
        showSuccessMessage(`تم إضافة ${currentProduct.name} إلى السلة!`);
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    saveCartToStorage();
}

function updateCartItemQuantity(productName, newQuantity) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productName);
        } else {
            item.quantity = newQuantity;
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
    showSuccessMessage('تم إفراغ السلة!');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    let totalItems = 0;
    let totalPrice = 0;
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>السلة فارغة</p>
                <p class="empty-cart-subtitle">أضف بعض المنتجات الشهية!</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} درهم</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.name}', ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.name}', ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    // Update cart button visibility
    const cartButton = document.querySelector('.cart-button');
    if (totalItems > 0) {
        cartButton.classList.add('has-items');
    } else {
        cartButton.classList.remove('has-items');
    }
}

function saveCartToStorage() {
    localStorage.setItem('allaf_cart', JSON.stringify(cart));
}

function showCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ========== Product Modal ==========
function showProductDetails(name, image, description, price) {
    currentProduct = { name, image, description, price };
    
    document.getElementById('modal-product-name').textContent = name;
    document.getElementById('modal-product-image').src = image;
    document.getElementById('modal-product-image').alt = name;
    document.getElementById('modal-product-description').textContent = description;
    document.getElementById('modal-product-price').textContent = price;
    document.getElementById('modal-quantity').value = 1;
    
    const productModal = document.getElementById('product-modal');
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const productModal = document.getElementById('product-modal');
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProduct = null;
}

function increaseQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('modal-quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// ========== WhatsApp Integration ==========
function generateWhatsAppInvoice() {
    if (cart.length === 0) {
        showSuccessMessage('السلة فارغة! أضف بعض المنتجات أولاً.');
        return;
    }
    
    const orderDetails = cart.map((item, index) =>
        `${index + 1}. ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toFixed(2)} درهم`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = `🧾 *طلب جديد من مخبزة علاّف*\n\n${orderDetails}\n\n💰 *المجموع الكلي:* ${total.toFixed(2)} درهم\n\n📦 شكراً لاختياركم مخبزة علاّف!\n🕐 سيتم تحضير طلبكم في أقرب وقت ممكن.`;
    
    const phone = "212681848262";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    closeCart();
}

// ========== Event Listeners ==========
function setupEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const cartPopup = document.getElementById('cart-popup');
        const productModal = document.getElementById('product-modal');
        
        if (e.target === cartPopup) {
            closeCart();
        }
        
        if (e.target === productModal) {
            closeProductModal();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
            closeProductModal();
            closeMobileMenu();
        }
    });
    
    // Hero scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ========== Scroll Animations ==========
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .about-content, .contact-item');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ========== Back to Top ==========
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== Success Messages ==========
function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    
    successText.textContent = message;
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// ========== Utility Functions ==========
function formatPrice(price) {
    return parseFloat(price).toFixed(2);
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

// ========== Performance Optimizations ==========
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== Error Handling ==========
window.addEventListener('error', function(e) {
    console.error('خطأ في الموقع:', e.error);
});

// ========== Service Worker Registration (for future PWA features) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration can be added here for PWA features
        console.log('🔧 الموقع جاهز للتطوير إلى تطبيق ويب تقدمي (PWA)');
    });
}

// ========== Analytics and Tracking ==========
function trackEvent(eventName, eventData = {}) {
    // Analytics tracking can be implemented here
    console.log(`📊 تتبع الحدث: ${eventName}`, eventData);
}

// Track cart actions
const originalAddToCart = addToCart;
addToCart = function(productName, price, image) {
    trackEvent('add_to_cart', { product: productName, price: price });
    return originalAddToCart.call(this, productName, price, image);
};

// ========== Accessibility Improvements ==========
document.addEventListener('keydown', function(e) {
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ========== Final Initialization ==========
console.log('✅ تم تحميل جميع وظائف الموقع بنجاح!');
console.log('🚀 مخبزة علاّف - النسخة المحسنة جاهزة للاستخدام!');

