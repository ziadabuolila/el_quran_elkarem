// -- loader --
setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").style.display = "block";
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
    "نحن هنا لنقربك من كلام الله عز وجل",
    "استمع إلى أعذب التلاوات من كبار القراء",
    "واحرص على أن يكون القرآن ربيع قلبك ونور صدرك"
];

setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    const container = document.getElementById("main");
    container.style.display = "block";

    let delay = 0;
    lines.forEach(line => {
        const p = document.createElement("p");
        p.className = "line";
        p.style.animationDelay = `${delay}s`;
        p.textContent = line;
        container.appendChild(p);
        delay += 1.5;
    });
}, 2000);
// ------ sceau_du_coran -----
function generatePlan() {
    const days = parseInt(document.getElementById("days").value);
    if (!days) return;

    localStorage.setItem("selectedDays", days);
    localStorage.setItem("planGenerated", "true");

    const totalAjzaa = 30;
    const partsPerDay = totalAjzaa / days;
    let html = `<table id="planTable"><tr><th>اليوم</th><th>الجزء</th><th>الحالة</th></tr>`;

    for (let i = 1; i <= days; i++) {
        let start = Math.round((i - 1) * partsPerDay) + 1;
        let end = Math.round(i * partsPerDay);
        if (end > totalAjzaa) end = totalAjzaa;

        let range = start === end ? `الجزء ${start}` : `الأجزاء ${start} - ${end}`;
        let key = `day${i}`;
        let doneClass = localStorage.getItem(key) === "done" ? "done" : "";

        html += `<tr>
            <td>اليوم ${i}</td>
            <td>${range}</td>
            <td><button class="done-btn ${doneClass}" onclick="markDone(${i}, this)">✔ تم</button></td>
        </tr>`;
    }

    html += "</table>";
    document.getElementById("plan").innerHTML = html;

    setTimeout(() => {
        document.getElementById("planTable").classList.add("show");
    }, 50);

    document.getElementById("progressContainer").style.display = "block";
    updateProgress();
}

function markDone(day, btn) {
    let key = `day${day}`;
    if (localStorage.getItem(key) === "done") {
        localStorage.removeItem(key);
        btn.classList.remove("done");
    } else {
        localStorage.setItem(key, "done");
        btn.classList.add("done");
    }
    updateProgress();
}

function updateProgress() {
    let buttons = document.querySelectorAll(".done-btn");
    let total = buttons.length;
    let done = 0;
    buttons.forEach(btn => {
        if (btn.classList.contains("done")) done++;
    });
    let percent = total > 0 ? Math.round((done / total) * 100) : 0;
    document.getElementById("progressFill").style.width = percent + "%";
    document.getElementById("progressText").innerText = percent + "%";
}

window.onload = function() {
    const savedDays = localStorage.getItem("selectedDays");
    const planGenerated = localStorage.getItem("planGenerated");

    if (savedDays && planGenerated === "true") {
        document.getElementById("days").value = savedDays;
    }
};
// ----
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const header = card.querySelector(".card-header");
        const toggleIcon = card.querySelector(".toggle-icon");

        header.addEventListener("click", () => {
            cards.forEach(otherCard => {
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

function setupToggle(containerId, btnId) {
    const container = document.getElementById(containerId);
    const header = container.querySelector(".header_supplications");
    const title = container.querySelector(".name");
    const toggleBtn = document.getElementById(btnId);

    function toggleContainer() {
        container.classList.toggle("open");
        toggleBtn.textContent = container.classList.contains("open") ? "-" : "+";
    }

    [container, header, title, toggleBtn].forEach(el => {
        el.addEventListener("click", (e) => {
            if (
                e.target === container ||
                e.target === header ||
                e.target === title ||
                e.target === toggleBtn
            ) {
                toggleContainer();
            }
        });
    });
}

setupToggle("supplications");
setupToggle("souvenirs");