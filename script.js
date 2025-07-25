// إعداد العداد التنازلي
const countdown = document.getElementById("countdown");

// حدد تاريخ إعادة الفتح - يمكن تغييره حسب الرغبة
const targetDate = new Date("2025-12-31T00:00:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(timer);
    countdown.innerHTML = "تم فتح الموقع!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = ${days}ي : ${hours}س : ${minutes}د : ${seconds}ث;
}, 1000);
