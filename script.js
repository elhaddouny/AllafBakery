<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>مخبزة وحلويات علاّف | Allaf Bakery - الطعم الأصيل</title>
  
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <style>
    /* ========== إعدادات عامة ========== */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #fff8f0;
      color: #333;
      margin: 0;
      padding: 0;
    }

    /* ========== الهيدر ========== */
    header {
      background-color: #8B4513;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .logo {
      width: 100px;
      height: auto;
      margin-bottom: 10px;
    }
    header h1 {
      margin: 0;
      font-size: 2em;
    }
    header p {
      margin: 5px 0 0;
      font-size: 1.1em;
    }

    /* ========== قسم الهيرو ========== */
    .hero {
      background: url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2070') no-repeat center center/cover;
      color: #fff;
      text-align: center;
      padding: 60px 20px;
    }
    .hero h2 {
      font-size: 2.5em; /* زيادة حجم الخط للجاذبية */
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.6); /* تحسين وضوح النص */
    }

    /* ========== الأزرار العامة ========== */
    .btn, .map-link, .cart-btn {
      display: inline-block; /* لضمان تطبيق التنسيقات بشكل صحيح */
      background-color: #e67e22;
      color: white;
      padding: 12px 30px; /* زيادة الحجم قليلاً */
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      transition: 0.3s;
      border: none;
      cursor: pointer;
      margin: 5px;
    }
    .btn:hover, .map-link:hover, .cart-btn:hover {
      background-color: #d35400;
      transform: translateY(-2px); /* إضافة تأثير بسيط عند المرور */
    }
    .map-button {
      text-align: center;
      margin: 30px 0;
    }

    /* ========== قسم المنتجات ========== */
    section {
      padding: 40px 20px;
      text-align: center;
    }
    .products {
      display: flex;
      flex-wrap: wrap;
      gap: 25px; /* زيادة المسافة قليلاً */
      justify-content: center;
    }
    .product-card {
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      padding: 20px; /* زيادة الحشو الداخلي */
      width: 220px; /* زيادة العرض قليلاً */
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    .product-card img {
      width: 100%;
      height: 150px; /* تحديد ارتفاع ثابت للصور */
      object-fit: cover; /* لضمان تناسق الصور */
      border-radius: 10px;
    }
    .product-card h3 {
      margin: 15px 0 5px;
      color: #444;
      font-size: 1.2em;
    }
    .product-card p {
      color: #e67e22;
      font-weight: bold;
      font-size: 1.1em;
    }

    /* ========== قسم التواصل ========== */
    #contact {
      background-color: #f9f2ec;
      text-align: center;
      padding: 40px 20px;
    }

    /* ========== الفوتر ========== */
    footer {
      background-color: #8B4513;
      color: white;
      text-align: center;
      padding: 20px;
    }
    #visitor-count {
      font-weight: bold;
      font-size: 1.2em;
      color: #e67e22;
      margin-top: 5px;
    }

    /* ========== السلة العائمة ========== */
    .cart-icon {
      position: fixed;
      top: 20px;
      left: 20px;
      background-color: #e67e22;
      color: white;
      padding: 15px; /* زيادة الحجم لتكون أوضح */
      border-radius: 50%;
      font-size: 1.5em; /* تكبير الأيقونة */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .cart-icon:hover {
      background-color: #d35400;
      transform: scale(1.1);
    }
    .cart-count-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #d35400;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.6em;
        font-weight: bold;
    }

    /* ========== نافذة السلة المنبثقة ========== */
    #cart-popup {
        display: none;
        position: fixed;
        z-index: 1001;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 450px;
        background-color: #fff8f0;
        border-radius: 15px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.2);
        padding: 25px;
    }
    #cart-popup h2 { margin-top: 0; }
    #cart-items { list-style: none; padding: 0; max-height: 200px; overflow-y: auto; }
    #cart-items li { padding: 8px 0; border-bottom: 1px solid #eee; }
    .cart-actions { margin-top: 20px; display: flex; gap: 10px; justify-content: center; }

    /* ========== أنماط إضافية عامة ========== */
    h2 {
      font-size: 2.2em;
      margin-bottom: 30px;
      color: #8B4513;
    }

    /* ========== تأثيرات الانيميشن ========== */
    .fade-in {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ========== تصميم متجاوب ========== */
    @media (max-width: 600px) {
      .product-card {
        width: 80%; /* تعديل العرض ليكون أفضل على الشاشات الصغيرة */
        max-width: 300px;
      }
      .btn, .map-link {
        width: 80%;
        display: inline-block;
        box-sizing: border-box;
      }
      .hero h2 { font-size: 1.8em; }
      .cart-icon { top: 15px; left: 15px; padding: 12px; font-size: 1.2em; }
    }
  </style>
</head>
<body>

  <header class="fade-in">
    <img src="images/logo.png" alt="شعار مخبزة علاّف" class="logo" />
    <h1>مخبزة وحلويات علاّف</h1>
    <p>المذاق الأصيل الذي لا يُنسى</p>
  </header>

  <div onclick="showCart()" class="cart-icon">
    <i class="fas fa-shopping-basket"></i>
    <span id="cart-count-badge" class="cart-count-badge">0</span>
  </div>

  <main>
    <section class="hero fade-in">
      <h2>نخبز لكم السعادة كل يوم</h2>
      <a href="#products" class="btn">اكتشف منتجاتنا</a>
    </section>

    <section id="products" class="fade-in">
      <h2>منتجاتنا الطازجة</h2>
      <div class="products">
        <div class="product-card">
          <img src="images/croissant.jpg" alt="كرواسون" />
          <h3>كرواسون بالزبدة</h3>
          <p>2 دراهم</p>
          <button class="cart-btn" onclick="addToCart('كرواسون بالزبدة', 2)">أضف للسلة</button>
        </div>
        <div class="product-card">
          <img src="images/msemen.jpg" alt="مسمن" />
          <h3>مسمن بلدي معسل</h3>
          <p>3.5 دراهم</p>
          <button class="cart-btn" onclick="addToCart('مسمن بلدي معسل', 3.5)">أضف للسلة</button>
        </div>
        <div class="product-card">
          <img src="images/cake.jpg" alt="كيك" />
          <h3>كيكة الشوكولاتة</h3>
          <p>40 درهم</p>
          <button class="cart-btn" onclick="addToCart('كيكة الشوكولاتة', 40)">أضف للسلة</button>
        </div>
      </div>
    </section>

    <section id="contact" class="fade-in">
      <h2>تواصل معنا أو تفضل بزيارتنا</h2>
      <div class="map-button">
        <a href="https://maps.app.goo.gl/3QSaUA5nJiPQDRHZ9" target="_blank" class="map-link">📍 موقعنا على الخريطة</a>
        <a href="https://wa.me/212681848262" target="_blank" class="btn">💬 الطلب عبر واتساب</a>
      </div>
    </section>
  </main>

  <footer class="fade-in">
    <p>جميع الحقوق محفوظة © 2025 | Allaf.com</p>
    <p>عدد الزوار: <span id="visitor-count">0</span></p>
  </footer>

  <div id="cart-popup">
    <h2><i class="fas fa-shopping-basket"></i> سلة التسوق</h2>
    <ul id="cart-items"><li>السلة فارغة حاليًا.</li></ul>
    <p><strong>المجموع: <span id="cart-total">0.00</span> درهم</strong></p>
    <div class="cart-actions">
        <button class="btn" onclick="closeCart()">إغلاق</button>
        <button class="cart-btn" onclick="generateWhatsAppInvoice()">إرسال الطلب</button>
    </div>
  </div>

  <script>
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

    // --- Visitor Counter ---
    document.addEventListener('DOMContentLoaded', () => {
      const countDisplay = document.getElementById('visitor-count');
      let visitorCount = parseInt(localStorage.getItem('visitorCount_allafBakery_v2') || '0');
      visitorCount++;
      localStorage.setItem('visitorCount_allafBakery_v2', visitorCount);
      countDisplay.innerText = visitorCount;
    });

    // --- Animation on Scroll ---
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
  </script>

</body>
</html>
