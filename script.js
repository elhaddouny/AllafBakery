document.addEventListener('DOMContentLoaded', () => {
  
  // --- CONFIGURATION ---
  const WHATSAPP_NUMBER = "212681848262";
  const VISITOR_API_NAMESPACE = "allafbakery-site"; // معرف فريد لموقعك
  const VISITOR_API_KEY = "visits"; // اسم العداد

  // --- PRODUCT DATA ---
  const products = [
    { id: 1, name: 'كرواسون بالزبدة', price: 2, image: 'images/croissant.jpg', category: 'bakery' },
    { id: 2, name: 'مسمن بلدي معسل', price: 3.5, image: 'images/msemen.jpg', category: 'bakery' },
    { id: 3, name: 'كيكة الشوكولاتة', price: 40, image: 'images/cake.jpg', category: 'cakes' },
    { id: 4, name: 'بغرير شهي', price: 1.5, image: 'images/cake.jpg', category: 'bakery' }, // صورة مؤقتة
    { id: 5, name: 'غريبة باللوز', price: 2.5, image: 'images/cake.jpg', category: 'sweets' }, // صورة مؤقتة
    { id: 6, name: 'كعب غزال', price: 4, image: 'images/cake.jpg', category: 'sweets' }, // صورة مؤقتة
    { id: 7, name: 'تارت الفواكه', price: 35, image: 'images/cake.jpg', category: 'cakes' }, // صورة مؤقتة
  ];

  // --- DOM ELEMENTS ---
  const productListEl = document.querySelector('.product-list');
  const cartCountBubbleEl = document.getElementById('cart-count-bubble');
  const cartItemsContainerEl = document.getElementById('cart-items-container');
  const cartTotalEl = document.getElementById('cart-total');
  const cartSidebarEl = document.getElementById('cart-sidebar');
  const cartOverlayEl = document.getElementById('cart-overlay');
  const toastEl = document.getElementById('toast-notification');
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mainNavEl = document.getElementById('main-nav');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartButton = document.getElementById('cart-button');
  const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
  const whatsappContactBtn = document.getElementById('whatsapp-contact-btn');
  const visitorCountEl = document.getElementById('visitor-count');
  
  // --- CART STATE ---
  let cart = JSON.parse(localStorage.getItem('allafBakeryCart')) || [];

  // --- FUNCTIONS
