document.addEventListener("DOMContentLoaded", () => {
  // دمج Loader + عرض الأسطر تدريجياً
  setTimeout(() => {
    // إخفاء الـ Splash
    document.getElementById("splash").style.display = "none";

    // عرض المحتوى الرئيسي
    const container = document.getElementById("main");
    container.style.display = "block";

    // عرض الأسطر تدريجياً
    if (typeof lines !== "undefined" && Array.isArray(lines)) {
      let delay = 0;
      lines.forEach((line) => {
        const p = document.createElement("p");
        p.className = "line";
        p.style.animationDelay = `${delay}s`;
        p.textContent = line;
        container.appendChild(p);
        delay += 1.5;
      });
    }
  }, 2000);

  // -- menu  --
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.querySelector(".menu-btn");
  const closeBtn = document.getElementById("closeBtn");
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
  });
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  });
  overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  });

  const lines = [
    "السلام عليكم ورحمة الله وبركاته",
    "مرحبا بكم في موقع القرآن الكريم",
    "هنا علي هذا الموقع نستمع الي اعذب التلاوات من كبار القراء",
    "نسأل الله عزل و جل ان يجعل القراءن الكريم شفيع لنا يوم القيامة",
  ];

  // setTimeout(() => {
  //   document.getElementById("splash").style.display = "none";
  //   const container = document.getElementById("main");
  //   container.style.display = "block";

  //   let delay = 0;
  //   lines.forEach((line) => {
  //     const p = document.createElement("p");
  //     p.className = "line";
  //     p.style.animationDelay = `${delay}s`;
  //     p.textContent = line;
  //     container.appendChild(p);
  //     delay += 1.5;
  //   });
  // }, 2000);
  // ------ sceau_du_coran -----
  const TOTAL_PARTS = 30;

  function generatePlan() {
    const days = parseInt(document.getElementById("daysInput").value);
    if (!days || days <= 0) return;

    // احفظ آخر خطة
    localStorage.setItem("last_plan_days", days);

    // أظهر الجدول
    document.getElementById("progressContainer").style.display = "block";

    const partsPerDay = TOTAL_PARTS / days;
    let html = `
    <table class="table_sceau_du_coran show">
      <tr>
        <th>اليوم</th>
        <th>من</th>
        <th>إلى</th>
        <th>الحالة</th>
      </tr>
  `;

    for (let day = 1; day <= days; day++) {
      let start = Math.round((day - 1) * partsPerDay) + 1;
      let end = Math.round(day * partsPerDay);
      if (end > TOTAL_PARTS) end = TOTAL_PARTS;

      // مفتاح التخزين لكل خطة
      let key = `khatma_done_${days}_day_${day}`;
      let doneClass = localStorage.getItem(key) === "done" ? "done" : "";

      html += `
      <tr>
        <td>اليوم ${day}</td>
        <td>الجزء ${start}</td>
        <td>الجزء ${end}</td>
        <td>
          <button class="done-btn ${doneClass}"
            onclick="toggleDone(${days}, ${day}, this)">✔ تم</button>
        </td>
      </tr>
    `;
    }

    html += "</table>";
    document.getElementById("plan").innerHTML = html;

    updateProgress(days);
  }

  function toggleDone(totalDays, day, btn) {
    let key = `khatma_done_${totalDays}_day_${day}`;

    if (localStorage.getItem(key) === "done") {
      localStorage.removeItem(key);
      btn.classList.remove("done");
    } else {
      localStorage.setItem(key, "done");
      btn.classList.add("done");
    }

    updateProgress(totalDays);
  }

  function updateProgress(days) {
    let done = 0;

    for (let i = 1; i <= days; i++) {
      if (localStorage.getItem(`khatma_done_${days}_day_${i}`) === "done")
        done++;
    }

    let percent = days ? Math.round((done / days) * 100) : 0;
    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText = percent + "%";
  }

  // عند تحميل الصفحة → خلي كل حاجة مخفية وفاضية
  window.onload = function () {
    document.getElementById("daysInput").value = ""; // خلي الانبوت فاضي
    document.getElementById("plan").innerHTML = ""; // الجدول مخفي
    document.getElementById("progressContainer").style.display = "none"; // شريط التقدم مخفي
  };

  // ----
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const header = card.querySelector(".card-header");
      const toggleIcon = card.querySelector(".toggle-icon");

      header.addEventListener("click", () => {
        cards.forEach((otherCard) => {
          if (otherCard !== card && otherCard.classList.contains("active")) {
            otherCard.classList.remove("active");
            const otherIcon = otherCard.querySelector(".toggle-icon");
            if (otherIcon) otherIcon.textContent = "+";
          }
        });

        card.classList.toggle("active");

        if (card.classList.contains("active")) {
          toggleIcon.textContent = "−";
        } else {
          toggleIcon.textContent = "+";
        }
      });
    });
  });
  window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";
    document.body.classList.remove("loading");
  });

  // ---
  const items = document.querySelectorAll(".text-base");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((item) => observer.observe(item));
});
