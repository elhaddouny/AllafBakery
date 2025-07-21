document.addEventListener('DOMContentLoaded', function() {
  
  // --- Configuration ---
  const MAINTENANCE_ENABLED = false; // لتفعيل وضع الصيانة، غير القيمة إلى true
  const WHATSAPP_NUMBER = "212681848262";
  
  // --- Product Data ---
  const products = [
    { id: 1, name: 'كرواسون بالزبدة', price: 2, image: 'images/croissant.jpg', category: 'bakery' },
    { id: 2, name: 'مسمن بلدي معسل', price: 3.5, image: 'images/msemen.jpg', category: 'bakery' },
    { id: 3, name: 'كيكة الشوكولاتة', price: 40, image: 'images/cake.jpg', category: 'cakes' },
    { id: 4, name: 'بغرير شهي', price: 1.5, image: 'images/baghrir.jpg', category: 'bakery' },
    { id: 5, name: 'غريبة باللوز', price: 2.5, image: 'images/ghriba.jpg', category: 'sweets' },
    { id: 6, name: 'كعب غزال', price: 4, image: 'images/kaab.jpg', category: 'sweets' },
    { id: 7, name: 'تارت الفواكه', price: 35, image: 'images/fruit-tart.jpg', category: 'cakes' },
  ];

  // --- DOM Elements ---
  const maintenanceModeScreen = document.getElementById('maintenance-mode');
  const productList = document.querySelector('.product-list');
  const cartCount = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotal = document.getElementById('cart-total');
  const cartPopup = document.getElementById('cart-popup');
  const cartOverlay = document.getElementById('cart-overlay');
  const toast = document.getElementById('toast');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  // --- Cart State ---
  let cart = JSON.parse(localStorage.getItem('allafBakeryCart')) || [];

  // --- Maintenance Mode ---
  if (MAINTENANCE_ENABLED) {
    maintenanceModeScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // --- Render Products ---
  function renderProducts(filter = 'all') {
    productList.innerHTML = '';
    const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);
    
    if (filteredProducts.length === 0) {
      productList.innerHTML = `<p class="empty-category-msg">لا توجد منتجات في هذه الفئة حاليًا.</p>`;
      return;
    }

    filteredProducts.forEach(product => {
      const productCard = `
        <div class="product-card" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-card-content">
            <div>
              <h3>${product.name}</h3>
              <p class="price">${product.price.toFixed(2)} درهم</p>
            </div>
            <button class="add-to-cart-btn"><i class="fas fa-cart-plus"></i> أضف إلى السلة</button>
          </div>
        </div>
      `;
      productList.innerHTML += productCard;
    });
  }

  // --- Cart Logic ---
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showToast(`${product.name} أضيف إلى السلة!`);
  }

  function updateCart() {
    renderCartItems();
    updateCartTotal();
    updateCartIcon();
    localStorage.setItem('allafBakeryCart', JSON.stringify(cart));
  }

  function renderCartItems() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart-empty-msg">السلة فارغة حاليًا.</p>';
      return;
    }

    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
      const itemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="cart-item-price">${(item.price * item.quantity).toFixed(2)} درهم</p>
          </div>
          <div class="cart-item-actions">
            <button class="quantity-btn decrease-btn">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase-btn">+</button>
            <button class="remove-btn">×</button>
          </div>
        </div>
      `;
      cartItemsContainer.innerHTML += itemHTML;
    });
  }

  function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = total.toFixed(2);
  }

  function updateCartIcon() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;
  }

  function handleCartAction(e) {
    const target = e.target;
    const cartItemDiv = target.closest('.cart-item');
    if (!cartItemDiv) return;
    
    const productId = Number(cartItemDiv.dataset.id);
    const cartItem = cart.find(item => item.id === productId);

    if (target
