// إعداد العداد التنازلي
document.addEventListener('DOMContentLoaded', function() {
  const countdown = document.getElementById("countdown");
  
  // التحقق من وجود العنصر
  if (!countdown) {
    console.error('عنصر العداد غير موجود');
    return;
  }

  // حدد تاريخ إعادة الفتح - يمكن تغييره حسب الرغبة
  const targetDate = new Date("2025-12-31T00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timer);
      countdown.innerHTML = "تم فتح الموقع!";
      countdown.style.color = "#4CAF50";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // تنسيق الأرقام لتظهر بصيغة رقمين
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    countdown.innerHTML = ${formattedDays}ي : ${formattedHours}س : ${formattedMinutes}د : ${formattedSeconds}ث;
  }

  // تشغيل العداد فوراً
  updateCountdown();
  
  // تحديث العداد كل ثانية
  const timer = setInterval(updateCountdown, 1000);

  // تنظيف المؤقت عند إغلاق الصفحة
  window.addEventListener('beforeunload', function() {
    clearInterval(timer);
  });
});
