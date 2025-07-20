// ✅ تمرير سلس عند الضغط على الروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ✅ رسالة ترحيبية في console للمطور
console.log("🌟 مرحبا بك في مخبزة علاّف! نتمنى لك تجربة ممتعة 👨‍🍳");

// ✅ عداد الزوار المطور
const counter = document.getElementById("visitor-count");

if (counter) {
  fetch('https://api.countapi.xyz/update/elhadouny.com/visits/?amount=1')
    .then(res => res.json())
    .then(res => {
      if (res.value !== undefined) {
        counter.innerText = res.value;
      } else {
        counter.innerText = "غير متاح";
      }
    })
    .catch(err => {
      counter.innerText = "خطأ";
      console.error("⚠️ فشل في جلب عدد الزوار:", err);
    });
}

// ✅ إظهار العناصر تدريجياً عند التمرير
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .map-button').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// ✅ توليد فاتورة وإرسالها عبر واتساب
function sendInvoiceToWhatsApp(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    alert("🧺 السلة فارغة!");
    return;
  }

  const orderDetails = cartItems.map((item, index) =>
    `#${index + 1}: ${item.name} × ${item.quantity} = ${item.price * item.quantity} MAD`
  ).join('\n');

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const message = `🧾 *فاتورة طلب من مخبزة علاّف*\n\n${orderDetails}\n\n💰 *المجموع:* ${total} درهم\n\n📦 شكراً لطلبك!`;

  const phone = "2126XXXXXXXX"; // ضع رقم الواتساب هنا
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ✅ أنماط التحريك للعناصر
const style = document.createElement("style");
style.innerHTML = `
  .hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: 0.6s ease;
  }

  .visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);