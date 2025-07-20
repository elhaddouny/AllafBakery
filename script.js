// 🟡 تمرير سلس عند الضغط على الروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 🟢 رسالة ترحيبية في console للمطور
console.log("مرحبا بك في مخبزة علاّف 👋✨");

// 🔵 عداد الزوار
const counter = document.getElementById("visitor-count");

if (counter) {
  fetch('https://api.countapi.xyz/update/elhadouny.com/visits/?amount=1')
    .then(res => res.json())
    .then(res => {
      counter.innerText = res.value;
    })
    .catch(err => {
      console.error("فشل في جلب عدد الزوار:", err);
    });
}

// 🟣 إظهار تدريجي للعناصر عند التمرير (انيميشن ذكي)
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

// 🧾 [سيتم لاحقًا هنا توليد الفاتورة عند تأكيد الطلب وإرسالها عبر واتساب]
.hidden {
  opacity: 0;
  transform: translateY(30px);
  transition: 0.6s ease;
}

.visible {
  opacity: 1;
  transform: translateY(0);
}