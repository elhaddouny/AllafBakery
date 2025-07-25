// ملف التحكم في الحركات والتفاعلات
document.addEventListener('DOMContentLoaded', function() {
  
  // تفعيل النقر على الاقتراحات
  const suggestionPills = document.querySelectorAll('.pill');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');

  suggestionPills.forEach(pill => {
    pill.addEventListener('click', function() {
      const suggestion = this.textContent;
      userInput.value = suggestion;
      
      // إضافة تأثير بصري
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateY(-2px)';
      }, 150);
      
      // تركيز على حقل الإدخال
      userInput.focus();
    });
  });

  // تحسين تفاعل زر الإرسال
  if (sendButton) {
    sendButton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });

    sendButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-2px) scale(1)';
    });
  }

  // إضافة تأثيرات للعناصر المتحركة
  const floatingItems = document.querySelectorAll('.floating-item');
  
  floatingItems.forEach((item, index) => {
    // إضافة تأخير عشوائي لكل عنصر
    const randomDelay = Math.random() * 10;
    item.style.animationDelay = `-${randomDelay}s`;
    
    // إضافة تفاعل عند التمرير
    item.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      this.style.transform = 'scale(1.2)';
      this.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      this.style.transform = 'scale(1)';
      this.style.zIndex = '1';
    });
  });

  // تأثير التمرير السلس للصفحة
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

  // مراقبة العناصر للتأثيرات
  const animatedElements = document.querySelectorAll('.message-box, .countdown-box, .bot-box, .info-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // تأثير الجسيمات المتحركة (إضافي)
  createFloatingParticles();

  function createFloatingParticles() {
    const particleCount = 15;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 215, 0, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: particleFloat ${15 + Math.random() * 10}s infinite linear;
        left: ${Math.random() * 100}%;
        top: 100%;
        animation-delay: ${Math.random() * 10}s;
      `;
      
      document.body.appendChild(particle);
      particles.push(particle);
    }

    // إضافة CSS للجسيمات
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes particleFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // تأثير النقر على الشعار
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'logoGlow 3s ease-in-out infinite alternate, logoSpin 1s ease-in-out';
      }, 10);
    });

    // إضافة تأثير الدوران
    const logoSpinStyle = document.createElement('style');
    logoSpinStyle.textContent = `
      @keyframes logoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
      }
    `;
    document.head.appendChild(logoSpinStyle);
  }

  // تحسين الأداء - إيقاف الحركات عند عدم الرؤية
  document.addEventListener('visibilitychange', function() {
    const animatedElements = document.querySelectorAll('.floating-item, .particle');
    
    if (document.hidden) {
      animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
      });
    } else {
      animatedElements.forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }
  });

  // تأثير الكتابة المتحركة للعنوان
  const mainTitle = document.querySelector('.main-title');
  if (mainTitle) {
    const originalText = mainTitle.textContent;
    mainTitle.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
      mainTitle.textContent += originalText.charAt(i);
      i++;
      if (i >= originalText.length) {
        clearInterval(typeWriter);
      }
    }, 150);
  }

  console.log('🎉 تم تحميل جميع التأثيرات والحركات بنجاح!');
});

