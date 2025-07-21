// ===== CONFIGURATION =====
const CONFIG = {
  whatsappNumber: '212681848262',
  visitorApiUrl: 'https://api.countapi.xyz',
  siteName: 'allaf-bakery-visits'
};

// ===== PRODUCT DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: 'كرواسون ',
    price: 2,
    image: 'images/croissant.jpg',
    category: 'bakery',
    badge: 'الأكثر طلباً'
  },
  {
    id: 2,
    name: 'مسمن  ',
    price: 3.5,
    image: 'images/msemen.jpg',
    category: 'bakery',
    badge: 'تقليدي'
  },
  {
    id: 3,
    name: 'كيكة الشوكولاتة',
    price: 40,
    image: 'images/cake.jpg',
    category: 'cakes',
    badge: 'مميز'
  },
  {
    id: 4,
    name: 'بغرير شهي',
    price: 1.5,
    image: 'images/cake.jpg',
    category: 'bakery',
    badge: 'طازج'
  },
  {
    id: 5,
    name: 'غريبة باللوز',
    price: 2.5,
    image: 'images/cake.jpg',
    category: 'sweets',
    badge: 'حلو'
  },
  {
    id: 6,
    name: 'كعب غزال',
    price: 4,
    image: 'images/cake.jpg',
    category: 'sweets',
    badge: 'أصيل'
  },
  {
    id: 7,
    name: 'تارت الفواكه',
    price: 35,
    image: 'images/cake.jpg',
    category: 'cakes',
    badge: 'موسمي'
  }
];

// ===== GLOBAL VARIABLES =====
let cart = JSON.parse(localStorage.getItem('allaf-cart')) || [];
let isCartOpen = false;

// ===== DOM ELEMENTS =====
const elements = {
  loadingScreen: document.getElementById('loading-screen'),
  header: document.getElementById('header'),
  nav: document.getElementById('nav'),
  menuToggle: document.getElementById('menu-toggle'),
  cartBtn: document.getElementById('cart-btn'),
  cartCount: document.getElementById('cart-count'),
  cartSidebar: document.getElementById('cart-sidebar'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartItems: document.getElementById('cart-items'),
  cartTotal: document.getElementById('cart-total'),
  closeCart: document.getElementById('close-cart'),
  checkoutBtn: document.getElementById('checkout-btn'),
  productsGrid: document.getElementById('products-grid'),
  filterBtns: document.querySelectorAll('.filter-btn'),
  toast: document.getElementById('toast'),
  visitorCount: document.getElementById('visitor-count'),
  currentYear: document.getElementById('current-year'),
  heroScroll: document.querySelector('.hero-scroll')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  try {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize components
    await Promise.all([
      initializeVisitorCounter(),
      loadProducts(),
      setupEventListeners(),
      updateCartDisplay()
    ]);
    
    // Set current year
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }
    
    // Hide loading screen after everything is loaded
    setTimeout(hideLoadingScreen, 1500);
    
    // Initialize animations
    initializeAnimations();
    
  } catch (error) {
    console.error('خطأ في تهيئة التطبيق:', error);
    hideLoadingScreen();
  }
}

// ===== LOADING SCREEN =====
function showLoadingScreen() {
  if (elements.loadingScreen) {
    elements.loadingScreen.style.display = 'flex';
  }
}

function hideLoadingScreen() {
  if (elements.loadingScreen) {
    elements.loadingScreen.classList.add('hidden');
    setTimeout(() => {
      elements.loadingScreen.style.display = 'none';
    }, 500);
  }
}

// ===== VISITOR COUNTER =====
async function initializeVisitorCounter() {
  try {
    // Get current count
    const response = await fetch(`${CONFIG.visitorApiUrl}/get/${CONFIG.siteName}`);
    const data = await response.json();
    
    // Increment count
    const incrementResponse = await fetch(`${CONFIG.visitorApiUrl}/hit/${CONFIG.siteName}`);
    const incrementData = await incrementResponse.json();
    
    // Display count
    if (elements.visitorCount && incrementData.value) {
      elements.visitorCount.textContent = incrementData.value.toLocaleString('ar-SA');
    }
  } catch (error) {
    console.error('خطأ في عداد الزوار:', error);
    // Fallback to localStorage
    let count = parseInt(localStorage.getItem('visitor-count') || '0') + 1;
    localStorage.setItem('visitor-count', count.toString());
    if (elements.visitorCount) {
      elements.visitorCount.textContent = count.toLocaleString('ar-SA');
    }
  }
}

// ===== PRODUCTS =====
function loadProducts(filter = 'all') {
  if (!elements.productsGrid) return;
  
  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === filter);
  
  elements.productsGrid.innerHTML = '';
  
  filteredProducts.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    elements.productsGrid.appendChild(productCard);
  });
  
  // Animate product cards
  animateProductCards();
}

function createProductCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
    </div>
    <div class="product-content">
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">${product.price.toFixed(2)} درهم</div>
      <button class="add-to-cart" onclick="addToCart(${product.id})">
        <i class="fas fa-cart-plus"></i>
        أضف للسلة
      </button>
    </div>
  `;
  
  return card;
}

function animateProductCards() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ===== CART FUNCTIONS =====
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartDisplay();
  showToast(`تم إضافة ${product.name} إلى السلة!`, 'success');
  
  // Add animation to cart button
  elements.cartBtn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    elements.cartBtn.style.transform = 'scale(1)';
  }, 200);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartDisplay();
  showToast('تم حذف المنتج من السلة', 'info');
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (elements.cartCount) {
    elements.cartCount.textContent = totalItems;
  }
  
  // Update cart items
  if (elements.cartItems) {
    if (cart.length === 0) {
      elements.cartItems.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
          <p>السلة فارغة</p>
          <p style="font-size: 0.9rem; color: #999;">أضف بعض المنتجات اللذيذة!</p>
        </div>
      `;
    } else {
      elements.cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)} درهم</div>
            <div class="cart-item-controls">
              <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                <i class="fas fa-minus"></i>
              </button>
              <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                <i class="fas fa-plus"></i>
              </button>
              <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
  
  // Update cart total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (elements.cartTotal) {
    elements.cartTotal.textContent = `${total.toFixed(2)} درهم`;
  }
}

function saveCart() {
  localStorage.setItem('allaf-cart', JSON.stringify(cart));
}

function toggleCart() {
  isCartOpen = !isCartOpen;
  
  if (isCartOpen) {
    elements.cartSidebar?.classList.add('active');
    elements.cartOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    elements.cartSidebar?.classList.remove('active');
    elements.cartOverlay?.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function generateWhatsAppOrder() {
  if (cart.length === 0) {
    showToast('السلة فارغة! أضف بعض المنتجات أولاً', 'warning');
    return;
  }
  
  let message = 'مرحباً مخبزة علاّف 🍞\n\nأود طلب المنتجات التالية:\n\n';
  
  cart.forEach(item => {
    message += `• ${item.name}\n`;
    message += `  الكمية: ${item.quantity}\n`;
    message += `  السعر: ${(item.price * item.quantity).toFixed(2)} درهم\n\n`;
  });
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `💰 المجموع الإجمالي: ${total.toFixed(2)} درهم\n\n`;
  message += 'شكراً لكم! ❤️';
  
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  showToast('تم فتح واتساب لإرسال طلبك!', 'success');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  if (!elements.toast) return;
  
  const toastContent = elements.toast.querySelector('.toast-content');
  const toastIcon = elements.toast.querySelector('.toast-icon');
  const toastMessage = elements.toast.querySelector('.toast-message');
  
  // Set icon based on type
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  };
  
  const colors = {
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  };
  
  toastIcon.className = icons[type] || icons.success;
  toastMessage.textContent = message;
  elements.toast.style.backgroundColor = colors[type] || colors.success;
  
  elements.toast.classList.add('show');
  
  setTimeout(() => {
    elements.toast.classList.remove('show');
  }, 3000);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Menu toggle
  elements.menuToggle?.addEventListener('click', () => {
    elements.nav?.classList.toggle('active');
    elements.menuToggle?.classList.toggle('active');
  });
  
  // Cart toggle
  elements.cartBtn?.addEventListener('click', toggleCart);
  elements.closeCart?.addEventListener('click', toggleCart);
  elements.cartOverlay?.addEventListener('click', toggleCart);
  
  // Checkout button
  elements.checkoutBtn?.addEventListener('click', generateWhatsAppOrder);
  
  // Filter buttons
  elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      elements.filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      // Load filtered products
      loadProducts(btn.dataset.filter);
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = elements.header?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        elements.nav?.classList.remove('active');
        elements.menuToggle?.classList.remove('active');
        
        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      elements.header?.classList.add('scrolled');
    } else {
      elements.header?.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLinkOnScroll();
  });
  
  // Hero scroll button
  elements.heroScroll?.addEventListener('click', () => {
    document.getElementById('products')?.scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  // Close cart when clicking outside
  document.addEventListener('click', (e) => {
    if (isCartOpen && !elements.cartSidebar?.contains(e.target) && !elements.cartBtn?.contains(e.target)) {
      toggleCart();
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape key to close cart
    if (e.key === 'Escape' && isCartOpen) {
      toggleCart();
    }
  });
}

// ===== NAVIGATION HELPERS =====
function updateActiveNavLink(targetId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

function updateActiveNavLinkOnScroll() {
  const sections = ['hero', 'products', 'about', 'contact'];
  const headerHeight = elements.header?.offsetHeight || 0;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight - 100;
      if (window.scrollY >= sectionTop) {
        updateActiveNavLink(`#${sections[i]}`);
        break;
      }
    }
  }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.section-header, .about-content, .contact-buttons').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  return `${price.toFixed(2)} درهم`;
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

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('خطأ في التطبيق:', e.error);
  showToast('حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.', 'error');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
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

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.generateWhatsAppOrder = generateWhatsAppOrder;

console.log('🍞 مخبزة علاّف - تم تحميل التطبيق بنجاح!');
