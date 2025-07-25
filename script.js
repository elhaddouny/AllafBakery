// إعداد العداد التصاعدي
document.addEventListener("DOMContentLoaded", function() {
  const countdown = document.getElementById("countdown");
  
  // التحقق من وجود العنصر
  if (!countdown) {
    console.error("عنصر العداد غير موجود");
    return;
  }

  // حدد تاريخ إغلاق الموقع (يمكن تغييره حسب الرغبة)
  // على سبيل المثال، إذا أغلق الموقع في 1 يناير 2024
  const closeDate = new Date().setHours(0,0,0,0);

  function updateUptime() {
    const now = new Date().getTime();
    const duration = now - closeDate;

    // إذا كان التاريخ الحالي قبل تاريخ الإغلاق، اعرض 00:00:00:00
    if (duration < 0) {
      countdown.innerHTML = "00ي : 00س : 00د : 00ث";
      return;
    }

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    // تنسيق الأرقام لتظهر بصيغة رقمين
    const formattedDays = String(days).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    countdown.innerHTML = `${formattedDays}ي : ${formattedHours}س : ${formattedMinutes}د : ${formattedSeconds}ث`;
  }

  // تشغيل العداد فوراً
  updateUptime();
  
  // تحديث العداد كل ثانية
  const timer = setInterval(updateUptime, 1000);

  // تنظيف المؤقت عند إغلاق الصفحة
  window.addEventListener("beforeunload", function() {
    clearInterval(timer);
  });
});