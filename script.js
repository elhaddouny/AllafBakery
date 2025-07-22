// ===== CONFIGURATION =====
const CONFIG = {
  whatsappNumber: '212681848262',
  googleMapsApiKey: 'YOUR_API_KEY', // Replace with your actual Google Maps API Key
  productsPerPage: 6,
};

// ===== PRODUCT DATA (Example Data - Replace with your actual products) =====
const PRODUCTS = [
  {
    id: 1,
    name: {
      ar: 'خبز مغربي تقليدي',
      fr: 'Pain Marocain Traditionnel'
    },
    description: {
      ar: 'خبز طازج مخبوز يومياً بالطريقة التقليدية.',
      fr: 'Pain frais cuit quotidiennement de manière traditionnelle.'
    },
    price: 5,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400',
    category: 'bread',
    ingredients: ['gluten'],
    badge: {
      ar: 'الأكثر مبيعاً',
      fr: 'Meilleure vente'
    }
  },
  {
    id: 2,
    name: {
      ar: 'شباكية بالعسل',
      fr: 'Chebakia au Miel'
    },
    description: {
      ar: 'حلويات مغربية تقليدية مقرمشة ومغموسة بالعسل.',
      fr: 'Pâtisserie marocaine traditionnelle croustillante et trempée dans le miel.'
    },
    price: 10,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400',
    category: 'traditional',
    ingredients: ['gluten', 'nuts'],
    badge: {
      ar: 'تقليدي',
      fr: 'Traditionnel'
    }
  },
  {
    id: 3,
    name: {
      ar: 'كيكة الشوكولاتة الفاخرة',
      fr: 'Gâteau au Chocolat de Luxe'
    },
    description: {
      ar: 'كيكة غنية بالشوكولاتة البلجيكية الفاخرة.',
      fr: 'Gâteau riche en chocolat belge de luxe.'
    },
    price: 40,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400',
    category: 'cakes',
    ingredients: ['gluten', 'sugar'],
    badge: {
      ar: 'مميز',
      fr: 'Spécial'
    }
  },
  {
    id: 4,
    name: {
      ar: 'غريبة باللوز',
      fr: 'Ghriba aux Amandes'
    },
    description: {
      ar: 'حلويات مغربية تقليدية مصنوعة باللوز.',
      fr: 'Pâtisserie marocaine traditionnelle faite avec des amandes.'
    },
    price: 8,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400',
    category: 'traditional',
    ingredients: ['nuts'],
    badge: {
      ar: 'محبوبة',
      fr: 'Populaire'
    }
  },
  {
    id: 5,
    name: {
      ar: 'تارت الفواكه الموسمية',
      fr: 'Tarte aux Fruits de Saison'
    },
    description: {
      ar: 'تارت منعشة بالفواكه الطازجة.',
      fr: 'Tarte rafraîchissante aux fruits frais.'
    },
    price: 35,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=400',
    category: 'cakes',
    ingredients: ['sugar'],
    badge: {
      ar: 'صحي',
      fr: 'Sain'
    }
  },
  {
    id: 6,
    name: {
      ar: 'خبز القمح الكامل',
      fr: 'Pain de Blé Entier'
    },
    description: {
      ar: 'خبز صحي من القمح الكامل.',
      fr: 'Pain sain à base de blé entier.'
    },
    price: 7,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400',
    category: 'bread',
    ingredients: ['gluten', 'sugar-free'],
    badge: {
      ar: 'خالي من السكر',
      fr: 'Sans sucre'
    }
  },
  {
    id: 7,
    name: {
      ar: 'فقاص باللوز والزبيب',
      fr: 'Fekkas aux Amandes et Raisins Secs'
    },
    description: {
      ar: 'بسكويت مغربي تقليدي مقرمش.',
      fr: 'Biscuit marocain traditionnel croustillant.'
    },
    price: 9,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400',
    category: 'traditional',
    ingredients: ['gluten', 'nuts'],
    badge: {
      ar: 'مقرمش',
      fr: 'Croustillant'
    }
  },
  {
    id: 8,
    name: {
      ar: 'كيكة الجزر والجوز',
      fr: 'Gâteau aux Carottes et Noix'
    },
    description: {
      ar: 'كيكة غنية بنكهة الجزر والجوز.',
      fr: 'Gâteau riche en saveur de carottes et de noix.'
    },
    price: 45,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400',
    category: 'cakes',
    ingredients: ['gluten', 'nuts'],
    badge: {
      ar: 'جديد',
      fr: 'Nouveau'
    }
  },
  {
    id: 9,
    name: {
      ar: 'خبز الشعير',
      fr: 'Pain d\'Orge'
    },
    description: {
      ar: 'خبز صحي وغني بالألياف.',
      fr: 'Pain sain et riche en fibres.'
    },
    price: 6,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=400',
    category: 'bread',
    ingredients: ['gluten', 'vegan'],
    badge: {
      ar: 'نباتي',
      fr: 'Végétalien'
    }
  },
  {
    id: 10,
    name: {
      ar: 'كعب غزال',
      fr: 'Kaab Ghzal'
    },
    description: {
      ar: 'حلويات مغربية تقليدية محشوة باللوز.',
      fr: 'Pâtisserie marocaine traditionnelle farcie aux amandes.'
    },
    price: 12,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400',
    category: 'traditional',
    ingredients: ['nuts'],
    badge: {
      ar: 'فاخر',
      fr: 'Luxueux'
    }
  },
];

// ===== GLOBAL VARIABLES =====
let cart = JSON.parse(localStorage.getItem('allaf-cart')) || [];
let isCartOpen = false;
let currentLanguage = localStorage.getItem('allaf-lang') || 'ar';
let displayedProductsCount = 0;
let currentFilter = 'all';
let currentIngredients = [];

// ===== DOM ELEMENTS =====
const elements = {
  loadingScreen: null,
  languageBtns: null,
  header: null,
  nav: null,
  menuToggle: null,
  cartBtn: null,
  cartCount: null,
  cartSidebar: null,
  cartOverlay: null,
  cartItems: null,
  cartTotal: null,
  closeCart: null,
  checkoutBtn: null,
  productsGrid: null,
  filterBtns: null,
  ingredientTags: null,
  loadMoreBtn: null,
  toast: null,
  visitorCount: null,
  currentYear: null,
  heroScroll: null,
  stickyOrderBtn: null,
  searchInput: null,
  searchBtn: null,
  searchModal: null,
  closeSearchModal: null,
  searchResults: null,
  contactForm: null,
  newsletterForm: null,
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  initializeApp();
});

function initializeElements() {
  elements.loadingScreen = document.getElementById('loading-screen');
  elements.languageBtns = document.querySelectorAll('.lang-btn');
  elements.header = document.getElementById('header');
  elements.nav = document.getElementById('nav');
  elements.menuToggle = document.getElementById('menu-toggle');
  elements.cartBtn = document.getElementById('cart-btn');
  elements.cartCount = document.getElementById('cart-count');
  elements.cartSidebar = document.getElementById('cart-sidebar');
  elements.cartOverlay = document.getElementById('cart-overlay');
  elements.cartItems = document.getElementById('cart-items');
  elements.cartTotal = document.getElementById('cart-total');
  elements.closeCart = document.getElementById('close-cart');
  elements.checkoutBtn = document.getElementById('checkout-btn');
  elements.productsGrid = document.getElementById('products-grid');
  elements.filterBtns = document.querySelectorAll('.filter-btn');
  elements.ingredientTags = document.querySelectorAll('.ingredient-tag');
  elements.loadMoreBtn = document.getElementById('load-more-btn');
  elements.toast = document.getElementById('toast');
  elements.visitorCount = document.getElementById('visitor-count');
  elements.currentYear = document.getElementById('current-year');
  elements.heroScroll = document.querySelector('.hero-scroll');
  elements.stickyOrderBtn = document.getElementById('sticky-order-btn');
  elements.searchInput = document.getElementById('search-input');
  elements.searchBtn = document.querySelector('.search-btn');
  elements.searchModal = document.getElementById('search-modal');
  elements.closeSearchModal = document.getElementById('close-search-modal');
  elements.searchResults = document.getElementById('search-results');
  elements.contactForm = document.getElementById('contact-form');
  elements.newsletterForm = document.getElementById('newsletter-form');
}

async function initializeApp() {
  try {
    showLoadingScreen();
    
    // Set initial language
    setLanguage(currentLanguage);

    // Initialize components
    await Promise.all([
      initializeSwiper(),
      initializeAOS(),
      initializeLocalVisitorCounter(),
      loadProducts(currentFilter, currentIngredients),
      setupEventListeners(),
      updateCartDisplay(),
      updateCountdownTimers(),
      initMap(), // Initialize Google Map
    ]);
    
    // Set current year
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }
    
    setTimeout(hideLoadingScreen, 1500);
    
  } catch (error) {
    console.error('خطأ في تهيئة التطبيق:', error);
    hideLoadingScreen();
  }
}

// ===== LANGUAGE SWITCHER =====
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('allaf-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Update text content based on data-lang attributes
  document.querySelectorAll('[data-ar], [data-fr]').forEach(element => {
    if (element.dataset[lang]) {
      element.textContent = element.dataset[lang];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-ar-placeholder], [data-fr-placeholder]').forEach(element => {
    if (element.dataset[`${lang}Placeholder`]) {
      element.placeholder = element.dataset[`${lang}Placeholder`];
    }
  });

  // Update active language button
  elements.languageBtns.forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Reload products to update names/descriptions
  loadProducts(currentFilter, currentIngredients);
  updateCartDisplay();
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

// ===== LOCAL VISITOR COUNTER =====
function initializeLocalVisitorCounter() {
  let localCount = parseInt(localStorage.getItem('local-visitor-count') || '0');
  localCount++; // Increment for each visit
  localStorage.setItem('local-visitor-count', localCount.toString());
  updateVisitorDisplay(localCount);
}

function updateVisitorDisplay(count) {
  if (elements.visitorCount) {
    elements.visitorCount.textContent = count.toLocaleString(currentLanguage === 'ar' ? 'ar-EG' : 'en-US');
  }
}

// ===== SWIPER SLIDER (HERO SECTION) =====
function initializeSwiper() {
  new Swiper('.hero-slider', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,
  });
}

// ===== AOS ANIMATION LIBRARY =====
function initializeAOS() {
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
  });
}

// ===== PRODUCTS & FILTERS =====
function loadProducts(filter = 'all', ingredients = []) {
  if (!elements.productsGrid) return;

  let filteredProducts = PRODUCTS;

  // Filter by category
  if (filter !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === filter);
  }

  // Filter by ingredients
  if (ingredients.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return ingredients.every(ing => product.ingredients.includes(ing));
    });
  }

  elements.productsGrid.innerHTML = '';
  displayedProductsCount = 0;
  
  renderProducts(filteredProducts);
  updateLoadMoreButton(filteredProducts.length);
}

function renderProducts(productsToRender) {
  const startIndex = displayedProductsCount;
  const endIndex = Math.min(startIndex + CONFIG.productsPerPage, productsToRender.length);

  for (let i = startIndex; i < endIndex; i++) {
    const product = productsToRender[i];
    const productCard = createProductCard(product, i);
    elements.productsGrid.appendChild(productCard);
  }
  displayedProductsCount = endIndex;
}

function createProductCard(product, index) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-aos', 'fade-up');
  card.setAttribute('data-aos-delay', index * 50);
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name[currentLanguage]}" loading="lazy" />
      ${product.badge ? `<div class="product-badge">${product.badge[currentLanguage]}</div>` : ''}
    </div>
    <div class="product-content">
      <h3 class="product-title">${product.name[currentLanguage]}</h3>
      <p class="product-description">${product.description[currentLanguage]}</p>
      <div class="product-price">${product.price.toFixed(2)} درهم</div>
      <div class="product-actions">
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          <i class="fas fa-cart-plus"></i>
          <span data-ar="أضف للسلة" data-fr="Ajouter au panier">${currentLanguage === 'ar' ? 'أضف للسلة' : 'Ajouter au panier'}</span>
        </button>
        <button class="product-favorite">
          <i class="far fa-heart"></i>
        </button>
      </div>
    </div>
  `;
  
  return card;
}

function updateLoadMoreButton(totalProducts) {
  if (elements.loadMoreBtn) {
    if (displayedProductsCount < totalProducts) {
      elements.loadMoreBtn.style.display = 'inline-flex';
      elements.loadMoreBtn.onclick = () => {
        const filteredProducts = filterAndSearchProducts(currentFilter, currentIngredients, elements.searchInput.value);
        renderProducts(filteredProducts);
        updateLoadMoreButton(filteredProducts.length);
      };
    } else {
      elements.loadMoreBtn.style.display = 'none';
    }
  }
}

function filterAndSearchProducts(filter, ingredients, searchTerm) {
  let filtered = PRODUCTS;

  if (filter !== 'all') {
    filtered = filtered.filter(product => product.category === filter);
  }

  if (ingredients.length > 0) {
    filtered = filtered.filter(product => {
      return ingredients.every(ing => product.ingredients.includes(ing));
    });
  }

  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(product => 
      product.name[currentLanguage].toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description[currentLanguage].toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
  return filtered;
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
  showToast(`${product.name[currentLanguage]} ${currentLanguage === 'ar' ? 'تمت إضافته إلى السلة!' : 'a été ajouté au panier !'}`, 'success');
  
  if (elements.cartBtn) {
    elements.cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => {
      elements.cartBtn.style.transform = 'scale(1)';
    }, 200);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartDisplay();
  showToast(currentLanguage === 'ar' ? 'تم حذف المنتج من السلة' : 'Produit supprimé du panier', 'info');
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
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (elements.cartCount) {
    elements.cartCount.textContent = totalItems;
  }
  
  if (elements.cartItems) {
    if (cart.length === 0) {
      elements.cartItems.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
          <p>${currentLanguage === 'ar' ? 'السلة فارغة' : 'Le panier est vide'}</p>
          <p style="font-size: 0.9rem; color: #999;">${currentLanguage === 'ar' ? 'أضف بعض المنتجات اللذيذة!' : 'Ajoutez de délicieux produits !'}</p>
        </div>
      `;
    } else {
      elements.cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name[currentLanguage]}" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name[currentLanguage]}</div>
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
    if (elements.cartSidebar) elements.cartSidebar.classList.add('active');
    if (elements.cartOverlay) elements.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    if (elements.cartSidebar) elements.cartSidebar.classList.remove('active');
    if (elements.cartOverlay) elements.cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function generateWhatsAppOrder() {
  if (cart.length === 0) {
    showToast(currentLanguage === 'ar' ? 'السلة فارغة! أضف بعض المنتجات أولاً' : 'Le panier est vide ! Ajoutez d\'abord des produits', 'warning');
    return;
  }
  
  let message = currentLanguage === 'ar' ? 'مرحباً مخبزة علاّف 🍞\n\nأود طلب المنتجات التالية:\n\n' : 'Bonjour Boulangerie Allaf 🍞\n\nJe souhaite commander les produits suivants :\n\n';
  
  cart.forEach(item => {
    message += `• ${item.name[currentLanguage]}\n`;
    message += `  ${currentLanguage === 'ar' ? 'الكمية' : 'Quantité'}: ${item.quantity}\n`;
    message += `  ${currentLanguage === 'ar' ? 'السعر' : 'Prix'}: ${(item.price * item.quantity).toFixed(2)} درهم\n\n`;
  });
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `💰 ${currentLanguage === 'ar' ? 'المجموع الإجمالي' : 'Total'}: ${total.toFixed(2)} درهم\n\n`;
  message += currentLanguage === 'ar' ? 'شكراً لكم! ❤️' : 'Merci ! ❤️';
  
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
  
  showToast(currentLanguage === 'ar' ? 'تم فتح واتساب لإرسال طلبك!' : 'WhatsApp ouvert pour envoyer votre commande !', 'success');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  if (!elements.toast) return;
  
  const toastContent = elements.toast.querySelector('.toast-content');
  const toastIcon = elements.toast.querySelector('.toast-icon');
  const toastMessage = elements.toast.querySelector('.toast-message');
  
  if (!toastContent || !toastIcon || !toastMessage) return;
  
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

// ===== COUNTDOWN TIMERS (Daily Offers) =====
function updateCountdownTimers() {
  document.querySelectorAll('.countdown-timer').forEach(timerElement => {
    const endTime = new Date(timerElement.dataset.end).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        timerElement.innerHTML = `<span style="color: ${elements.toast.style.backgroundColor = '#dc3545'}; font-weight: bold;">${currentLanguage === 'ar' ? 'انتهى العرض!' : 'Offre terminée !'}</span>`;
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerElement.querySelector('.hours').textContent = String(hours).padStart(2, '0');
      timerElement.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
      timerElement.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
  });
}

// ===== GOOGLE MAPS =====
function initMap() {
  const mapElement = document.getElementById('google-map');
  if (!mapElement) return;

  const location = { lat: 34.020882, lng: -6.841650 }; // Example: Rabat, Morocco coordinates
  const map = new google.maps.Map(mapElement, {
    zoom: 15,
    center: location,
    disableDefaultUI: true,
    styles: [
      {
        "featureType": "poi",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "transit",
        "stylers": [{"visibility": "off"}]
      }
    ]
  });

  new google.maps.Marker({
    position: location,
    map: map,
    title: currentLanguage === 'ar' ? 'مخبزة علاّف' : 'Boulangerie Allaf',
  });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Language switcher
  elements.languageBtns.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Menu toggle
  if (elements.menuToggle && elements.nav) {
    elements.menuToggle.addEventListener('click', () => {
      elements.nav.classList.toggle('active');
      elements.menuToggle.classList.toggle('active');
      document.body.style.overflow = elements.nav.classList.contains('active') ? 'hidden' : 'auto';
    });
  }
  
  // Cart toggle
  if (elements.cartBtn) {
    elements.cartBtn.addEventListener('click', toggleCart);
  }
  if (elements.closeCart) {
    elements.closeCart.addEventListener('click', toggleCart);
  }
  if (elements.cartOverlay) {
    elements.cartOverlay.addEventListener('click', toggleCart);
  }
  
  // Checkout button
  if (elements.checkoutBtn) {
    elements.checkoutBtn.addEventListener('click', generateWhatsAppOrder);
  }
  
  // Filter buttons
  elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      loadProducts(currentFilter, currentIngredients);
    });
  });

  // Ingredient tags
  elements.ingredientTags.forEach(tag => {
    tag.addEventListener('click', () => {
      tag.classList.toggle('active');
      currentIngredients = Array.from(elements.ingredientTags)
        .filter(t => t.classList.contains('active'))
        .map(t => t.dataset.ingredient);
      loadProducts(currentFilter, currentIngredients);
    });
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = elements.header ? elements.header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (elements.nav) elements.nav.classList.remove('active');
        if (elements.menuToggle) elements.menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Update active nav link
        updateActiveNavLink(targetId);
      }
    });
  });
  
  // Header scroll effect & sticky order button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      if (elements.header) elements.header.classList.add('scrolled');
      if (elements.stickyOrderBtn) elements.stickyOrderBtn.classList.add('visible');
    } else {
      if (elements.header) elements.header.classList.remove('scrolled');
      if (elements.stickyOrderBtn) elements.stickyOrderBtn.classList.remove('visible');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLinkOnScroll();
  });
  
  // Hero scroll button
  if (elements.heroScroll) {
    elements.heroScroll.addEventListener('click', () => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Close cart when clicking outside
  document.addEventListener('click', (e) => {
    if (isCartOpen && elements.cartSidebar && elements.cartBtn && 
        !elements.cartSidebar.contains(e.target) && 
        !elements.cartBtn.contains(e.target)) {
      toggleCart();
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCartOpen) {
      toggleCart();
    }
    if (e.key === 'Escape' && elements.searchModal.classList.contains('active')) {
      closeSearchModal();
    }
  });

  // Search functionality
  if (elements.searchBtn) {
    elements.searchBtn.addEventListener('click', openSearchModal);
  }
  if (elements.closeSearchModal) {
    elements.closeSearchModal.addEventListener('click', closeSearchModal);
  }
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
    elements.searchInput.addEventListener('focus', openSearchModal);
  }

  // Contact Form Submission
  if (elements.contactForm) {
    elements.contactForm.addEventListener('submit', handleContactFormSubmit);
  }

  // Newsletter Form Submission
  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener('submit', handleNewsletterFormSubmit);
  }
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
  const sections = ['hero', 'about', 'products', 'offers', 'testimonials', 'location', 'contact', 'instagram', 'newsletter'];
  const headerHeight = elements.header ? elements.header.offsetHeight : 0;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight - 100; // Offset for header and some buffer
      if (window.scrollY >= sectionTop) {
        updateActiveNavLink(`#${sections[i]}`);
        break;
      }
    }
  }
}

// ===== SEARCH MODAL FUNCTIONS =====
function openSearchModal() {
  if (elements.searchModal) {
    elements.searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    elements.searchInput.focus();
  }
}

function closeSearchModal() {
  if (elements.searchModal) {
    elements.searchModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    elements.searchResults.innerHTML = ''; // Clear results
    elements.searchInput.value = ''; // Clear search input
  }
}

function handleSearch() {
  const searchTerm = elements.searchInput.value.toLowerCase();
  const results = filterAndSearchProducts('all', [], searchTerm);
  displaySearchResults(results, searchTerm);
}

function displaySearchResults(results, searchTerm) {
  if (!elements.searchResults) return;

  elements.searchResults.innerHTML = '';

  if (results.length === 0) {
    elements.searchResults.innerHTML = `<div class="search-no-results">${currentLanguage === 'ar' ? 'لا توجد نتائج مطابقة لبحثك.' : 'Aucun résultat ne correspond à votre recherche.'}</div>`;
    return;
  }

  results.forEach(product => {
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
      <div class="result-image">
        <img src="${product.image}" alt="${product.name[currentLanguage]}" />
      </div>
      <div class="result-info">
        <h4>${highlightText(product.name[currentLanguage], searchTerm)}</h4>
        <p>${highlightText(product.description[currentLanguage], searchTerm)}</p>
        <div class="result-price">${product.price.toFixed(2)} درهم</div>
      </div>
    `;
    resultItem.addEventListener('click', () => {
      addToCart(product.id);
      closeSearchModal();
      // Optionally scroll to products section or open cart
      toggleCart();
    });
    elements.searchResults.appendChild(resultItem);
  });
}

function highlightText(text, searchTerm) {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, `<span class="search-highlight">$1</span>`);
}

// ===== FORM SUBMISSIONS =====
function handleContactFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Basic validation (more robust validation can be added)
  let isValid = true;
  form.querySelectorAll('input, select, textarea').forEach(input => {
    const errorMessage = input.nextElementSibling;
    if (input.required && !input.value.trim()) {
      errorMessage.textContent = currentLanguage === 'ar' ? 'هذا الحقل مطلوب.' : 'Ce champ est obligatoire.';
      isValid = false;
    } else if (input.type === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)) {
      errorMessage.textContent = currentLanguage === 'ar' ? 'البريد الإلكتروني غير صالح.' : 'Email invalide.';
      isValid = false;
    } else {
      errorMessage.textContent = '';
    }
  });

  if (!isValid) {
    showToast(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.' : 'Veuillez remplir tous les champs obligatoires correctement.', 'error');
    return;
  }

  console.log('Contact Form Data:', data);
  showToast(currentLanguage === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Votre message a été envoyé avec succès !', 'success');
  form.reset();
}

function handleNewsletterFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput.value.trim();

  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    showToast(currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح.' : 'Veuillez entrer une adresse email valide.', 'error');
    return;
  }

  console.log('Newsletter Subscription Email:', email);
  showToast(currentLanguage === 'ar' ? 'شكراً لاشتراكك في نشرتنا الإخبارية!' : 'Merci de vous être abonné à notre newsletter !', 'success');
  form.reset();
}

// ===== UTILITY FUNCTIONS =====
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
  showToast(currentLanguage === 'ar' ? 'حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.' : 'Une erreur inattendue s\'est produite. Veuillez recharger la page.', 'error');
});

console.log('🍞 مخبزة علاّف - تم تحميل التطبيق بنجاح!');


