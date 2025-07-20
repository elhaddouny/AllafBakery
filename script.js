// --- Cart Logic ---
let cart = [];
let total = 0;
const cartCountBadge = document.getElementById('cart-count-badge');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartPopup = document.getElementById('cart-popup');

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartDisplay();
  showCart();
}

function updateCartDisplay() {
  cartCountBadge.innerText = cart.length;
  cartTotalEl.innerText = total.toFixed(2);
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<li>السلة فارغة حاليًا.</li>';
  } else {
    cartItemsEl.innerHTML = cart.map(item => `<li>${item.name} - ${item.price.toFixed(2)} درهم</li>`).join('');
  }
}

function showCart() {
  cartPopup.style.display = 'block';
}

function closeCart() {
  cartPopup.style.display = 'none';
}

function generateWhatsAppInvoice() {
  if (cart.length === 0) {
    alert("الرجاء إضافة منتجات إلى السلة أولاً!");
    return;
  }
  let invoice = "مرحباً مخبزة علاّف، أود طلب المنتجات التالية:\n\n" +
                cart.map(item => `- ${item.name} (${item.price.toFixed(2)} درهم)`).join('\n') +
                `\n\n*المجموع الإجمالي: ${total.toFixed(2)} درهم*`;
  const whatsappURL = `https://wa.me/212681848262?text=${encodeURIComponent(invoice)}`;
  window.open(whatsappURL, '_blank');
}

// --- Visitor Counter & Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
  // Visitor Counter
  const countDisplay = document.getElementById('visitor-count');
  let visitorCount = parseInt(localStorage.getItem('visitorCount_allafBakery_v2') || '0');
  visitorCount++;
  localStorage.setItem('visitorCount_allafBakery_v2', visitorCount);
  countDisplay.innerText = visitorCount;

  // Animation on Scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
    // For elements already in view on load
    if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
    }
  });
});
